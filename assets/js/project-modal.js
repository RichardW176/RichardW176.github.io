(() => {
  const projectModal = document.getElementById('project-modal');
  const projectModalInner = document.getElementById('project-modal-inner');
  const docModal = document.getElementById('doc-modal');
  const docModalFrame = document.getElementById('doc-modal-frame');
  const docModalLink = document.getElementById('doc-modal-link');

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
    const templateId = link.dataset.projectTemplate;
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
