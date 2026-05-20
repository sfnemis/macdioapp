/* Macdio — Three.js Background (scroll-reactive, platform-aware) */
(function () {
  if (typeof window === 'undefined') return;

  var SECTION_COLORS = {
    hero:        [0.39, 0.40, 0.95],
    screenshots: [0.93, 0.28, 0.60],
    features:    [0.66, 0.33, 0.97],
    compare:     [0.39, 0.40, 0.95],
    performance: [0.22, 0.60, 0.90],
    community:   [0.66, 0.33, 0.97]
  };

  var PLATFORM_COLORS = {
    macos:   [0.39, 0.40, 0.95],
    iphone:  [0.93, 0.28, 0.60],
    ipad:    [0.66, 0.33, 0.97],
    tvos:    [0.22, 0.60, 0.90],
    watchos: [0.66, 0.33, 0.97]
  };

  var targetColor   = SECTION_COLORS.hero.slice();
  var currentColor  = SECTION_COLORS.hero.slice();

  function lerp(a, b, t) { return a + (b - a) * t; }

  window.threeSetPlatformColor = function (platform) {
    var c = PLATFORM_COLORS[platform];
    if (c) targetColor = c.slice();
  };

  function initThreeBackground() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('no-webgl');
      return;
    }

    var canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    var isMobile = window.innerWidth < 768;

    try {
      var renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: !isMobile,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false
      });
      
      // Determine if OS is Windows to limit high-DPI scaling overhead
      var isWindows = false;
      if (typeof navigator !== 'undefined' && navigator.userAgent) {
        isWindows = /Windows|Win32|Win64/i.test(navigator.userAgent);
      }
      var maxPixelRatio = isMobile ? 1 : (isWindows ? 1.5 : 2);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));

      var scene  = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 30;

      var ringCount = isMobile ? 2 : 3;
      var rings = [];

      for (var r = 0; r < ringCount; r++) {
        var count     = isMobile ? 120 : 200;
        var positions = new Float32Array(count * 3);
        var radius    = 10 + r * 6;

        for (var i = 0; i < count; i++) {
          var angle = (i / count) * Math.PI * 2;
          positions[i * 3]     = Math.cos(angle) * radius;
          positions[i * 3 + 1] = Math.sin(angle) * radius;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }

        var geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        var mat = new THREE.PointsMaterial({
          size: 0.08 + r * 0.02,
          color: new THREE.Color(currentColor[0], currentColor[1], currentColor[2]),
          transparent: true,
          opacity: 0.4 - r * 0.08,
          blending: THREE.AdditiveBlending
        });

        var points = new THREE.Points(geo, mat);
        rings.push({ points: points, positions: positions, radius: radius, count: count, mat: mat });
        scene.add(points);
      }

      /* Ambient particles */
      var ambCount  = isMobile ? 200 : 400;
      var ambPos    = new Float32Array(ambCount * 3);
      var ambColors = new Float32Array(ambCount * 3);

      for (var j = 0; j < ambCount * 3; j += 3) {
        ambPos[j]     = (Math.random() - 0.5) * 100;
        ambPos[j + 1] = (Math.random() - 0.5) * 100;
        ambPos[j + 2] = (Math.random() - 0.5) * 60;
        var c = Math.random();
        if (c < 0.4)       { ambColors[j] = 0.39; ambColors[j+1] = 0.40; ambColors[j+2] = 0.95; }
        else if (c < 0.7)  { ambColors[j] = 0.66; ambColors[j+1] = 0.33; ambColors[j+2] = 0.97; }
        else               { ambColors[j] = 0.93; ambColors[j+1] = 0.28; ambColors[j+2] = 0.60; }
      }

      var ambGeo = new THREE.BufferGeometry();
      ambGeo.setAttribute('position', new THREE.BufferAttribute(ambPos, 3));
      ambGeo.setAttribute('color',    new THREE.BufferAttribute(ambColors, 3));
      var ambMat = new THREE.PointsMaterial({
        size: 0.08, vertexColors: true, transparent: true,
        opacity: 0.35, blending: THREE.AdditiveBlending
      });
      var ambParticles = new THREE.Points(ambGeo, ambMat);
      scene.add(ambParticles);

      /* Mouse parallax */
      var mouseX = 0, mouseY = 0;
      document.addEventListener('mousemove', function (e) {
        mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      }, { passive: true });

      /* Section color observer */
      var sectionEls = document.querySelectorAll('[data-three-section]');
      if (sectionEls.length && window.IntersectionObserver) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              var key = e.target.dataset.threeSection;
              if (SECTION_COLORS[key]) targetColor = SECTION_COLORS[key].slice();
            }
          });
        }, { threshold: 0.3 });
        sectionEls.forEach(function (s) { obs.observe(s); });
      }

      /* Animate */
      function animate() {
        requestAnimationFrame(animate);
        var time = Date.now() * 0.001;

        /* Lerp color */
        for (var k = 0; k < 3; k++) {
          currentColor[k] = lerp(currentColor[k], targetColor[k], 0.02);
        }

        rings.forEach(function (ring, idx) {
          ring.mat.color.setRGB(currentColor[0], currentColor[1], currentColor[2]);
          var pos = ring.points.geometry.attributes.position.array;
          for (var n = 0; n < ring.count; n++) {
            var ang  = (n / ring.count) * Math.PI * 2;
            var wave = Math.sin(time * (1.5 + idx * 0.5) + ang * 4) * (1.5 + idx * 0.5);
            var rad  = ring.radius + wave;
            pos[n * 3]     = Math.cos(ang + time * 0.1 * (idx + 1)) * rad;
            pos[n * 3 + 1] = Math.sin(ang + time * 0.1 * (idx + 1)) * rad;
            pos[n * 3 + 2] = Math.sin(time * 2 + ang * 3) * (0.5 + idx * 0.3);
          }
          ring.points.geometry.attributes.position.needsUpdate = true;
          ring.points.rotation.z = time * 0.02 * (idx % 2 === 0 ? 1 : -1);
        });

        ambParticles.rotation.y += 0.0003;
        ambParticles.rotation.x += 0.0001;

        camera.position.x += (mouseX * 2 - camera.position.x) * 0.015;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.015;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('scroll', function () {
        var pct = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
        camera.position.z = 30 + pct * 15;
        rings.forEach(function (ring, idx) {
          ring.points.rotation.x = pct * Math.PI * 0.15 * (idx + 1);
        });
      }, { passive: true });

      window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    } catch (err) {
      console.warn("Three.js background initialization failed. Falling back to CSS glow mesh:", err);
      document.body.classList.add('no-webgl');
    }
  }

  // Execute immediately since we load this script dynamically after load event is fired
  initThreeBackground();
})();
