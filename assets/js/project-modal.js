(() => {
  const modal = document.getElementById('project-modal');
  const modalInner = document.getElementById('project-modal-inner');

  if (!modal || !modalInner) return;

  let previewFrame = null;

  function renderLoadingState() {
    modalInner.innerHTML = '<div class="project-modal__spinner">Loading project...</div>';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function openModal(contentHtml) {
    modalInner.innerHTML = contentHtml;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    previewFrame = null;
    wireDocButtons();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modalInner.innerHTML = '';
    document.body.style.overflow = '';
    previewFrame = null;
  }

  function wireDocButtons() {
    const docsList = modalInner.querySelector('.project-docs-list');
    if (!docsList) return;

    previewFrame = document.createElement('iframe');
    previewFrame.title = 'Project document preview';
    previewFrame.style.width = '100%';
    previewFrame.style.height = '60vh';
    previewFrame.style.border = 'none';
    previewFrame.style.marginTop = '20px';

    docsList.parentNode.appendChild(previewFrame);

    const buttons = docsList.querySelectorAll('.project-doc-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(button => button.classList.remove('is-active'));
        btn.classList.add('is-active');

        if (previewFrame) {
          previewFrame.src = btn.dataset.docFile;
        }
      });
    });

    if (buttons[0]) {
      buttons[0].click();
    }
  }

  function getProjectContent(doc) {
    return doc.querySelector('.project-page-inner')
      || doc.querySelector('.project-page')
      || doc.querySelector('main')
      || doc.body;
  }

  document.querySelectorAll('.project-card a').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      renderLoadingState();

      try {
        const res = await fetch(link.href);
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = getProjectContent(doc);

        if (!content) {
          throw new Error('Project content container not found');
        }

        openModal(content.innerHTML);
      } catch (error) {
        console.error('Failed to open project modal:', error);
        window.location.href = link.href;
      }
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-modal-close]')) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
})();
