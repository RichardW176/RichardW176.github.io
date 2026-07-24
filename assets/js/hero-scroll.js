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

    var aboutT  = clamp((p - 0.12) / 0.28);   // About reveal
    var socialT = clamp((p - 0.30) / 0.24);   // Socials follow
    var lift    = clamp((p - 0.58) / 0.30);   // Hero lifts / dims

    var s = track.style;
    s.setProperty('--about-o', aboutT);
    s.setProperty('--about-mh', (aboutT * 360) + 'px');
    s.setProperty('--about-y', ((1 - aboutT) * 22) + 'px');
    s.setProperty('--social-o', socialT);
    s.setProperty('--social-y', ((1 - socialT) * 18) + 'px');
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
