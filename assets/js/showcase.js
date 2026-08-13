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

  // Where the reader was in each tab, so switching back doesn't lose their
  // place. The panes differ a lot in height, and swapping to a shorter one
  // collapses the page -- the browser then clamps the scroll position, which
  // reads as the page jumping to the top.
  var tabScroll = {};

  // `restore` is only true for a tab click. The detail-page back button also
  // calls this, and there show() sets the scroll position itself -- restoring
  // here would run a frame later and stomp on it.
  function selectTab(name, restore) {
    var current = document.querySelector('[data-tab].is-active');
    if (restore && current && current.getAttribute('data-tab') !== name) {
      tabScroll[current.getAttribute('data-tab')] = window.scrollY;
    }

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

    if (!restore) return;
    var want = tabScroll[name] || 0;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, Math.min(want, Math.max(max, 0)));
    });
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
    if (t) selectTab(t.getAttribute('data-tab'), true);
  });

  // keyboard: cards and tabs are role="button"/tabindex=0
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var c = e.target.closest && e.target.closest('[data-goto]');
    if (c) { e.preventDefault(); show(c.getAttribute('data-goto')); return; }
    var t = e.target.closest && e.target.closest('[data-tab]');
    if (t) { e.preventDefault(); selectTab(t.getAttribute('data-tab'), true); }
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

/* ===================================================================
   FANNED HIGHLIGHT CARDS -- behaviour -- CURRENTLY OFF

   Highlight clips peek from behind the project poster and fan out in a
   wide arc on hover. Handles 1-3 cards; the geometry is picked to suit
   however many a project actually has.

   The markup is gated behind `fan_enabled` in index.md. With it off there
   are no .project-fan__card elements, so everything below finds nothing
   and no-ops -- kept intact so flipping that flag brings the fan straight
   back. See also the FANNED HIGHLIGHT CARDS block in custom.css.
   =================================================================== */

(function () {
  // Fan geometry per card index, chosen by how many cards are present.
  // [x, y, rotation(deg), scale]
  var LAYOUTS = {
    1: [[-58,  10, -12, 0.94]],
    2: [[-34, -26,  -9, 0.94], [-78,   8, -18, 0.89]],
    3: [[-30, -30,  -8, 0.94], [-72,   4, -16, 0.90], [-104, 44, -24, 0.86]]
  };

  // At rest the cards sit at a fraction of their fanned position. Parked at
  // translate(0,0) they land exactly under the poster -- which covers the
  // column edge to edge -- so nothing peeks out and the stack reads as a
  // plain poster. Deriving the resting offset from LAYOUTS keeps the spread
  // tunable from one place.
  // 0.28 is the smallest fraction that still peeks for a single-card project,
  // whose only card sits furthest out (-58px) and so moves least at rest.
  var REST = 0.28;

  function fanCards(card) {
    return card.querySelectorAll('.project-fan__card');
  }

  function setFan(card, open) {
    var cards = fanCards(card);
    var layout = LAYOUTS[Math.min(cards.length, 3)];
    if (!layout) return;

    for (var i = 0; i < cards.length; i++) {
      var el = cards[i];
      var pos = layout[i];
      var k = open ? 1 : REST;
      el.style.transitionDelay = (open ? i * 65 : (cards.length - 1 - i) * 40) + 'ms';
      el.style.transform =
        'translate(' + (pos[0] * k) + 'px,' + (pos[1] * k) + 'px) rotate(' +
        (pos[2] * k) + 'deg) scale(' + (open ? pos[3] : 1) + ')';
      el.style.opacity = open ? '1' : '0.42';

      // Only play what's visible -- a fanned-out clip, nothing at rest.
      var v = el.querySelector('video');
      if (v) {
        if (open) { try { v.play(); } catch (e) {} }
        else { try { v.pause(); } catch (e) {} }
      }
    }

    var label = card.querySelector('.project-fan__count');
    if (label) label.style.opacity = open ? '1' : '0';
  }

  document.addEventListener('pointerover', function (e) {
    var c = e.target.closest && e.target.closest('.project-card');
    if (c && !c.contains(e.relatedTarget)) setFan(c, true);
  });
  document.addEventListener('pointerout', function (e) {
    var c = e.target.closest && e.target.closest('.project-card');
    if (c && !c.contains(e.relatedTarget)) setFan(c, false);
  });

  // keyboard parity -- focusing the card fans it open
  document.addEventListener('focusin', function (e) {
    var c = e.target.closest && e.target.closest('.project-card');
    if (c) setFan(c, true);
  });
  document.addEventListener('focusout', function (e) {
    var c = e.target.closest && e.target.closest('.project-card');
    if (c && !c.contains(e.relatedTarget)) setFan(c, false);
  });

  // Park the cards in their resting fan on load. Done with transitions
  // suppressed so they're already peeking at first paint instead of
  // sliding out once the script runs.
  function initFans() {
    var cards = document.querySelectorAll('.project-card');
    for (var i = 0; i < cards.length; i++) {
      var clips = fanCards(cards[i]);
      for (var j = 0; j < clips.length; j++) clips[j].style.transition = 'none';
      setFan(cards[i], false);
    }
    // next frame: hand the transitions back for real interaction
    requestAnimationFrame(function () {
      var clips = document.querySelectorAll('.project-fan__card');
      for (var k = 0; k < clips.length; k++) clips[k].style.transition = '';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFans);
  } else {
    initFans();
  }
})();
