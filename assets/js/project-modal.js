// assets/js/project-modal.js
(() => {
  const modal = document.getElementById('project-modal');
  const modalInner = document.getElementById('project-modal-inner');
  const backdropSelectors = '[data-modal-close]';
  let lastFocused = null;

  if (!modal || !modalInner) return;

  function openModal(htmlContent, sourceUrl) {
    // inject content (replace spinner)
    modalInner.innerHTML = htmlContent;
    modal.setAttribute('aria-hidden', 'false');

    // remember focus
    lastFocused = document.activeElement;

    // trap focus simple: focus close button first
    const closeBtn = modal.querySelector('.project-modal__close');
    if (closeBtn) closeBtn.focus();

    // prevent page scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // update history (optional): push state so back closes modal
    try {
      history.pushState({ modal: true }, '', sourceUrl);
    } catch (e) {}
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    // clear content after a small delay to avoid flash
    setTimeout(() => { modalInner.innerHTML = '<div class="project-modal__spinner">Loading…</div>'; }, 200);
    // restore focus
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    // restore scrolling
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    // if we pushed history, go back
    if (history.state && history.state.modal) {
      try { history.back(); } catch(e) {}
    }
  }

  // close on backdrop / close button clicks
  modal.addEventListener('click', (ev) => {
    // any element with data-modal-close closes it
    if (ev.target.closest('[data-modal-close]')) {
      ev.preventDefault();
      closeModal();
    }
  });

  // close on escape
  window.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  // handle back/forward to close modal if user hits back
  window.addEventListener('popstate', (ev) => {
    if (modal.getAttribute('aria-hidden') === 'false' && !(ev.state && ev.state.modal)) {
      // history popped — close modal
      closeModal();
    }
  });

  // attach handlers: intercept project links
  function initProjectLinks() {
    const links = document.querySelectorAll('.project-card a');

    links.forEach(link => {
      // avoid double-binding
      if (link.dataset.modalBound) return;
      link.dataset.modalBound = '1';

      link.addEventListener('click', async (ev) => {
        // allow ctrl/cmd/meta/shift + click to open in new tab
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;

        ev.preventDefault();
        const href = link.getAttribute('href');
        if (!href) return;

        // show modal immediately with spinner
        modal.setAttribute('aria-hidden', 'false');
        modalInner.innerHTML = '<div class="project-modal__spinner">Loading…</div>';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // fetch the project page
        try {
          const res = await fetch(href, { credentials: 'same-origin' });
          if (!res.ok) throw new Error('Network error');

          const text = await res.text();
          // parse HTML to find .project-page-inner
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');

          // primary selector - project's inner content
          const contentEl = doc.querySelector('.project-page-inner') || doc.querySelector('.project-page') || doc.querySelector('main') || doc.body;
          let contentHtml = '';
          if (contentEl) {
            contentHtml = contentEl.innerHTML;
          } else {
            // fallback: entire body
            contentHtml = doc.body.innerHTML;
          }

          // Optional: prepend a title / metadata if not present
          // open modal with the content
          openModal(contentHtml, href);
        } catch (err) {
          // on error, close modal and fallback to normal navigation in same tab
          modal.setAttribute('aria-hidden', 'true');
          document.documentElement.style.overflow = '';
          document.body.style.overflow = '';
          console.error('Project modal load failed:', err);
          // fallback: navigate to page normally
          window.location.href = href;
        }
      });
    });
  }

  // run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectLinks);
  } else {
    initProjectLinks();
  }
})();
