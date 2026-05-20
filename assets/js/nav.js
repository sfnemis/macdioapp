/* Macdio — Shared Navigation Component */
(function () {
  var NAV_HTML = `
<div class="mobile-nav-overlay" id="mobileNav">
  <div class="mobile-nav-backdrop" onclick="macdioNav.close()"></div>
  <div class="mobile-nav-panel">
    <div class="mobile-nav-download">
      <a href="https://apps.apple.com/app/macdio/id6761737888" target="_blank" rel="noopener" onclick="macdioNav.close()" aria-label="Download Macdio on the App Store">
        <img src="download_button_light.svg" alt="Download on the App Store" style="height:44px;width:auto;display:block;" onerror="this.style.display='none'">
      </a>
    </div>
    <div class="mobile-nav-divider"></div>
    <div class="mobile-nav-links">
      <a href="https://hub.macdio.app" class="mobile-nav-link" target="_blank" rel="noopener" onclick="macdioNav.close()">
        Community <span class="community-dot" style="margin-left:2px;"></span>
      </a>
      <a href="index.html#features" class="mobile-nav-link" onclick="macdioNav.close()">Features</a>
      <a href="index.html#screenshots" class="mobile-nav-link" onclick="macdioNav.close()">Screenshots</a>
      <div class="mobile-nav-divider"></div>
      <a href="support.html" class="mobile-nav-link" onclick="macdioNav.close()">Support</a>
      <a href="privacy.html" class="mobile-nav-link" onclick="macdioNav.close()">Privacy</a>
      <a href="transparency.html" class="mobile-nav-link" onclick="macdioNav.close()">Transparency</a>
      <a href="accessibility.html" class="mobile-nav-link" onclick="macdioNav.close()">Accessibility</a>
      <a href="submit-station.html" class="mobile-nav-link" onclick="macdioNav.close()">Submit Station</a>
      <a href="stations.html" class="mobile-nav-link" onclick="macdioNav.close()">Stations</a>
      <a href="presskit.html" class="mobile-nav-link" onclick="macdioNav.close()">Press Kit</a>
    </div>
    <div class="mobile-nav-footer">
      <p>Available on iPhone, iPad, Mac, Apple TV,<br>Apple Watch &amp; CarPlay &middot; 55,000+ Stations</p>
    </div>
  </div>
</div>

<nav id="navbar">
  <a href="index.html" class="nav-brand">
    <img src="assets/app-icon.png" alt="Macdio" width="32" height="32">
    <span>Macdio</span>
  </a>
  <div class="nav-links">
    <a href="https://hub.macdio.app" class="nav-community" target="_blank" rel="noopener">
      Community <span class="community-dot"></span>
    </a>
    <a href="index.html#features">Features</a>
    <a href="index.html#screenshots">Screenshots</a>
    <div class="nav-more-wrapper">
      <button class="nav-more-btn" id="navMoreBtn" aria-label="More pages" aria-expanded="false">
        More <span class="nav-more-chevron">▾</span>
      </button>
      <div class="nav-more-dropdown" id="navMoreDropdown">
        <a href="support.html">Support</a>
        <a href="privacy.html">Privacy</a>
        <a href="transparency.html">Transparency</a>
        <a href="accessibility.html">Accessibility</a>
        <a href="submit-station.html">Submit Station</a>
        <a href="stations.html">Stations</a>
        <a href="presskit.html">Press Kit</a>
      </div>
    </div>
    <a href="https://apps.apple.com/app/macdio/id6761737888" class="nav-download-svg" target="_blank" rel="noopener" aria-label="Download Macdio on the App Store">
      <img src="download_button_light.svg" alt="Download on the App Store" style="height:36px;width:auto;display:block;" onerror="this.style.display='none'">
    </a>
  </div>
  <button class="mobile-menu-btn" id="mobileMenuBtn" onclick="macdioNav.toggle()" aria-label="Open menu">
    <div class="hamburger-lines">
      <span></span><span></span><span></span>
    </div>
  </button>
</nav>
`;

  window.macdioNav = {
    toggle: function () {
      var nav = document.getElementById('mobileNav');
      if (nav && nav.classList.contains('open')) { this.close(); } else { this.open(); }
    },
    open: function () {
      var nav = document.getElementById('mobileNav');
      var btn = document.getElementById('mobileMenuBtn');
      if (!nav) return;
      nav.classList.add('open');
      if (btn) btn.classList.add('active');
      document.body.classList.add('menu-open');
    },
    close: function () {
      var nav = document.getElementById('mobileNav');
      var btn = document.getElementById('mobileMenuBtn');
      if (!nav) return;
      nav.classList.remove('open');
      if (btn) btn.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  };

  function inject() {
    var placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;
    placeholder.outerHTML = NAV_HTML;

    window.addEventListener('scroll', function () {
      var nb = document.getElementById('navbar');
      if (nb) nb.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    var moreBtn  = document.getElementById('navMoreBtn');
    var moreDrop = document.getElementById('navMoreDropdown');
    if (moreBtn && moreDrop) {
      moreBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = moreDrop.classList.toggle('open');
        moreBtn.setAttribute('aria-expanded', isOpen);
        var chev = moreBtn.querySelector('.nav-more-chevron');
        if (chev) chev.style.transform = isOpen ? 'rotate(180deg)' : '';
      });
    }

    document.addEventListener('click', function () {
      if (moreDrop) moreDrop.classList.remove('open');
      if (moreBtn)  moreBtn.setAttribute('aria-expanded', 'false');
      var chev = moreBtn && moreBtn.querySelector('.nav-more-chevron');
      if (chev) chev.style.transform = '';
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') window.macdioNav.close();
    });

    var path = window.location.pathname;
    document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(function (a) {
      try {
        var ap = new URL(a.href, window.location.origin).pathname;
        if (ap === path || (path === '/' && ap === '/index.html')) {
          a.classList.add('nav-active');
        }
      } catch (_) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
