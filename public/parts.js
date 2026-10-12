/* Macdio: nav and footer behaviour. The markup is written at build time
   (src/components/LegacyNav.astro and LegacyFooter.astro); this binds the
   More menu, the burger menu and the screenshot lightbox. */
(function () {
  function bindNav() {
    var navMore = document.getElementById('navMore');
    var navMoreBtn = document.getElementById('navMoreBtn');
    if (navMore && navMoreBtn) {
      navMoreBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = navMore.classList.toggle('open');
        navMoreBtn.setAttribute('aria-expanded', open);
      });
      var closeMore = function () { navMore.classList.remove('open'); navMoreBtn.setAttribute('aria-expanded', 'false'); };
      document.addEventListener('click', closeMore);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMore.classList.contains('open')) { closeMore(); navMoreBtn.focus(); }
      });
    }
    var burger = document.getElementById('navBurger');
    var mobileMenu = document.getElementById('mobileMenu');
    if (burger && mobileMenu) {
      var close = function () { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); };
      burger.addEventListener('click', function () {
        var open = document.body.classList.toggle('menu-open');
        burger.setAttribute('aria-expanded', open);
      });
      mobileMenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    }
  }

  // Screenshots and clips open large: images in the galleries, the podcast
  // section and the highlight block, and the clips next to them. A clip
  // reopens as its own player with controls; clicking it does not close the
  // overlay, the backdrop and Escape do.
  var ZOOMABLE = '.shot img, .shot video, .pod-shots img, .pod-shots video, .hl-block img, .hl-block video';
  function bindLightbox() {
    document.addEventListener('click', function (e) {
      var el = e.target && e.target.closest ? e.target.closest(ZOOMABLE) : null;
      if (!el) return;
      var ov = document.createElement('div');
      ov.className = 'lightbox';
      var big;
      if (el.tagName === 'VIDEO') {
        big = document.createElement('video');
        var sources = el.querySelectorAll('source');
        for (var i = 0; i < sources.length; i++) {
          var src = sources[i].getAttribute('src') || sources[i].getAttribute('data-src');
          if (src && big.canPlayType(sources[i].type || '')) { big.src = src; break; }
        }
        if (!big.src && sources.length) big.src = sources[sources.length - 1].getAttribute('src') || sources[sources.length - 1].getAttribute('data-src');
        big.poster = el.poster || el.getAttribute('data-poster') || '';
        big.muted = true; big.loop = true; big.playsInline = true; big.controls = true;
        big.autoplay = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        big.setAttribute('aria-label', el.getAttribute('aria-label') || '');
        big.addEventListener('click', function (ev) { ev.stopPropagation(); });
      } else {
        big = document.createElement('img');
        big.src = el.currentSrc || el.src;
        big.alt = el.alt || '';
      }
      ov.appendChild(big);
      function onKey(ev) { if (ev.key === 'Escape') close(); }
      function close() { ov.remove(); document.removeEventListener('keydown', onKey); }
      ov.addEventListener('click', close);
      document.addEventListener('keydown', onKey);
      document.body.appendChild(ov);
    });
  }

  // Language menu in the footer: remember the choice for a year (the Worker
  // reads the cookie when a visitor lands on "/"); the link itself navigates.
  function bindLang() {
    document.querySelectorAll('.lang-menu a[data-lang]').forEach(function (a) {
      a.addEventListener('click', function () {
        document.cookie = 'lang=' + a.getAttribute('data-lang') + '; Path=/; Max-Age=31536000; SameSite=Lax';
      });
    });
  }

  function init() { bindNav(); bindLightbox(); bindLang(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
