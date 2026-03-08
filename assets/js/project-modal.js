(() => {
  const modal = document.getElementById('project-modal');
  const modalInner = document.getElementById('project-modal-inner');

  if (!modal || !modalInner) return;

  function openModal(contentHtml) {
    modalInner.innerHTML = contentHtml;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    wireDocButtons();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalInner.innerHTML = '';
    document.body.style.overflow = '';
  }

  function wireDocButtons() {
    const docsList = modalInner.querySelector('.project-docs-list');
    if (!docsList) return;

    const preview = document.createElement('iframe');
    preview.style.width = '100%';
    preview.style.height = '60vh';
    preview.style.border = 'none';
    preview.style.marginTop = '20px';

    docsList.parentNode.appendChild(preview);

    const buttons = docsList.querySelectorAll('.project-doc-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        preview.src = btn.dataset.docFile;
      });
    });

    if (buttons[0]) buttons[0].click();
  }

  // intercept project clicks
  document.querySelectorAll('.project-card a').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();

      const res = await fetch(link.href);
      const html = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const content = doc.querySelector('.project-page-inner');

      if (content) {
        openModal(content.innerHTML);
      }
    });
  });

  // close handlers
  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-modal-close]')) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();
