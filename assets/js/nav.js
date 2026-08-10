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
      <a href="https://hub.devdio.pro" class="mobile-nav-link" target="_blank" rel="noopener" onclick="macdioNav.close()">
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
    <div class="mobile-nav-social">
      <a href="https://x.com/macdioapp" target="_blank" rel="noopener" aria-label="Macdio on X" class="nav-social-link">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href="https://www.instagram.com/macdioapp" target="_blank" rel="noopener" aria-label="Macdio on Instagram" class="nav-social-link">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      </a>
      <a href="https://www.tiktok.com/@macdioapp" target="_blank" rel="noopener" aria-label="Macdio on TikTok" class="nav-social-link">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z"/></svg>
      </a>
      <a href="https://www.youtube.com/@macdioapp" target="_blank" rel="noopener" aria-label="Macdio on YouTube" class="nav-social-link">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
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
    <a href="https://hub.devdio.pro" class="nav-community" target="_blank" rel="noopener">
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
    <div class="nav-social">
      <a href="https://x.com/macdioapp" target="_blank" rel="noopener" aria-label="Macdio on X" class="nav-social-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href="https://www.instagram.com/macdioapp" target="_blank" rel="noopener" aria-label="Macdio on Instagram" class="nav-social-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      </a>
      <a href="https://www.tiktok.com/@macdioapp" target="_blank" rel="noopener" aria-label="Macdio on TikTok" class="nav-social-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z"/></svg>
      </a>
      <a href="https://www.youtube.com/@macdioapp" target="_blank" rel="noopener" aria-label="Macdio on YouTube" class="nav-social-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
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
