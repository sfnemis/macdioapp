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
      document.addEventListener('click', function () {
        navMore.classList.remove('open');
        navMoreBtn.setAttribute('aria-expanded', 'false');
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

  function bindLightbox() {
    document.addEventListener('click', function (e) {
      var img = e.target && e.target.closest ? e.target.closest('.shot img') : null;
      if (!img) return;
      var ov = document.createElement('div');
      ov.className = 'lightbox';
      var big = document.createElement('img');
      big.src = img.currentSrc || img.src;
      big.alt = img.alt || '';
      ov.appendChild(big);
      function onKey(ev) { if (ev.key === 'Escape') close(); }
      function close() { ov.remove(); document.removeEventListener('keydown', onKey); }
      ov.addEventListener('click', close);
      document.addEventListener('keydown', onKey);
      document.body.appendChild(ov);
    });
  }

  function init() { bindNav(); bindLightbox(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
