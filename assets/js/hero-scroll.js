/* ===================================================================
   Scroll-driven hero
   Drives a two-beat hero: the name panel hands off to the background
   panel as you scroll (they SWAP in the same slot, so the text never
   stacks past the bottom of a laptop screen), then the whole hero
   lifts as the work panel rises over it.

   Tuning (fractions of the pin track):
     swap  0.16 -> 0.42   name hands off to background
     lift  0.66 -> 1.00   hero lifts and dims
   =================================================================== */

(function () {
  var clamp = function (v) { return Math.min(Math.max(v, 0), 1); };
  var raf = null;

  function update() {
    raf = null;
    var track = document.querySelector('[data-hero-track]');
    if (!track) return;
    var rect = track.getBoundingClientRect();
    var total = track.offsetHeight - window.innerHeight;
    var scrolled = Math.min(Math.max(-rect.top, 0), total);
    var p = total > 0 ? scrolled / total : 0;

    var swap = clamp((p - 0.16) / 0.26);   // 0 = name, 1 = background
    var lift = clamp((p - 0.66) / 0.34);   // hero lifts / dims

    var s = track.style;
    s.setProperty('--name-o', (1 - swap));
    s.setProperty('--name-y', (-42 * swap) + 'px');
    s.setProperty('--bio-o', swap);
    s.setProperty('--bio-y', ((1 - swap) * 42) + 'px');
    s.setProperty('--hero-y', (-70 * lift) + 'px');
    s.setProperty('--hero-o', (1 - 0.92 * lift));
    s.setProperty('--video-bright', (0.84 - 0.46 * lift));
    s.setProperty('--hint-o', clamp(1 - p / 0.08));

    // Only the visible panel should be clickable or reachable by keyboard.
    // Under 700px both panels render in normal flow, so nothing is hidden.
    var stacked = window.matchMedia('(max-width: 700px)').matches;
    var showBio = swap > 0.5;
    setPanelActive(track.querySelector('[data-hero-panel="name"]'), stacked || !showBio);
    setPanelActive(track.querySelector('[data-hero-panel="bio"]'), stacked || showBio);
  }

  function setPanelActive(panel, active) {
    if (!panel) return;
    panel.style.pointerEvents = active ? 'auto' : 'none';
    if (active) panel.removeAttribute('inert');
    else panel.setAttribute('inert', '');
  }

  function onScroll() {
    if (!raf) raf = requestAnimationFrame(update);
  }

  // capture:true so it also works if the page scrolls an inner container
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  document.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
  setTimeout(update, 200);
  setTimeout(update, 800);
})();
