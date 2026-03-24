(() => {
  const projectModal = document.getElementById('project-modal');
  const projectModalInner = document.getElementById('project-modal-inner');
  const docModal = document.getElementById('doc-modal');
  const docModalFrame = document.getElementById('doc-modal-frame');
  const docModalLink = document.getElementById('doc-modal-link');
  const projectShowcases = document.querySelectorAll('.project-showcase');
  let visibleVideoObserver = null;
  let visibleAnimationObserver = null;
  const visibleVideoThreshold = 0.35;
  const visibleAnimationThreshold = 0.2;

  async function hydrateScriptCards(root) {
    const cards = root.querySelectorAll('.project-script-card[data-script-file]:not([data-script-loaded]):not([data-script-inline="true"])');
    if (!cards.length) {
      return;
    }

    await Promise.all(Array.from(cards, async (card) => {
      const content = card.querySelector('.project-script-card__content');
      const fileUrl = card.dataset.scriptFile;

      card.dataset.scriptLoaded = 'true';

      if (!content || !fileUrl) {
        return;
      }

      content.textContent = 'Loading script...';

      try {
        const res = await fetch(fileUrl);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        content.textContent = await res.text();
      } catch (error) {
        console.error('Failed to load script file:', error);
        content.textContent = 'Unable to load this script right now.';
      }
    }));
  }

  function hydrateVisibleVideos(root) {
    const videos = root.querySelectorAll('video[data-autoplay-when-visible="true"]:not([data-visible-autoplay-bound])');
    if (!videos.length) {
      return;
    }

    const getVideoVisibleRatio = (video) => {
      const rect = video.getBoundingClientRect();
      const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      const visibleArea = visibleWidth * visibleHeight;
      const totalArea = Math.max(rect.width * rect.height, 1);
      return visibleArea / totalArea;
    };

    const syncVideoPlayback = (video, visibleRatio = getVideoVisibleRatio(video)) => {
      if (visibleRatio < visibleVideoThreshold) {
        video.pause();
        return;
      }

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    videos.forEach((video) => {
      video.dataset.visibleAutoplayBound = 'true';
      video.autoplay = false;
      video.defaultMuted = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('muted', '');
      const tryPlayback = () => {
        syncVideoPlayback(video);
      };

      video.addEventListener('loadedmetadata', tryPlayback);
      video.addEventListener('loadeddata', tryPlayback);
      video.addEventListener('canplay', tryPlayback);
      window.requestAnimationFrame(() => {
        syncVideoPlayback(video);
      });
    });

    if (!('IntersectionObserver' in window)) {
      videos.forEach((video) => {
        syncVideoPlayback(video);
      });
      return;
    }

    if (!visibleVideoObserver) {
      visibleVideoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            syncVideoPlayback(video, entry.intersectionRatio);
            return;
          }

          video.pause();
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.15, 0.35, 0.5, 0.75, 1],
      });
    }

    videos.forEach((video) => {
      visibleVideoObserver.observe(video);
    });
  }

  function hydrateVisibleAnimations(root) {
    const animatedEls = root.querySelectorAll('[data-animate-when-visible="true"]:not([data-visible-animation-bound])');
    if (!animatedEls.length) {
      return;
    }

    const getVisibleRatio = (el) => {
      const rect = el.getBoundingClientRect();
      const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      const visibleArea = visibleWidth * visibleHeight;
      const totalArea = Math.max(rect.width * rect.height, 1);
      return visibleArea / totalArea;
    };

    const syncAnimationState = (el, visibleRatio = getVisibleRatio(el)) => {
      const isCurrentlyVisible = el.classList.contains('is-visible');
      if (!isCurrentlyVisible && visibleRatio >= visibleAnimationThreshold) {
        el.classList.add('is-visible');
      } else if (isCurrentlyVisible && visibleRatio < 0.05) {
        el.classList.remove('is-visible');
      }
    };

    animatedEls.forEach((el) => {
      el.dataset.visibleAnimationBound = 'true';
      window.requestAnimationFrame(() => {
        syncAnimationState(el);
      });
    });

    if (!('IntersectionObserver' in window)) {
      animatedEls.forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    if (!visibleAnimationObserver) {
      visibleAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          syncAnimationState(entry.target, entry.intersectionRatio);
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
      });
    }

    animatedEls.forEach((el) => {
      visibleAnimationObserver.observe(el);
    });
  }

  hydrateScriptCards(document);
  hydrateVisibleVideos(document);
  hydrateVisibleAnimations(document);

  if (projectShowcases.length) {
    let activeFrame = null;

    const updateActiveShowcase = () => {
      activeFrame = null;

      const viewportHeight = window.innerHeight;
      const viewportCenter = window.innerHeight * 0.52;
      let bestShowcase = projectShowcases[0];
      let bestScore = Number.NEGATIVE_INFINITY;

      projectShowcases.forEach((showcase) => {
        const focusTarget = showcase.querySelector('.project-showcase__body') || showcase;
        const rect = focusTarget.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const containsCenter = rect.top <= viewportCenter && rect.bottom >= viewportCenter;
        const centerDistance = Math.abs((rect.top + (rect.height / 2)) - viewportCenter);

        const visibilityScore = visibleHeight;
        const centerBonus = containsCenter ? viewportHeight * 0.35 : 0;
        const proximityPenalty = centerDistance * 0.08;
        const score = visibilityScore + centerBonus - proximityPenalty;

        if (score > bestScore) {
          bestScore = score;
          bestShowcase = showcase;
        }
      });

      projectShowcases.forEach((showcase) => {
        showcase.classList.toggle('is-active', showcase === bestShowcase);
      });
    };

    const requestActiveUpdate = () => {
      if (activeFrame !== null) {
        return;
      }

      activeFrame = window.requestAnimationFrame(updateActiveShowcase);
    };

    updateActiveShowcase();
    window.addEventListener('scroll', requestActiveUpdate, { passive: true });
    window.addEventListener('resize', requestActiveUpdate);
  } else {
    projectShowcases.forEach((showcase) => {
      showcase.classList.add('is-active');
    });
  }

  document.querySelectorAll('[data-portfolio-switcher]').forEach((switcher) => {
    const stack = switcher.querySelector('.portfolio-stack');
    const tabs = Array.from(switcher.querySelectorAll('[data-portfolio-tab]'));
    const pages = Array.from(switcher.querySelectorAll('[data-portfolio-page]'));
    let transitionTimer = null;

    if (!stack || !tabs.length || !pages.length) {
      return;
    }

    let activePageId = tabs.find((tab) => tab.classList.contains('portfolio-nav__link--active'))?.dataset.portfolioTab
      || pages[0]?.dataset.portfolioPage
      || '';

    const nav = switcher.querySelector('.portfolio-nav');

    const syncTabGap = () => {
      const activeTab = tabs.find((t) => t.classList.contains('portfolio-nav__link--active'));
      if (!activeTab || !nav) return;

      const navRect = nav.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      const tabLeft = tabRect.left - navRect.left;
      const tabRight = tabRect.right - navRect.left;

      pages.forEach((page) => {
        const surface = page.querySelector('.portfolio-page__surface');
        if (surface) {
          surface.style.setProperty('--tab-left', `${tabLeft}px`);
          surface.style.setProperty('--tab-right', `${tabRight}px`);
        }
      });
    };

    const syncStackHeight = () => {
      const activePage = pages.find((page) => page.dataset.portfolioPage === activePageId);
      if (!activePage) {
        return;
      }

      const surface = activePage.querySelector('.portfolio-page__surface') || activePage;
      stack.style.height = `${surface.scrollHeight}px`;
    };

    const applyActivePage = (pageId) => {
      if (!pageId) {
        return;
      }

      const previousActive = pages.find((page) => page.classList.contains('is-active'));
      const isSwitching = Boolean(previousActive && previousActive.dataset.portfolioPage !== pageId);

      activePageId = pageId;

      if (transitionTimer) {
        window.clearTimeout(transitionTimer);
        transitionTimer = null;
      }

      pages.forEach((page) => page.classList.remove('is-entering'));

      tabs.forEach((tab) => {
        const isActive = tab.dataset.portfolioTab === pageId;
        tab.classList.toggle('portfolio-nav__link--active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      pages.forEach((page) => {
        const isActive = page.dataset.portfolioPage === pageId;
        page.classList.toggle('is-active', isActive);
        page.classList.toggle('is-underlay', !isActive);
        page.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      const activePage = pages.find((page) => page.dataset.portfolioPage === pageId);
      if (activePage) {
        if (isSwitching) {
          activePage.classList.add('is-entering');
          transitionTimer = window.setTimeout(() => {
            activePage.classList.remove('is-entering');
            transitionTimer = null;
          }, 380);
        }

        hydrateVisibleVideos(activePage);
        activePage.querySelectorAll('[data-animate-when-visible="true"]').forEach((el) => {
          const rect = el.getBoundingClientRect();
          const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
          const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
          const visibleArea = visibleWidth * visibleHeight;
          const totalArea = Math.max(rect.width * rect.height, 1);
          el.classList.toggle('is-visible', (visibleArea / totalArea) >= visibleAnimationThreshold);
        });
      }

      window.requestAnimationFrame(() => {
        syncStackHeight();
        syncTabGap();
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        applyActivePage(tab.dataset.portfolioTab);
        switcher.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });

    switcher.querySelectorAll('img, video').forEach((media) => {
      if (media.dataset.portfolioResizeBound === 'true') {
        return;
      }

      media.dataset.portfolioResizeBound = 'true';
      media.addEventListener('load', syncStackHeight);
      media.addEventListener('loadedmetadata', syncStackHeight);
    });

    applyActivePage(activePageId);
    window.addEventListener('resize', () => {
      syncStackHeight();
      syncTabGap();
    });

    if (nav && 'IntersectionObserver' in window) {
      const sentinel = document.createElement('div');
      sentinel.setAttribute('aria-hidden', 'true');
      sentinel.style.cssText = 'height:0;overflow:hidden;pointer-events:none;';
      nav.parentNode.insertBefore(sentinel, nav);

      new IntersectionObserver(
        ([entry]) => nav.classList.toggle('is-stuck', !entry.isIntersecting),
        { rootMargin: '0px', threshold: 0 }
      ).observe(sentinel);
    }
  });

  if (!projectModal || !projectModalInner || !docModal || !docModalFrame || !docModalLink) {
    return;
  }

  function syncBodyScrollLock() {
    const projectOpen = projectModal.getAttribute('aria-hidden') === 'false';
    const docOpen = docModal.getAttribute('aria-hidden') === 'false';
    document.body.style.overflow = projectOpen || docOpen ? 'hidden' : '';
  }

  function openProjectModal(contentHtml) {
    projectModalInner.innerHTML = contentHtml;
    projectModal.setAttribute('aria-hidden', 'false');
    syncBodyScrollLock();
    hydrateScriptCards(projectModalInner);
    hydrateVisibleVideos(projectModalInner);
  }

  function closeDocModal() {
    docModal.setAttribute('aria-hidden', 'true');
    docModalFrame.removeAttribute('src');
    docModalLink.setAttribute('href', '#');
    syncBodyScrollLock();
  }

  function closeProjectModal() {
    closeDocModal();
    projectModal.setAttribute('aria-hidden', 'true');
    projectModalInner.innerHTML = '';
    syncBodyScrollLock();
  }

  function openDocModal(fileUrl, fileTitle) {
    docModalFrame.src = fileUrl;
    docModalLink.href = fileUrl;
    docModalLink.textContent = fileTitle ? `Open ${fileTitle} in new tab` : 'Open PDF in new tab';
    docModal.setAttribute('aria-hidden', 'false');
    syncBodyScrollLock();
  }

  function getTemplateHtml(link) {
    const templateId = link.dataset.projectTemplate || link.dataset.modalTemplate;
    if (!templateId) {
      return '';
    }

    const template = document.getElementById(templateId);
    return template ? template.innerHTML.trim() : '';
  }

  document.querySelectorAll('.project-card a').forEach(link => {
    link.addEventListener('click', (e) => {
      const templateHtml = getTemplateHtml(link);
      if (!templateHtml) {
        return;
      }

      e.preventDefault();
      openProjectModal(templateHtml);
    });
  });

  document.querySelectorAll('[data-modal-template]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      const templateHtml = getTemplateHtml(trigger);
      if (!templateHtml) {
        return;
      }

      e.preventDefault();
      openProjectModal(templateHtml);
    });
  });

  projectModalInner.addEventListener('click', (e) => {
    const docButton = e.target.closest('.project-doc-btn');
    if (!docButton) {
      return;
    }

    e.preventDefault();
    openDocModal(docButton.dataset.docFile, docButton.dataset.docTitle);
  });

  projectModal.addEventListener('click', (e) => {
    if (e.target.closest('[data-modal-close]')) {
      closeProjectModal();
    }
  });

  docModal.addEventListener('click', (e) => {
    if (e.target.closest('[data-doc-close]')) {
      closeDocModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') {
      return;
    }

    if (docModal.getAttribute('aria-hidden') === 'false') {
      closeDocModal();
      return;
    }

    if (projectModal.getAttribute('aria-hidden') === 'false') {
      closeProjectModal();
    }
  });
})();
