/* Macdio redesign — shared nav + footer (LOCAL DRAFT)
   Inject by placing <div id="nav-slot"></div> and <div id="footer-slot"></div>,
   then loading this script. Override window.MACDIO_ASSETS / window.MACDIO_HOME
   per page if the relative paths differ. */
(function () {
  var A = (typeof window.MACDIO_ASSETS === 'string') ? window.MACDIO_ASSETS : '';
  var HOME = (typeof window.MACDIO_HOME === 'string') ? window.MACDIO_HOME : 'index.html';
  // Page base: content pages live in the SAME folder as the visited page (default '').
  // A (assets base) only points at shared images; page links must NOT use it.
  var P = (typeof window.MACDIO_PAGES === 'string') ? window.MACDIO_PAGES : '';

  var SOCIALS =
    '<a href="https://x.com/macdioapp" target="_blank" rel="noopener" aria-label="Macdio on X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg></a>' +
    '<a href="https://www.instagram.com/macdioapp" target="_blank" rel="noopener" aria-label="Macdio on Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>' +
    '<a href="https://www.tiktok.com/@macdioapp" target="_blank" rel="noopener" aria-label="Macdio on TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>' +
    '<a href="https://www.youtube.com/@macdioapp" target="_blank" rel="noopener" aria-label="Macdio on YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>';

  var MORE_LINKS =
    '<a href="' + P + 'support.html">Support</a>' +
    '<a href="' + P + 'privacy.html">Privacy</a>' +
    '<a href="' + P + 'transparency.html">Transparency</a>' +
    '<a href="' + P + 'accessibility.html">Accessibility</a>' +
    '<a href="' + P + 'submit-station.html">Submit Station</a>' +
    '<a href="' + P + 'stations.html">Stations</a>' +
    '<a href="' + P + 'presskit.html">Press Kit</a>';

  var NAV =
    '<nav class="nav">' +
      '<a class="nav-brand" href="' + HOME + '"><img src="' + A + 'assets/app-icon.png" alt="Macdio"><span>Macdio</span></a>' +
      '<div class="nav-right">' +
        '<div class="nav-links">' +
          '<a href="https://hub.macdio.app" target="_blank" rel="noopener">Community <span class="dot-green"></span></a>' +
          '<a href="' + HOME + '#identify">Features</a>' +
          '<a href="' + HOME + '#preview">Screenshots</a>' +
          '<div class="nav-more" id="navMore"><button class="nav-more-btn" id="navMoreBtn" aria-expanded="false" aria-label="More pages">More <span class="chev">▾</span></button>' +
            '<div class="nav-more-menu">' + MORE_LINKS + '</div></div>' +
        '</div>' +
        '<div class="nav-socials">' + SOCIALS + '</div>' +
        '<a class="nav-appstore" href="https://apps.apple.com/app/macdio/id6761737888" target="_blank" rel="noopener" aria-label="Download Macdio on the App Store"><img src="' + A + 'download_button.svg" alt="Download on the App Store"></a>' +
        '<button class="nav-burger" id="navBurger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '</div>' +
    '</nav>' +
    '<div class="mobile-menu" id="mobileMenu">' +
      '<div class="mm-socials">' + SOCIALS + '</div>' +
      '<a class="mm-link" href="https://hub.macdio.app" target="_blank" rel="noopener">Community <span class="dot-green"></span></a>' +
      '<a class="mm-link" href="' + HOME + '#identify">Features</a>' +
      '<a class="mm-link" href="' + HOME + '#preview">Screenshots</a>' +
      '<a class="mm-small" href="' + P + 'support.html">Support</a>' +
      '<a class="mm-small" href="' + P + 'privacy.html">Privacy</a>' +
      '<a class="mm-small" href="' + P + 'transparency.html">Transparency</a>' +
      '<a class="mm-small" href="' + P + 'accessibility.html">Accessibility</a>' +
      '<a class="mm-small" href="' + P + 'submit-station.html">Submit Station</a>' +
      '<a class="mm-small" href="' + P + 'stations.html">Stations</a>' +
      '<a class="mm-small" href="' + P + 'presskit.html">Press Kit</a>' +
      '<a class="mm-download" href="https://apps.apple.com/app/macdio/id6761737888" target="_blank" rel="noopener" aria-label="Download Macdio on the App Store"><img src="' + A + 'download_button.svg" alt="Download on the App Store"></a>' +
    '</div>';

  var FOOTER =
    '<footer class="footer"><div class="wrap">' +
      '<a class="footer-brand" href="' + HOME + '"><img src="' + A + 'assets/app-icon.png" alt="Macdio"><span>Macdio</span></a>' +
      '<nav class="footer-nav">' +
        '<a href="' + P + 'support.html">Support</a>' +
        '<a href="' + P + 'privacy.html">Privacy</a>' +
        '<a href="' + P + 'presskit.html">Press Kit</a>' +
        '<a href="mailto:support@macdio.app">Contact</a>' +
      '</nav>' +
      '<div class="footer-socials">' + SOCIALS + '</div>' +
      '<div class="footer-copy">© 2026 SFN. All rights reserved. ' +
        '<a href="https://logo.dev" rel="noopener">Missing station logos provided by Logo.dev</a>' +
      '</div>' +
    '</div></footer>';

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

  function inject() {
    var n = document.getElementById('nav-slot');
    if (n) n.outerHTML = NAV;
    var f = document.getElementById('footer-slot');
    if (f) f.outerHTML = FOOTER;
    bindNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
