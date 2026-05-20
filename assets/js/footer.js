/* Macdio — Shared Footer Component */
(function () {
  var FOOTER_HTML = `
<footer>
  <div class="footer-brand">
    <img src="assets/app-icon.png" alt="Macdio" width="34" height="34">
    <span>Macdio</span>
  </div>
  <div class="footer-links">
    <div class="footer-col">
      <p class="footer-col-title">App</p>
      <a href="/index.html#features">Features</a>
      <a href="/index.html#screenshots">Screenshots</a>
      <a href="https://apps.apple.com/app/macdio/id6761737888" target="_blank" rel="noopener">Download</a>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Community</p>
      <a href="/community.html">Community Hub</a>
      <a href="/stations.html">Stations</a>
      <a href="/submit-station.html">Submit Station</a>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Legal</p>
      <a href="/privacy.html">Privacy Policy</a>
      <a href="/transparency.html">Transparency</a>
      <a href="/accessibility.html">Accessibility</a>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Support</p>
      <a href="/support.html">Help Center</a>
      <a href="mailto:support@macdio.app">Contact</a>
      <a href="/presskit.html">Press Kit</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 SFN. All rights reserved.</p>
    <p class="footer-platforms">iPhone &middot; iPad &middot; Mac &middot; Apple TV &middot; Apple Watch &middot; CarPlay</p>
  </div>
</footer>
`;

  function inject() {
    var placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;
    placeholder.outerHTML = FOOTER_HTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
