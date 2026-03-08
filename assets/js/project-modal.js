(() => {
  const projectModal = document.getElementById('project-modal');
  const projectModalInner = document.getElementById('project-modal-inner');
  const docModal = document.getElementById('doc-modal');
  const docModalFrame = document.getElementById('doc-modal-frame');
  const docModalLink = document.getElementById('doc-modal-link');
  const scriptModal = document.getElementById('script-modal');
  const scriptModalTitle = document.getElementById('script-modal-title');
  const scriptModalFormat = document.getElementById('script-modal-format');
  const scriptModalContent = document.getElementById('script-modal-content');
  const scriptModalLink = document.getElementById('script-modal-link');

  if (
    !projectModal || !projectModalInner ||
    !docModal || !docModalFrame || !docModalLink ||
    !scriptModal || !scriptModalTitle || !scriptModalFormat || !scriptModalContent || !scriptModalLink
  ) {
    return;
  }

  function syncBodyScrollLock() {
    const projectOpen = projectModal.getAttribute('aria-hidden') === 'false';
    const docOpen = docModal.getAttribute('aria-hidden') === 'false';
    const scriptOpen = scriptModal.getAttribute('aria-hidden') === 'false';
    document.body.style.overflow = projectOpen || docOpen || scriptOpen ? 'hidden' : '';
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

  function closeScriptModal() {
    scriptModal.setAttribute('aria-hidden', 'true');
    scriptModalTitle.textContent = 'Script';
    scriptModalFormat.textContent = 'Yarn Script';
    scriptModalContent.textContent = '';
    scriptModalLink.setAttribute('href', '#');
    syncBodyScrollLock();
  }

  function closeProjectModal() {
    closeDocModal();
    closeScriptModal();
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

  async function openScriptModal(fileUrl, fileTitle, fileFormat) {
    scriptModalTitle.textContent = fileTitle || 'Script';
    scriptModalFormat.textContent = fileFormat || 'Yarn Script';
    scriptModalContent.textContent = 'Loading script...';
    scriptModalLink.href = fileUrl;
    scriptModal.setAttribute('aria-hidden', 'false');
    syncBodyScrollLock();

    try {
      const res = await fetch(fileUrl);
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      scriptModalContent.textContent = await res.text();
    } catch (error) {
      console.error('Failed to load script file:', error);
      scriptModalContent.textContent = 'Unable to load this script right now.';
    }
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
    if (docButton) {
      e.preventDefault();
      openDocModal(docButton.dataset.docFile, docButton.dataset.docTitle);
      return;
    }

    const scriptButton = e.target.closest('.project-script-btn');
    if (!scriptButton) {
      return;
    }

    e.preventDefault();
    openScriptModal(
      scriptButton.dataset.scriptFile,
      scriptButton.dataset.scriptTitle,
      scriptButton.dataset.scriptFormat
    );
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

  scriptModal.addEventListener('click', (e) => {
    if (e.target.closest('[data-script-close]')) {
      closeScriptModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') {
      return;
    }

    if (scriptModal.getAttribute('aria-hidden') === 'false') {
      closeScriptModal();
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
