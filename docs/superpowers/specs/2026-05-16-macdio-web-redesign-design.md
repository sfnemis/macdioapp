# Macdio Web Redesign — Design Spec
Date: 2026-05-16

## Problem

The current macdio.app website is being criticized on Reddit and elsewhere as looking "AI-made." Specific issues:
- 12-card emoji feature grid — the most generic pattern in SaaS landing pages
- Predictable section order: Hero → Stats → Screenshots → Feature Grid → Compare → CTA
- Navigation is overcrowded (8 links + download in one row)
- Three.js runs in the background but has no relationship to page content
- No Discourse community integration despite hub.macdio.app launching
- All 9 HTML pages are self-contained with duplicated nav/footer

## Goals

1. Make the site feel like a human made it — personality, rhythm, asym­metry
2. Keep Three.js, upgrade its content-reactivity
3. Integrate hub.macdio.app Community (menu + homepage section + Discourse theme)
4. Shared component architecture: one nav/footer change updates all pages
5. Full mobile responsiveness on all devices
6. Google SEO: structured data, sitemap, robots.txt, canonical tags

## Out of Scope

- No build tools / static site generator — must deploy to GitHub Pages as-is
- No Discourse API live feed (maintenance overhead not worth it for solo developer)
- No framework (React, Vue, Astro) — vanilla HTML/CSS/JS

---

## Architecture

### File Structure

```
macdio-web-v2/
├── assets/
│   ├── css/
│   │   └── main.css          ← all shared styles
│   ├── js/
│   │   ├── nav.js            ← injects nav HTML into every page
│   │   ├── footer.js         ← injects footer HTML into every page
│   │   └── three-bg.js       ← Three.js background, scroll-reactive
│   ├── discourse/            ← existing logos (unchanged)
│   └── screenshots/          ← existing (unchanged)
├── index.html                ← full redesign
├── community.html            ← NEW — Discourse bridge page
├── support.html              ← redesign (new nav/footer + content layout)
├── stations.html             ← redesign
├── submit-station.html       ← redesign
├── privacy.html              ← new nav/footer + clean typography
├── privacy-ios.html          ← same
├── privacy-macos.html        ← same
├── privacy-tvos.html         ← same
├── privacy-watchos.html      ← same
├── transparency.html         ← new nav/footer + clean typography
├── accessibility.html        ← new nav/footer + clean typography
├── sitemap.xml               ← updated (add community.html)
└── robots.txt                ← unchanged
```

### Shared Components (Vanilla JS injection)

`nav.js` and `footer.js` inject HTML into `<div id="nav-root">` and `<div id="footer-root">` on every page. No framework needed — `DOMContentLoaded` + `innerHTML`. This means editing nav once updates all 9 pages.

---

## Design System

### Color Tokens (unchanged from current)

```css
--bg: #050507
--surface: rgba(14, 14, 18, 0.8)
--surface-solid: #0e0e12
--surface-2: #16161c
--border: rgba(255,255,255,0.06)
--border-hover: rgba(255,255,255,0.12)
--text: #e8e8ed
--text-secondary: #7a7a8c
--accent: #6366f1
--accent-2: #a855f7
--accent-3: #ec4899
--glow: rgba(99, 102, 241, 0.12)
--radius-card: 20px        ← increased from 14px for more premium feel
```

### Typography

- Font: Inter (unchanged)
- Hero h1: `clamp(2.8rem, 6.5vw, 5rem)` weight 900 (unchanged)
- Section titles: `clamp(1.8rem, 3.5vw, 3rem)` weight 800
- Body: 1rem / 1.7 line-height

### Hero Headline

- **Website hero:** `One App. Made to Listen.` — human, rhythmic, memorable
- **`<title>` tag & SEO metadata:** `Macdio — Internet Radio for iPhone, Mac, iPad, Apple TV & Apple Watch` — keyword-rich for Google
- **Reason:** App Store name (`Macdio - Live Internet Radio`) is correct for ASO; website hero is for humans

