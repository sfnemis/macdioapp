/* "What's new" in the home page hero (tracker W11). Asks this site's own
   /api/hub for the three newest release notes on hub.devdio.pro; the browser
   never contacts the hub itself.

   Two forms, picked by measuring, not by a breakpoint: the free space beside
   the headline differs a lot by language (312 px in English at 1280 wide,
   59 px in Russian).
   - Wide: a card in the empty space beside the headline lists the notes as
     plain content; the newest note, until this browser opens one, is marked "New".
   - Narrow: when there is an unseen note, a "New" pill sits next to the "3"
     mark and opens the same list right after it in the page; focus moves in
     and returns to the pill on Escape.
   Opening a note, "All release notes" or "Got it" remembers the newest post
   in localStorage, and the pill and the marks go away. */
(function () {
  var KEY = 'macdio.hub.seen';
  var CARD_MIN = 260, CARD_MAX = 320, GUTTER = 24;
  var I = (window.MACDIO_I18N && window.MACDIO_I18N.badge) || {};
  var L = function (k, d) { return I[k] || d; };
  var lang = document.documentElement.lang || 'en';
  var rtl = document.documentElement.dir === 'rtl';
  var day = function (iso) { try { return new Date(iso + 'T12:00:00Z').toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return iso; } };
  var hero = document.querySelector('.hero');
  var mark = hero && hero.querySelector('.hero-mark');
  if (!mark || !window.fetch) return;
  var seen = 0;
  try { seen = parseInt(localStorage.getItem(KEY) || '0', 10) || 0; } catch (e) {}
  function remember(id) { seen = id; try { localStorage.setItem(KEY, String(id)); } catch (e) {} }

  function style() {
    var s = document.createElement('style');
    s.textContent =
      '.hub-wrap{position:relative;display:inline-flex;align-items:center}' +
      '.hub-dot{position:absolute;top:50%;left:calc(100% + 10px);transform:translateY(-50%);padding:3px 8px;border-radius:999px;background:var(--grad);color:#fff;font-family:inherit;font-size:11px;font-weight:600;line-height:1.2;letter-spacing:.06em;text-transform:uppercase;border:0;cursor:pointer;box-shadow:0 2px 12px rgba(168,85,247,.45);white-space:nowrap}' +
      '.hub-dot:hover{filter:brightness(1.1)}' +
      '.hub-list{text-align:start;padding:14px 14px 10px;border-radius:18px;background:rgba(14,14,20,.92);border:1px solid var(--border);box-shadow:0 24px 60px rgba(0,0,0,.5);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}' +
      '.hub-pop{position:absolute;z-index:20;top:calc(100% + 12px);left:50%;transform:translateX(-50%);width:min(360px,calc(100vw - 32px))}' +
      '.hub-card{display:none;position:absolute;z-index:2;top:50%;inset-inline-end:' + GUTTER + 'px;transform:translateY(-50%)}' +
      '.hero.hub-card-mode .hub-card{display:block}.hero.hub-card-mode .hub-dot,.hero.hub-card-mode .hub-pop{display:none}' +
      '.hub-list h2{margin:0 0 8px;padding:0 10px;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--text-3)}' +
      '.hub-list a.hub-note{display:block;padding:9px 10px;border-radius:10px;color:var(--text);font-size:14px;line-height:1.35;transition:background .15s}' +
      '.hub-list a.hub-note:hover{background:rgba(255,255,255,.06)}' +
      '.hub-list a.hub-note small{display:flex;align-items:center;gap:8px;margin-top:3px;font-size:12px;color:var(--text-3)}' +
      '.hub-list .hub-tag{padding:1px 7px;border-radius:999px;background:var(--grad);color:#fff;font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase}' +
      '.hub-list .hub-foot{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:6px;padding:8px 10px 0;border-top:1px solid var(--border)}' +
      '.hub-list .hub-foot a{font-size:12px;color:#c4b5fd}' +
      '.hub-list button{background:none;border:1px solid var(--border);color:var(--text);border-radius:999px;padding:5px 12px;font:inherit;font-size:12px;cursor:pointer}' +
      '.hub-list button:hover{border-color:rgba(168,85,247,.6)}' +
      '.hub-list a:focus-visible,.hub-list button:focus-visible,.hub-dot:focus-visible{outline:2px solid #c4b5fd;outline-offset:2px}';
    document.head.appendChild(s);
  }

  // One list, used by the card and by the pill's popover.
  function list(notes, withGotIt, onDone) {
    var box = document.createElement('div');
    box.className = 'hub-list';
    var h = document.createElement('h2'); h.textContent = L('title', "What's new"); box.appendChild(h);
    notes.forEach(function (n) {
      var a = document.createElement('a');
      a.className = 'hub-note';
      a.href = n.url; a.target = '_blank'; a.rel = 'noopener';
      a.appendChild(document.createTextNode(n.title));
      var meta = document.createElement('small');
      if (n === notes[0] && n.id > seen) { var t = document.createElement('span'); t.className = 'hub-tag'; t.textContent = L('new', 'New'); meta.appendChild(t); }
      meta.appendChild(document.createTextNode(day(n.date)));
      a.appendChild(meta);
      a.addEventListener('click', onDone);
      box.appendChild(a);
    });
    var foot = document.createElement('div'); foot.className = 'hub-foot';
    var all = document.createElement('a'); all.href = 'https://hub.devdio.pro/c/macdio/release-notes/6'; all.target = '_blank'; all.rel = 'noopener'; all.textContent = L('all', 'All release notes') + (rtl ? ' ←' : ' →');
    all.addEventListener('click', onDone);
    foot.appendChild(all);
    if (withGotIt) { var ok = document.createElement('button'); ok.type = 'button'; ok.textContent = L('gotIt', 'Got it'); ok.addEventListener('click', onDone); foot.appendChild(ok); }
    box.appendChild(foot);
    return box;
  }

  function show(notes) {
    style();
    var newest = notes[0].id;
    var dot = null, pop = null, wrap = null;

    function done() {
      var hadFocus = pop && pop.contains(document.activeElement);
      remember(newest);
      close(false);
      if (dot) { dot.remove(); dot = null; }
      // The pill is gone, so focus goes to the headline rather than the page top.
      if (hadFocus) { var h1 = hero.querySelector('h1'); h1.setAttribute('tabindex', '-1'); h1.focus(); }
      card.querySelectorAll('.hub-tag').forEach(function (t) { t.remove(); });
    }
    function close(refocus) {
      if (!pop) return;
      pop.remove(); pop = null;
      if (dot) { dot.setAttribute('aria-expanded', 'false'); if (refocus) dot.focus(); }
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDoc);
    }
    function onKey(e) { if (e.key === 'Escape') close(true); }
    function onDoc(e) { if (pop && !pop.contains(e.target) && e.target !== dot) close(false); }

    // Wide form: the card, shown only while it fits beside the headline.
    var card = list(notes, false, done);
    card.classList.add('hub-card');
    card.setAttribute('role', 'region');
    card.setAttribute('aria-label', L('dialog', "What's new in Macdio"));
    hero.appendChild(card);
    function fit() {
      var h = hero.getBoundingClientRect(), lo = Infinity, hi = -Infinity;
      Array.prototype.forEach.call(hero.querySelectorAll('.hero-content > *'), function (el) {
        var r = el.getBoundingClientRect(); lo = Math.min(lo, r.left); hi = Math.max(hi, r.right);
      });
      var gap = rtl ? lo - h.left : h.right - hi;
      var w = Math.min(CARD_MAX, gap - 2 * GUTTER);
      var on = w >= CARD_MIN;
      hero.classList.toggle('hub-card-mode', on);
      if (on) { card.style.width = w + 'px'; close(false); }
    }
    fit();
    window.addEventListener('resize', fit);

    // Narrow form: the pill next to the "3", only for an unseen note.
    if (!(newest > seen)) return;
    wrap = document.createElement('span');
    wrap.className = 'hub-wrap';
    mark.parentNode.insertBefore(wrap, mark);
    wrap.appendChild(mark);
    dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hub-dot';
    dot.textContent = L('new', 'New');
    dot.setAttribute('aria-label', L('label', "What's new: {title}").split('{title}').join(notes[0].title));
    dot.setAttribute('aria-expanded', 'false');
    dot.setAttribute('aria-controls', 'hub-pop');
    wrap.appendChild(dot);

    function open() {
      pop = list(notes, true, done);
      pop.classList.add('hub-pop');
      pop.id = 'hub-pop';
      pop.setAttribute('role', 'dialog');
      pop.setAttribute('aria-label', L('dialog', "What's new in Macdio"));
      wrap.appendChild(pop);
      dot.setAttribute('aria-expanded', 'true');
      var first = pop.querySelector('a'); if (first) first.focus();
      // Bound at once, not in a setTimeout: Chrome runs queued key input before
      // timers, so an Escape pressed right after opening was lost. The opening
      // click cannot reach onDoc because the pill stops its propagation.
      document.addEventListener('keydown', onKey);
      document.addEventListener('click', onDoc);
    }
    dot.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); if (pop) close(true); else open(); });
  }

  fetch('/api/hub', { cache: 'default' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (data) {
    var notes = data && data.releaseNotes;
    if (notes && notes.length) show(notes);
  }).catch(function () { /* no card and no pill is the quiet failure */ });
})();
