/* ===================================================================
   Scroll-driven hero
   Reads scroll progress across the hero pin track and feeds the reveal
   values to CSS as custom properties (consumed in custom.css).
   =================================================================== */

(function () {
  var track = document.querySelector('[data-hero-track]');
  if (!track) return;

  var clamp = function (v) { return Math.min(Math.max(v, 0), 1); };
  var raf = null;

  function update() {
    raf = null;
    var rect = track.getBoundingClientRect();
    var total = track.offsetHeight - window.innerHeight;
    var scrolled = Math.min(Math.max(-rect.top, 0), total);
    var p = total > 0 ? scrolled / total : 0;

    // About + socials now spawn on load (CSS), so scroll only drives the
    // pin-and-lift of the hero up into the projects.
    var lift = clamp((p - 0.12) / 0.6);   // Hero lifts / dims

    var s = track.style;
    s.setProperty('--hero-y', (-80 * lift) + 'px');
    s.setProperty('--hero-o', (1 - lift));
    s.setProperty('--video-bright', (0.84 - 0.46 * lift));
    s.setProperty('--hint-o', clamp(1 - p / 0.08));
  }

  function onScroll() {
    if (!raf) raf = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