---

## Navigation — New Design

### Desktop Nav

```
[Macdio logo]   [Features]  [Screenshots]  [Community ●]   [▾ More]   [Download ↓]
```

- **Features**, **Screenshots** → smooth scroll anchors on index.html; on other pages → `index.html#features`
- **Community** → `hub.macdio.app` new tab; small live-pulse dot badge to signal activity
- **▾ More** → dropdown menu containing: Support / Privacy / Transparency / Accessibility / Submit Station / Stations
- **Download** → pill-shaped gradient button (indigo→purple), replaces SVG image button

### Mobile Nav

Hamburger → slide-in panel (keep current behavior, reorganize content):
- Top: Download button (prominent)
- Divider
- Primary: Features / Screenshots / Community
- Secondary group: Support / Privacy / Transparency / Accessibility / Submit Station / Stations

---

## Homepage — Section Redesign

### Section Order (new)

1. Hero
2. Screenshots (moved up — visual impact first)
3. Feature Narrative (replaces emoji grid)
4. Compare
5. Performance (condensed)
6. Community (new)
7. CTA
8. Footer

### Hero

Keep: floating app icon, gradient headline, Three.js rings in background.

Remove:
- Stats bar (4 numbers standalone section) — numbers move into Feature Narrative
- "Try with confidence — Apple offers a full refund within 14 days" — sounds defensive, generic

Change:
- Secondary button: "Explore Features ↓" → "See it in action ↓" (scrolls to screenshots)
- Sub-headline: keep content, improve tone to feel less like a bullet list

### Screenshots — Cinematic Platform Showcase

Replace: platform tabs + static grid

