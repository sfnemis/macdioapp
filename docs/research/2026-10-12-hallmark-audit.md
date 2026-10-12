# Hallmark audit of the live macdio.app (2026-10-12)

Target: https://macdio.app as deployed from `main` (the files now in `old-site/`: `index.html`,
`redesign.css`, `parts.js`, `guides/carplay-radio.html`). Read only; nothing edited. Scored against
the Hallmark anti-pattern list; the three open observations that name the skill were applied
(0001 fixed-element centring, 0003 capture audit, 0004 claims against code). No Hallmark stamp
and no `design.md` exist, so the stamp and system checks do not apply.

## Critical (ships as slop)

[critical] Aurora-blob background, `redesign.css:179-183`
  Three blurred circles in #6366f1, #a855f7 and #ec4899 drift behind the hero text for 20 to 28 s each. The named 2022 generated-design default, in its exact colours.
  Fix: solid tinted surface, or a two-stop gradient with grain under 0.1 opacity; no moving blobs.

[critical] Full-viewport centred hero, `redesign.css:163-166`
  `min-height: 100svh`, everything centred, one headline, one badge, one store button.
  Fix: hero at content height, left bias, the device list and the one-purchase fact in the H1 area (spec section 5).

[critical] Gradient-filled text, `redesign.css:43-47` (12 uses in `index.html`)
  `.eyebrow` paints its text with `background-clip: text` over the purple gradient.
  Fix: solid ink; emphasis by weight or accent colour.

[critical] The AI nav, `parts.js` (`nav-brand`, `nav-links`, `nav-appstore`) with `redesign.css:73`
  Wordmark left, inline links, store button right, fixed, frosted blur, hairline bottom. Genre blind.
  Fix: pick a nav archetype from the routing table in the redesign; the language switcher and theme toggle become part of its fingerprint.

[critical] Template structure, `index.html:145-563`
  Hero, then four alternating two-column feature rows (`feature` / `feature reverse`), a six-tile device grid, a gallery, a nine-tile "And so much more" bento, a comparison table, pricing, privacy, community, final CTA. Every section opens with a centred eyebrow plus a centred headline with inline `style` margins. No asymmetry, no surprise; the Apple product-page rhythm every generator reaches for.
  Fix: a different macrostructure per template (spec section 7), structural variety across home, platform, feature and compare pages.

[critical] Comparison row that the research contradicts, `index.html` section `#compare`, row "Loved songs sync to Apple Music" under "Only on Macdio"
  Broadcasts' own listing says "Use Shazam to look up the current song, and add it to your music library" (`docs/research/2026-10-12-competitors.md`, section 4). The row is false for one of the four columns.
  Fix: move the row out of "Only on Macdio" or re-word it to what is true (for example the saved-tracks list with Apple Music links); every comparison row must trace to the competitor register.

## Major (looks AI-generated)

[major] Centred everything, `redesign.css` (21 `text-align: center` rules), `index.html:173,353,388,436,484,525,541,554`
  Every section headline is centred with `margin-left:auto;margin-right:auto` inline.
  Fix: bias the layout once per template; keep centring for one hero at most.

[major] Eyebrow on every section, `index.html` (8 `eyebrow reveal`, 4 `eyebrow`)
  Uppercase, letter-spaced, gradient-filled kickers above every heading; decorative, not ordinal.
  Fix: zero eyebrows unless a section is genuinely numbered; never tag-left heading-right.

[major] Animate-on-scroll on everything, `redesign.css:60-66`, 71 `.reveal` elements on the home page, 21 on one guide
  Every block starts at `opacity: 0; translateY(26px)` and fades in over 0.8 s. The September audit measured about 900 ms of LCP from this on mobile and patched it with `.first-view`.
  Fix: one orchestrated entrance at most, nothing above the fold animated, `prefers-reduced-motion` respected.

[major] Shadow-glow on dark, `redesign.css:207,276,329,340`
  Purple halos (`rgba(168,85,247,.6)` and similar) under the hero device, cards and buttons.
  Fix: elevation by surface lightness on dark; tight dark shadows if any.

[major] Glassmorphism without purpose, `redesign.css:73,120,203,219,744`
  Frosted blur on the nav, the mobile menu, the hero badge, a card and the lightbox.
  Fix: keep blur only where content scrolls beneath (nav at most); solid surfaces elsewhere.

[major] Icon-tile grids, `index.html` `#more` (nine equal tiles), `#devices` (six equal tiles), `redesign.css:349-350,370`
  Equal columns, heading plus two lines each.
  Fix: fewer items, uneven spans or a typographic list; one containment layer.

[major] Mid-render token improvisation, `redesign.css:181-183,194,207,276,329,340` and 13 inline `style=""` attributes in `index.html`
  Raw hex and `rgba()` values beside the token block; headline widths and margins set inline per section.
  Fix: every colour and spacing through `var(--token)`; no inline styles.

[major] One-font page, `redesign.css:24` (single system stack for display and body)
  Display and body share the SF stack; hierarchy rests on weight and tight tracking alone. The spec keeps system fonts for speed, so the fix is hierarchy by size, measure and weight contrast inside that stack, not a web font; if a display face is wanted, Sait decides.
  Fix: a deliberate type scale with distinct display sizes and measures per template; document the choice in `tokens.css`.

## Minor (small taste issues)

[minor] Undated counts, `index.html` ("60,000 stations", "60,000+ stations", "4.7 million" six times, "160 countries")
  Real numbers with no date and no source.
  Fix: `src/data/counts.json` values with "as of <date>" (spec section 8).

[minor] Pill everything, `redesign.css` (8 `border-radius: 999px`, 6 `50%`)
  Badges, buttons and eq bars all pills.
  Fix: one radius token per component class.

[minor] `z-index: 1000` on the lightbox, `redesign.css:744`
  Fix: a named z-index scale.

[minor] Check-mark glyphs as table icons, `index.html` `#compare` (47 `✓` glyphs, `aria-hidden`)
  Acceptable in a comparison table; keep them typographic and give each cell a text alternative.

[minor] Pure white text on gradient buttons, `redesign.css:340` (`color: #fff` on `var(--grad)`)
  Fix: ink token on a solid accent.

Not measured here: button label wrapping at 320 px and `nowrap` overflow (observation 0001) need a browser pass; the new build gets both as scripted checks in F2.

Summary: 6 critical, 8 major, 5 minor.
Verdict: ships as slop in the hero and the section rhythm; the comparison table, the footer (single inline line) and the honest "What none of these apps can do" style sections are worth carrying into the redesign.
