(() => {
  const modal = document.getElementById('project-modal');
  const modalInner = document.getElementById('project-modal-inner');
  const closeBtn = document.querySelector('.project-modal-close');
  const backdrop = document.querySelector('.project-modal-backdrop');

  if (!modal || !modalInner) return;

  function openModal(content) {
    modalInner.innerHTML = content;
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
    const btns = modalInner.querySelectorAll('.project-doc-btn');
    if (!btns.length) return;

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '60vh';
    iframe.style.border = 'none';
    iframe.style.marginTop = '20px';

    modalInner.appendChild(iframe);

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        iframe.src = btn.dataset.docFile;
      });
    });

    btns[0].click();
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const hidden = card.querySelector('.project-hidden-content');
      if (!hidden) return;
      openModal(hidden.innerHTML);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
})();
