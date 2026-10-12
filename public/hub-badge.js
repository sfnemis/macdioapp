/* "What's new" on the logo. Asks this site's own /api/hub for the three
   newest release notes on hub.devdio.pro; when the newest one is one this
   browser has not seen, a small "New" dot sits on the logo. Clicking the
   dot opens a short list of the release notes; opening one, or "Got it",
   remembers the newest post in localStorage and the dot goes away. Nothing
   is sent anywhere, and the hub itself is never contacted by the browser. */
(function () {
  var KEY = 'macdio.hub.seen';
  // Labels from the page's own language (window.MACDIO_I18N.badge, written by
  // the page shell), English when a page has none.
  var I = (window.MACDIO_I18N && window.MACDIO_I18N.badge) || {};
  var L = function (k, d) { return I[k] || d; };
  var lang = document.documentElement.lang || 'en';
  var day = function (iso) { try { return new Date(iso + 'T12:00:00Z').toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return iso; } };
  var anchor = document.querySelector('.nav-brand') || document.querySelector('a.guides-brand');
  if (!anchor || !window.fetch) return;
  var seen = 0;
  try { seen = parseInt(localStorage.getItem(KEY) || '0', 10) || 0; } catch (e) {}

  function remember(id) { try { localStorage.setItem(KEY, String(id)); } catch (e) {} }

  function style() {
    if (document.getElementById('hub-badge-style')) return;
    var s = document.createElement('style');
    s.id = 'hub-badge-style';
    s.textContent =
      '.hub-anchor{position:relative}' +
      '.hub-dot{position:absolute;top:-9px;left:16px;padding:2px 6px;border-radius:999px;background:linear-gradient(100deg,#6366f1,#a855f7 50%,#ec4899);color:#fff;font:600 10px/1.2 -apple-system,BlinkMacSystemFont,"SF Pro Text",Helvetica,Arial,sans-serif;letter-spacing:.04em;text-transform:uppercase;border:0;cursor:pointer;box-shadow:0 2px 10px rgba(168,85,247,.45);z-index:3}' +
      '.hub-dot:hover{filter:brightness(1.1)}' +
      '.hub-pop{position:fixed;top:64px;left:14px;z-index:200;width:min(360px,calc(100vw - 28px));padding:14px 14px 10px;border-radius:16px;background:rgba(14,14,20,.96);border:1px solid rgba(255,255,255,.1);box-shadow:0 24px 60px rgba(0,0,0,.6);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text",Helvetica,Arial,sans-serif}' +
      '.hub-pop h2{margin:0 0 10px;font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#b3b3be}' +
      '.hub-pop a{display:block;padding:9px 10px;border-radius:10px;color:#f5f5f7;text-decoration:none;font-size:14px;line-height:1.35}' +
      '.hub-pop a:hover{background:rgba(255,255,255,.06)}' +
      '.hub-pop a small{display:block;margin-top:2px;font-size:12px;color:#8a8a99}' +
      '.hub-pop a.hub-new{border-left:2px solid #a855f7}' +
      '.hub-pop .hub-foot{display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.08)}' +
      '.hub-pop .hub-foot a{display:inline;padding:0;font-size:12px;color:#c4b5fd}' +
      '.hub-pop button{background:none;border:1px solid rgba(255,255,255,.14);color:#f5f5f7;border-radius:999px;padding:5px 12px;font-size:12px;cursor:pointer}' +
      '.hub-pop button:hover{border-color:rgba(168,85,247,.6)}';
    document.head.appendChild(s);
  }

  function show(notes) {
    style();
    anchor.classList.add('hub-anchor');
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hub-dot';
    dot.textContent = L('new', 'New');
    dot.setAttribute('aria-label', L('label', "What's new: {title}").split('{title}').join(notes[0].title));
    dot.setAttribute('aria-expanded', 'false');
    anchor.appendChild(dot);
    var pop = null;

    function close() {
      if (!pop) return;
      pop.remove(); pop = null;
      dot.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDoc);
    }
    function done() { remember(notes[0].id); close(); dot.remove(); anchor.classList.remove('hub-anchor'); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    function onDoc(e) { if (pop && !pop.contains(e.target) && e.target !== dot) close(); }
    function open() {
      pop = document.createElement('div');
      pop.className = 'hub-pop';
      pop.setAttribute('role', 'dialog');
      pop.setAttribute('aria-label', L('dialog', "What's new in Macdio"));
      var h = document.createElement('h2'); h.textContent = L('title', "What's new"); pop.appendChild(h);
      notes.forEach(function (n) {
        var a = document.createElement('a');
        a.href = n.url; a.target = '_blank'; a.rel = 'noopener';
        if (n.id > seen) a.className = 'hub-new';
        a.textContent = n.title;
        var d = document.createElement('small'); d.textContent = day(n.date); a.appendChild(d);
        a.addEventListener('click', done);
        pop.appendChild(a);
      });
      var foot = document.createElement('div'); foot.className = 'hub-foot';
      var all = document.createElement('a'); all.href = 'https://hub.devdio.pro/c/macdio/release-notes/6'; all.target = '_blank'; all.rel = 'noopener'; all.textContent = L('all', 'All release notes');
      all.addEventListener('click', done);
      var ok = document.createElement('button'); ok.type = 'button'; ok.textContent = L('gotIt', 'Got it'); ok.addEventListener('click', done);
      foot.appendChild(all); foot.appendChild(ok); pop.appendChild(foot);
      document.body.appendChild(pop);
      dot.setAttribute('aria-expanded', 'true');
      setTimeout(function () { document.addEventListener('keydown', onKey); document.addEventListener('click', onDoc); }, 0);
    }
    dot.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); if (pop) close(); else open(); });
  }

  fetch('/api/hub', { cache: 'default' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (data) {
    var notes = data && data.releaseNotes;
    if (!notes || !notes.length || !(notes[0].id > seen)) return;
    show(notes);
  }).catch(function () { /* no badge is the quiet failure */ });
})();
