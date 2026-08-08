/* ===================================================================
   Step-driven hero

   DISCRETE beats. One wheel gesture / swipe / arrow key advances the hero
   to the next beat and animates the page there; the panels crossfade via
   CSS transitions. Nothing is driven by raw scroll fraction, so there is
   no awkward half-transparent middle state.

     step 0 — name + role
     step 1 — background copy + contact links
     step 2 — scrolls to #portfolio-showcase; the hero clears the screen

   Steps 0 and 1 are the two PINNED beats, so the track is 200vh with no empty
   tail. Step 2 is not a pinned beat — it hands you to the work section.
   Scrolling back UP off the work section jumps instantly to beat 1 rather than
   easing, so the hero and portfolio are never on screen together.

   Below 700px the whole thing is inert (see the media query in
   custom.css) and the page scrolls normally.
   =================================================================== */

(function () {
  if (window.matchMedia('(max-width: 700px)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var step = 0;
  var maxstep = 2;
  var busy = false;
  var settled = 0;   // guards against trackpad inertia firing extra steps

  function apply() {
    var track = document.querySelector('[data-hero-track]');
    if (!track) return;
    track.setAttribute('data-step', step);

    var label = track.querySelector('[data-hero-hint-label]');
    if (label) {
      var next = step >= 1 ? 'Portfolio' : 'Background';
      if (label.textContent !== next) label.textContent = next;
    }
  }

  function targetY() {
    var track = document.querySelector('[data-hero-track]');
    if (!track) return 0;
    var pagetop = window.pageYOffset || document.documentElement.scrollTop;
    // The final beat lands ON the portfolio — scroll straight to the work
    // section so the hero clears the screen instead of parking mid-track
    // with a dimmed hero and a half-visible portfolio behind it.
    if (step >= maxstep) {
      var work = document.querySelector('#portfolio-showcase');
      if (work) return work.getBoundingClientRect().top + pagetop;
    }
    return track.getBoundingClientRect().top + pagetop + step * window.innerHeight;
  }

  function go(dir, instant) {
    var next = Math.min(Math.max(step + dir, 0), maxstep);
    if (next === step) return;
    step = next;
    busy = true;
    apply();
    window.scrollTo({ top: targetY(), behavior: instant ? 'auto' : 'smooth' });
    setTimeout(function () {
      busy = false;
      settled = Date.now();
    }, instant ? 260 : 700);
  }

  // showcase.js hides the pin track with display:none when a detail view
  // opens, and getBoundingClientRect() on a hidden element is all zeros —
  // which passes both the `top <= 2` and `bottom > -x` guards below. That
  // made atseam() true on every detail page, so scrolling up inside a
  // project kept firing the jump-back. A zero-size track means no zone.
  function heroTrackRect() {
    var track = document.querySelector('[data-hero-track]');
    if (!track) return null;
    var r = track.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return null;
    return r;
  }

  // true while any project / writing detail view is open
  function detailViewOpen() {
    var views = document.querySelectorAll('[data-view]');
    for (var i = 0; i < views.length; i++) {
      if (views[i].getAttribute('data-view') === 'index') continue;
      if (views[i].offsetParent !== null) return true;   // visible
    }
    return false;
  }

  // Sitting just below the pinned hero — i.e. right at the top of the work
  // section. Scrolling up from here jumps back to the Background beat instead
  // of slowly free-scrolling and showing hero + portfolio together.
  // Kept tight (~8% of a viewport) so it doesn't fire while you're already
  // reading the portfolio. Raise SEAM for a larger catch zone.
  var SEAM = 0.08;
  function atseam() {
    if (detailViewOpen()) return false;
    var r = heroTrackRect();
    if (!r) return false;
    return r.top <= 2 && r.bottom > -window.innerHeight * SEAM;
  }

  // true while the pinned hero owns the viewport
  function inzone() {
    if (detailViewOpen()) return false;
    var r = heroTrackRect();
    if (!r) return false;
    return r.top <= 2 && r.bottom >= window.innerHeight - 2;
  }

  document.addEventListener('wheel', function (e) {
    var dir = e.deltaY > 0 ? 1 : -1;
    // scrolling back up off the work section: snap instantly to Background
    if (dir < 0 && step >= maxstep && atseam()) {
      if (Math.abs(e.deltaY) < 16) return;   // ignore faint upward drift
      e.preventDefault();
      if (busy || Date.now() - settled < 320) return;
      step = maxstep;              // so go(-1) lands on maxstep - 1
      go(-1, true);
      return;
    }
    if (!inzone()) return;
    // at the ends, hand scrolling back to the page
    if (dir > 0 && step >= maxstep) return;
    if (dir < 0 && step <= 0) return;
    e.preventDefault();
    if (busy || Date.now() - settled < 260) return;
    if (Math.abs(e.deltaY) < 4) return;
    go(dir);
  }, { passive: false });

  var starty = 0;
  document.addEventListener('touchstart', function (e) {
    starty = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchmove', function (e) {
    if (busy) return;
    var dy = starty - e.touches[0].clientY;
    if (Math.abs(dy) < 40) return;
    var dir = dy > 0 ? 1 : -1;
    if (dir < 0 && step >= maxstep && atseam()) {
      if (Math.abs(dy) < 70) return;         // needs a deliberate swipe
      e.preventDefault();
      starty = e.touches[0].clientY;
      step = maxstep;
      go(-1, true);
      return;
    }
    if (!inzone()) return;
    if (dir > 0 && step >= maxstep) return;
    if (dir < 0 && step <= 0) return;
    e.preventDefault();
    starty = e.touches[0].clientY;
    go(dir);
  }, { passive: false });

  document.addEventListener('keydown', function (e) {
    var up = (e.key === 'ArrowUp' || e.key === 'PageUp');
    if (up && step >= maxstep && atseam()) {
      e.preventDefault();
      step = maxstep;
      go(-1, true);
      return;
    }
    if (!inzone()) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      if (step < maxstep) { e.preventDefault(); go(1); }
    } else if (up) {
      if (step > 0) { e.preventDefault(); go(-1); }
    }
  });

  // resync if the user drags the scrollbar or lands via an anchor
  window.addEventListener('scroll', function () {
    if (busy) return;
    var track = document.querySelector('[data-hero-track]');
    if (!track) return;
    var r = track.getBoundingClientRect();
    // scrolled past the pinned region entirely — treat as the final beat
    if (r.bottom < window.innerHeight - 2) {
      if (step !== maxstep) { step = maxstep; apply(); }
      return;
    }
    var guess = Math.min(
      Math.round(Math.max(-r.top, 0) / window.innerHeight),
      maxstep - 1
    );
    if (guess !== step) { step = guess; apply(); }
  }, { passive: true, capture: true });

  window.addEventListener('resize', function () {
    if (!busy && inzone()) window.scrollTo({ top: targetY() });
  }, { passive: true });

  apply();
  setTimeout(apply, 200);
  setTimeout(apply, 800);
})();
