/* Macdio redesign — minimal interactions (LOCAL DRAFT)
   Nav + footer injection and binding live in parts.js. */
(function () {
  // scroll reveal — IntersectionObserver plus a scroll sweep fallback so nothing
  // ever stays stuck hidden (fast scroll, anchor jumps, long text pages)
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function sweep() {
    var vh = window.innerHeight || document.documentElement.clientHeight || 800;
    for (var i = 0; i < reveals.length; i++) {
      var el = reveals[i];
      if (!el.classList.contains('in') && el.getBoundingClientRect().top < vh * 0.92) {
        el.classList.add('in');
      }
    }
  }
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { obs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
  sweep();
  window.addEventListener('scroll', sweep, { passive: true });
  window.addEventListener('load', sweep);
  window.addEventListener('resize', sweep);

  // platform preview tabs
  var tabs = document.querySelectorAll('.tab');
  var galleries = document.querySelectorAll('.gallery');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-target');
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t === tab ? 'true' : 'false'); });
      galleries.forEach(function (g) {
        g.classList.toggle('active', g.id === 'gallery-' + target);
      });
    });
  });

  // hero live-signal equalizer bars
  var eq = document.querySelector('.hero-eq');
  if (eq) {
    var BARS = 64;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < BARS; i++) {
      var bar = document.createElement('span');
      bar.className = 'bar';
      // vary speed and phase so it reads like a live audio signal, not a sweep
      var dur = (0.9 + Math.random() * 1.4).toFixed(2);
      var delay = (-Math.random() * 2).toFixed(2);
      bar.style.animationDuration = dur + 's';
      bar.style.animationDelay = delay + 's';
      bar.style.height = (12 + Math.random() * 60).toFixed(0) + '%';
      frag.appendChild(bar);
    }
    eq.appendChild(frag);
  }

  // recording auto-heal demo
  var recList = document.getElementById('recList');
  if (recList) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var tracks = [
      { art: 'linear-gradient(135deg,#f59e0b,#ef4444)', t: 'Get Lucky',       s: 'Daft Punk',     dur: '3:48' },
      { art: 'linear-gradient(135deg,#6366f1,#a855f7)', t: 'Dreams',          s: 'Fleetwood Mac', dur: '4:14' },
      { art: 'linear-gradient(135deg,#10b981,#3b82f6)', t: 'Counting Stars',  s: 'OneRepublic',   dur: '4:17' },
      { art: 'linear-gradient(135deg,#ec4899,#8b5cf6)', t: 'The Less I Know', s: 'Tame Impala',   dur: '3:39' }
    ];
    var wave = '<svg class="wave" viewBox="0 0 24 24" fill="none" stroke="#8a8a99" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h2l2-6 3 12 3-9 2 6h6"/></svg>';

    function buildUnknown() {
      recList.innerHTML = '';
      tracks.forEach(function (tr) {
        var row = document.createElement('div');
        row.className = 'rec-row unknown';
        row.innerHTML = '<div class="rec-art">' + wave + '</div>' +
          '<div class="rec-info"><div class="t">Unknown Track</div><div class="s">' + tr.dur + '</div></div>' +
          '<div class="rec-state">Identifying…</div>';
        recList.appendChild(row);
      });
    }
    function resolve(row, tr) {
      row.classList.remove('unknown');
      row.classList.add('done', 'resolved');
      var art = row.querySelector('.rec-art');
      art.innerHTML = ''; art.style.background = tr.art;
      row.querySelector('.t').textContent = tr.t;
      row.querySelector('.s').textContent = tr.s;
      row.querySelector('.rec-state').textContent = '✓';
      setTimeout(function () { row.classList.remove('resolved'); }, 900);
    }
    function buildResolved() {
      recList.innerHTML = '';
      tracks.forEach(function (tr) {
        var row = document.createElement('div');
        row.className = 'rec-row done';
        row.innerHTML = '<div class="rec-art" style="background:' + tr.art + '"></div>' +
          '<div class="rec-info"><div class="t">' + tr.t + '</div><div class="s">' + tr.s + '</div></div>' +
          '<div class="rec-state">✓</div>';
        recList.appendChild(row);
      });
    }

    if (reduce) {
      buildResolved();
    } else {
      var step = function (i) {
        var rows = recList.children;
        if (i >= rows.length) {
          setTimeout(function () { buildUnknown(); setTimeout(function () { step(0); }, 1300); }, 2800);
          return;
        }
        resolve(rows[i], tracks[i]);
        setTimeout(function () { step(i + 1); }, 1500);
      };
      buildUnknown();
      setTimeout(function () { step(0); }, 1500);

      // ticking REC timer
      var elapsed = document.getElementById('recElapsed');
      if (elapsed) {
        var secs = 14 * 60 + 32;
        setInterval(function () {
          secs++; var m = Math.floor(secs / 60), s = secs % 60;
          elapsed.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
        }, 1000);
      }
    }
  }

  // synced lyrics demo (original placeholder lines, no copyright)
  var lyrTrack = document.getElementById('lyrTrack');
  if (lyrTrack) {
    var lines = [
      'City lights on the avenue',
      'Every heartbeat keeping time with you',
      'We were dancing like the night was new',
      'Hold the moment, let it stay',
      'All the words we never got to say',
      'Echo softly, fade away',
      'Turn it up, let the silence break',
      'Every signal that the airwaves make',
      'Sing it back for the morning to take'
    ];
    lines.forEach(function (t) {
      var d = document.createElement('div'); d.className = 'lyr-line'; d.textContent = t;
      lyrTrack.appendChild(d);
    });
    var lyrEls = lyrTrack.children;
    var prog = document.querySelector('.lyr-progress span');
    function setActive(idx) {
      for (var k = 0; k < lyrEls.length; k++) {
        lyrEls[k].classList.toggle('active', k === idx);
        lyrEls[k].classList.toggle('past', k < idx);
      }
      var a = lyrEls[idx];
      var offset = a.offsetTop + a.offsetHeight / 2 - 115; // half of .lyr-view height
      lyrTrack.style.transform = 'translateY(' + (-offset) + 'px)';
      if (prog) prog.style.width = Math.round((idx + 1) / lyrEls.length * 100) + '%';
    }
    setActive(0);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var li = 0;
      setInterval(function () { li = (li + 1) % lyrEls.length; setActive(li); }, 2200);
    }
  }

  // region-based pricing: detect visitor country, show their local App Store price
  (function () {
    var flagEl = document.getElementById('priceFlag');
    var amtEl = document.getElementById('priceAmount');
    if (!flagEl || !amtEl) return;
    function flag(cc) {
      return String(cc || 'US').toUpperCase().replace(/[A-Z]/g, function (c) {
        return String.fromCodePoint(127397 + c.charCodeAt(0));
      });
    }
    // timezone -> country: best proxy for the computer's actual region
    var TZ = {
      'Europe/Istanbul': 'TR', 'Europe/London': 'GB', 'Europe/Dublin': 'IE', 'Europe/Berlin': 'DE',
      'Europe/Paris': 'FR', 'Europe/Madrid': 'ES', 'Europe/Rome': 'IT', 'Europe/Amsterdam': 'NL',
      'Europe/Brussels': 'BE', 'Europe/Vienna': 'AT', 'Europe/Lisbon': 'PT', 'Europe/Athens': 'GR',
      'Europe/Warsaw': 'PL', 'Europe/Prague': 'CZ', 'Europe/Budapest': 'HU', 'Europe/Bucharest': 'RO',
      'Europe/Stockholm': 'SE', 'Europe/Oslo': 'NO', 'Europe/Copenhagen': 'DK', 'Europe/Helsinki': 'FI',
      'Europe/Zurich': 'CH', 'Europe/Moscow': 'RU', 'Europe/Kiev': 'UA', 'Europe/Kyiv': 'UA',
      'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US', 'America/Phoenix': 'US',
      'America/Los_Angeles': 'US', 'America/Anchorage': 'US', 'Pacific/Honolulu': 'US',
      'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'America/Edmonton': 'CA', 'America/Mexico_City': 'MX',
      'America/Sao_Paulo': 'BR', 'America/Argentina/Buenos_Aires': 'AR', 'America/Bogota': 'CO',
      'America/Lima': 'PE', 'America/Santiago': 'CL',
      'Asia/Tokyo': 'JP', 'Asia/Shanghai': 'CN', 'Asia/Hong_Kong': 'HK', 'Asia/Singapore': 'SG',
      'Asia/Seoul': 'KR', 'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN', 'Asia/Dubai': 'AE',
      'Asia/Riyadh': 'SA', 'Asia/Qatar': 'QA', 'Asia/Jakarta': 'ID', 'Asia/Bangkok': 'TH',
      'Asia/Manila': 'PH', 'Asia/Kuala_Lumpur': 'MY', 'Asia/Taipei': 'TW', 'Asia/Ho_Chi_Minh': 'VN',
      'Asia/Karachi': 'PK', 'Asia/Tehran': 'IR', 'Asia/Jerusalem': 'IL', 'Asia/Tel_Aviv': 'IL',
      'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU', 'Australia/Brisbane': 'AU', 'Australia/Perth': 'AU',
      'Pacific/Auckland': 'NZ', 'Africa/Johannesburg': 'ZA', 'Africa/Cairo': 'EG', 'Africa/Lagos': 'NG',
      'Africa/Nairobi': 'KE', 'Africa/Casablanca': 'MA'
    };
    function guessRegion() {
      try {
        var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz && TZ[tz]) return TZ[tz];
      } catch (e) {}
      try { var r = new Intl.Locale(navigator.language || 'en').region; if (r) return r; } catch (e) {}
      return 'US';
    }
    function money(e) {
      try {
        return new Intl.NumberFormat(navigator.language || 'en', {
          style: 'currency', currency: e.c, currencyDisplay: 'narrowSymbol',
          minimumFractionDigits: Number.isInteger(e.p) ? 0 : 2
        }).format(e.p);
      } catch (err) { return e.c + ' ' + e.p; }
    }
    function apply(cc, data) {
      var e = data.prices[cc] || data.default;
      flagEl.textContent = flag(cc);
      amtEl.textContent = money(e);
    }
    fetch('pricing.json', { cache: 'force-cache' }).then(function (r) { return r.json(); }).then(function (data) {
      var done = false;
      function finish(cc) { if (done) return; done = true; apply(cc, data); }
      var t = setTimeout(function () { finish(guessRegion()); }, 2500);
      fetch('https://ipwho.is/?fields=country_code', { cache: 'no-store' })
        .then(function (r) { return r.json(); })
        .then(function (geo) { clearTimeout(t); finish((geo && geo.country_code) || guessRegion()); })
        .catch(function () { clearTimeout(t); finish(guessRegion()); });
    }).catch(function () { /* keep the static default price */ });
  })();

  // pause feature videos when reduced motion is preferred
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    document.querySelectorAll('video').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });
  }

  // lazy-load the feature videos: autoplay ignores preload="none", so the real
  // source stays in data-src until the video is close to the viewport
  (function () {
    var lazyVideos = Array.prototype.slice.call(document.querySelectorAll('video[data-lazy-video]'));
    if (!lazyVideos.length) return;

    function load(v) {
      if (v.dataset.lazyLoaded) return;
      v.dataset.lazyLoaded = '1';
      var sources = v.querySelectorAll('source[data-src]');
      for (var i = 0; i < sources.length; i++) {
        sources[i].src = sources[i].getAttribute('data-src');
        sources[i].removeAttribute('data-src');
      }
      v.load();
      if (!reducedMotion) {
        var playing = v.play();
        if (playing && playing.catch) { playing.catch(function () {}); }
      }
    }

    if ('IntersectionObserver' in window) {
      var vobs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { load(e.target); vobs.unobserve(e.target); }
        });
      }, { rootMargin: '300px 0px' });
      lazyVideos.forEach(function (v) { vobs.observe(v); });
    } else {
      lazyVideos.forEach(load);
    }
  })();
})();
