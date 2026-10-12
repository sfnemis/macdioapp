# Viewport and theme check, every template

Run on `npm run preview` (http://localhost:4321/) with the Playwright browser tools.
The measurement is the proof; a screenshot alone is not (a nowrap element that
overflows under its sibling looks fine at thumbnail size).

Matrix: widths 320, 375, 414, 768, 1280; themes light and dark (set
`localStorage.starlight-theme` to `light` or `dark`, reload); locales en, ar, ja
once they are live.

At each cell run this in the page and expect `rightEdge <= innerWidth`, `wrapped: []`
and `nowrapOverflow: []`. (`scrollWidth` cannot see overflow here: `html, body` carry
`overflow-x: clip`, so the right edge of the widest element is the measure.)

```js
({ innerWidth,
   rightEdge: Math.max(...[...document.querySelectorAll('body *')].filter(e => !e.closest('.visually-hidden') && !e.classList.contains('visually-hidden')).map(e => Math.round(e.getBoundingClientRect().right))),
   wrapped: [...document.querySelectorAll('.btn, .nav__link, .foot__links a, .link')].filter(e => e.getClientRects().length > 1).map(e => e.textContent.trim()),
   nowrapOverflow: [...document.querySelectorAll('*')].filter(e => !e.classList.contains('visually-hidden') && getComputedStyle(e).whiteSpace === 'nowrap' && e.scrollWidth > Math.ceil(e.getBoundingClientRect().width) + 1).map(e => e.className) })
```

Then, once per template:

- reduced motion (`page.emulateMedia({ reducedMotion: 'reduce' })`, reload): no `<source>` inside any `figure.clip video`, nothing playing;
- Lighthouse mobile and desktop (chrome-devtools `lighthouse_audit`): accessibility, best practices and SEO 100; a performance trace with LCP under 2.5 s and CLS 0;
- the Hallmark slop test gates 34, 44, 49, 50, 51 by reading the rendered page at 1280x800 (hero content above the fold) and 320.

Fix order when something wraps or overflows: shorten the label, then
`white-space: nowrap` on the affordance, then collapse the row.
