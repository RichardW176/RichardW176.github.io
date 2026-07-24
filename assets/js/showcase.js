/* ===================================================================
   Showcase interactions
   (1) Video Games / Writing Samples tabs
   (2) clicking a card opens its detail view, with an in-page swap
   Loads after hero-scroll.js.
   =================================================================== */

(function () {
  function show(view) {
    var pages = document.querySelectorAll('[data-view]');
    for (var i = 0; i < pages.length; i++) {
      pages[i].style.display =
        pages[i].getAttribute('data-view') === view ? 'block' : 'none';
    }
    // Toggle the scroll-pinned hero FIRST, so the page height is correct
    // before we set the scroll position. (If we scroll to the grid and only
    // then re-show the 300vh hero track above it, the browser pushes the grid
    // down and we land on the hero instead.)
    var track = document.querySelector('[data-hero-track]');
    if (track) track.style.display = view === 'index' ? '' : 'none';

    // Now place the scroll position: opening a detail starts at its top;
    // returning to the grid lands on the cards, not back up the tall hero.
    if (view === 'index') {
      var showcase = document.getElementById('portfolio-showcase');
      if (showcase) { showcase.scrollIntoView(); } else { window.scrollTo(0, 0); }
    } else {
      window.scrollTo(0, 0);
    }

    var active = document.querySelector('[data-view="' + view + '"]');
    if (active) {
      active.style.animation = 'none';
      void active.offsetHeight;
      active.style.animation = 'pageIn 460ms cubic-bezier(0.22,1,0.36,1) both';
      var vids = active.querySelectorAll('video');
      for (var j = 0; j < vids.length; j++) { try { vids[j].play(); } catch (e) {} }
    }
  }

  function selectTab(name) {
    var tabs = document.querySelectorAll('[data-tab]');
    for (var i = 0; i < tabs.length; i++) {
      var on = tabs[i].getAttribute('data-tab') === name;
      tabs[i].classList.toggle('is-active', on);
      tabs[i].setAttribute('aria-selected', on ? 'true' : 'false');
    }
    var panels = document.querySelectorAll('[data-panel]');
    for (var j = 0; j < panels.length; j++) {
      panels[j].style.display =
        panels[j].getAttribute('data-panel') === name ? 'block' : 'none';
    }
  }

  document.addEventListener('click', function (e) {
    var card = e.target.closest && e.target.closest('[data-goto]');
    if (card) { show(card.getAttribute('data-goto')); return; }

    var back = e.target.closest && e.target.closest('[data-back]');
    if (back) {
      var tab = back.getAttribute('data-back');
      if (tab === 'writing' || tab === 'games') selectTab(tab);
      show('index');
      return;
    }

    var t = e.target.closest && e.target.closest('[data-tab]');
    if (t) selectTab(t.getAttribute('data-tab'));
  });

  // keyboard: cards and tabs are role="button"/tabindex=0
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var c = e.target.closest && e.target.closest('[data-goto]');
    if (c) { e.preventDefault(); show(c.getAttribute('data-goto')); return; }
    var t = e.target.closest && e.target.closest('[data-tab]');
    if (t) { e.preventDefault(); selectTab(t.getAttribute('data-tab')); }
  });

  // focus mirrors hover so keyboard users see the same affordance
  document.addEventListener('focusin', function (e) {
    var card = e.target.closest && e.target.closest('[data-goto]');
    if (card) card.classList.add('is-hovered');
  });
  document.addEventListener('focusout', function (e) {
    var card = e.target.closest && e.target.closest('[data-goto]');
    if (card) card.classList.remove('is-hovered');
  });
})();

/* ===================================================================
   STORE LINKS -- behaviour (appended after the showcase IIFE).

   1. A store link must never trigger the card's click-through.
   2. Touch devices have no hover, so the card nearest the centre of the
      viewport gets `.is-active` -- which reveals its links and fills the
      CTA. It hands off to the next card as you scroll.
   =================================================================== */

/* --- 1. store links don't open the project page --- */
(function () {
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('.project-card__store-link');
    if (link) e.stopPropagation();
  }, true); // capture: runs before the card's own click handler
})();

/* --- 2. scroll-activated card on touch devices --- */
(function () {
  // Only where hover doesn't exist. Desktop keeps pure :hover.
  if (window.matchMedia('(hover: hover)').matches) return;

  var raf = null;

  function update() {
    raf = null;
    var cards = document.querySelectorAll('.project-list .project-card');
    if (!cards.length) return;

    var mid = window.innerHeight / 2;
    var best = null;
    var bestDist = Infinity;

    for (var i = 0; i < cards.length; i++) {
      var r = cards[i].getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) {
        cards[i].classList.remove('is-active');
        continue;
      }
      var dist = Math.abs((r.top + r.height / 2) - mid);
      if (dist < bestDist) { bestDist = dist; best = cards[i]; }
    }

    for (var j = 0; j < cards.length; j++) {
      cards[j].classList.toggle('is-active', cards[j] === best);
    }
  }

  function onScroll() { if (!raf) raf = requestAnimationFrame(update); }

  // capture:true so it also fires if a scroll container wraps the page
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  document.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
  setTimeout(update, 300);
})();
