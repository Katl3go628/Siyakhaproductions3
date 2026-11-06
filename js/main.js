// Mobile menu, footer year, Our work autoplay zoom, scroll fade-in. No dependencies.
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
        toggle.focus();
      }
    });
  }
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Our work: zoom each photo in turn. Pauses on hover; skipped for reduced motion.
  var grid = document.querySelector('.portfolio .grid');
  var tiles = document.querySelectorAll('.portfolio .zoom');
  if (grid && tiles.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var i = 0, timer = null;
    var clear = function () { for (var k = 0; k < tiles.length; k++) tiles[k].classList.remove('active'); };
    var step = function () { clear(); tiles[i].classList.add('active'); i = (i + 1) % tiles.length; };
    var start = function () { stop(); step(); timer = setInterval(step, 2800); };
    var stop = function () { clearInterval(timer); clear(); };
    grid.addEventListener('mouseenter', stop);
    grid.addEventListener('mouseleave', start);
    start();
  }

  // Gentle fade-up as sections scroll into view. Skipped for reduced motion or old browsers.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var targets = document.querySelectorAll('.intro .wrap > *, .division .wrap > *, .services .cols > div, .portfolio .grid, .why dl, .contact .wrap > *');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    for (var n = 0; n < targets.length; n++) { targets[n].classList.add('reveal'); io.observe(targets[n]); }
  }
})();