New: **Pinned scroll showcase**
- Left column: platform list sticks during scroll (CSS `position: sticky`)
- Right column: active platform screenshots fade/slide as user scrolls
- On platform switch: Three.js accent color shifts subtly via JS
  - Mac → indigo (#6366f1)
  - iPhone → pink (#ec4899)
  - Apple Watch → purple (#a855f7)
  - Apple TV → blue-indigo mix
- Mobile: horizontal swipe carousel (touch events, same as current lightbox)
- Lightbox stays for zoom

### Feature Narrative (replaces 12-card emoji grid)

5 hero features get full-width alternating layout (image left/right):

| Feature | Screenshot | Callout stat |
|---------|-----------|------|
| Synced Lyrics | `iPhone_web/Lyric.png` | — |
| Live Recording | `iPhone_web/Recordings.png` | — |
| Apple Watch (LTE) | `watchos_web/Discover.png` | Stream over LTE |
| All Apple Platforms | `macos_web/Discover.png` | 5 platforms |
| iCloud Sync | `iPhone_web/Sync-ICloud.png` | Zero data collected |

Below the narrative: compact "Also includes" chip row:
`Keyboard Shortcuts · CarPlay · Dynamic Island · Sleep Timer · Family Sharing · Mini Player · Liquid Glass · Custom Stations`

### Compare Table

Keep. Visual upgrade:
- Macdio column gets subtle gradient left-border highlight
- Row hover more visible
- Add "★ Best choice" badge above Macdio column header

### Performance Section (condensed)

Keep benchmark cards but reduce from 6 to 3 prominent:
- Idle CPU: 0%
- Memory: 60 MB
- Memory Leaks: 0

Remaining 3 + all 9 test results → collapsible "Show all benchmarks" toggle.
Memory comparison chart stays.

### Community Section (new, before CTA)

```
        Join the Macdio Community

[💬 Feature Requests]  [🐛 Bug Reports]  [📻 Station Tips]

  ── Recent discussions ──
  "Dark mode theme feedback"        · 3 replies
  "Best jazz stations list"         · 12 replies  
  "Widget not updating on iOS 19"   · 5 replies
  (hardcoded, updated manually)

        [Join the Community →]   hub.macdio.app
```

### CTA — Copy Rewrite

Current: "Ready to tune in? / Tune In, Lock Down — Seize Every Stream." → generic and awkward.

New tone (human, direct):
- Headline: "Radio, the way it should be."
- Sub: "Native. Private. No subscriptions. On every Apple device you own."
- Button: App Store download SVG (unchanged)

---

## Three.js Upgrade

Current behavior: 3 rings + ambient particles, mouse-reactive, scroll-reactive (camera z).

Additions:
- **Scroll color lerp:** As user scrolls through sections, ring colors lerp toward section accent color. Uses `IntersectionObserver` on section anchors.
- **Platform color sync:** When screenshot platform switches, JS updates a `window.threeAccentColor` value that the Three.js animate loop reads.
- **Performance:**
  - Mobile (`window.innerWidth < 768`): particle count halved, ring count reduced to 2
  - `prefers-reduced-motion`: animation paused, canvas hidden
  - Particle size reduced on low-DPR displays

---

## community.html — New Page

A bridge page at `macdio.app/community` (not an iframe):
- Same nav/footer as all other pages
- Hero: "Macdio Community" + description
- Three category cards: Feature Requests / Bug Reports / Station Tips
- Large CTA button → `hub.macdio.app`
- SEO: canonical `https://macdio.app/community`, `og:url` set correctly
- In sitemap with priority 0.7

---

## Discourse Theme — CSS Specs

File delivered as a CSS block to paste into Discourse Admin → Customize → Themes.

Key rules:
```css
/* Background */
html, body { background-color: #050507 !important; }

/* Header */
.d-header {
  background: rgba(5, 5, 7, 0.85) !important;
  backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 1px solid rgba(255,255,255,0.06) !important;
}

/* Font */
body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important; }

/* Links / accent */
a { color: #6366f1 !important; }
.btn-primary { background: linear-gradient(135deg, #6366f1, #a855f7) !important; }

/* Topic list */
.topic-list-item { border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
```

Logos already in `assets/discourse/` — `macdio-wide-logo.png`, `favicon.png`, `apple-touch-icon.png`.

---

## SEO Updates

### sitemap.xml additions

```xml
<url>
  <loc>https://macdio.app/community</loc>
  <lastmod>2026-05-16</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.7</priority>
</url>
```

### Structured Data additions (index.html)

Add `Organization` type alongside existing `SoftwareApplication`:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Macdio",
  "url": "https://macdio.app",
  "logo": "https://macdio.app/assets/app-icon.png",
  "sameAs": ["https://hub.macdio.app"]
}
```

### robots.txt

No changes needed. `community.html` is indexable. AI bot blocks stay.

---

## Subpage Treatment

| Page | Treatment |
|------|-----------|
| support.html | New nav/footer + redesigned content layout (card-based FAQ sections) |
| submit-station.html | New nav/footer + improved form layout |
| stations.html | New nav/footer + improved station grid/list |
| privacy*.html | New nav/footer + clean prose typography (legal content, no elaborate layout) |
| transparency.html | New nav/footer + clean prose typography |
| accessibility.html | New nav/footer + clean prose typography |

---

## Implementation Order

1. `assets/css/main.css` — full design system
2. `assets/js/nav.js` + `assets/js/footer.js` — shared components
3. `assets/js/three-bg.js` — extracted + upgraded Three.js
4. `index.html` — full rebuild using shared components
5. `community.html` — new page
6. `support.html`, `submit-station.html`, `stations.html` — redesign
7. `privacy*.html`, `transparency.html`, `accessibility.html` — nav/footer + typography
8. `sitemap.xml` — update
9. Discourse theme CSS — deliver as separate block

---

## Success Criteria

- No section looks like a generic SaaS template
- Three.js reacts to scroll and platform changes
- Community link visible in nav on every page
- hub.macdio.app visually consistent with macdio.app
- All pages share nav/footer via JS injection
- Lighthouse mobile score ≥ 90 (performance)
- `prefers-reduced-motion` supported
- sitemap.xml includes community.html
