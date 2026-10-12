// The guide hub: groups and their guides, in reading order. One source for
// the Starlight sidebar (astro.config.mjs) and the hub index (/guides/).
// Slugs are the file names under src/content/docs/guides/ and the live URLs
// /guides/<slug>.html. The outline follows docs/research/2026-10-12-keywords-and-serps.md
// section 4; groups with no written guide yet are left out until one exists.
export const GROUPS = [
  {
    label: 'Radio on every device',
    guides: [
      { slug: 'how-to-listen-to-radio-on-mac', label: 'Radio on a Mac', title: 'How to listen to internet radio on a Mac', description: 'Browser, VLC, the Music app or a menu bar player: every route, with honest trade-offs. Read this one first if you are new to radio on the desktop.' },
      { slug: 'radio-on-apple-watch', label: 'Apple Watch without an iPhone', title: 'Radio on Apple Watch without an iPhone', description: 'Streaming on the wrist with no iPhone nearby: what standalone really means, what you need, and honest battery numbers.' },
      { slug: 'carplay-radio', label: 'Radio in CarPlay', title: 'Internet radio on CarPlay', description: 'Presets like a classic car stereo, worldwide stations instead of local FM, and what a long drive costs in mobile data.' },
      { slug: 'siri-radio', label: 'Play radio with Siri', title: 'Play radio with Siri', description: 'Every voice phrase Macdio understands, in 14 languages, and how a station name spoken in the car turns into the right stream.' },
    ],
  },
  {
    label: 'Radio features',
    guides: [
      { slug: 'record-internet-radio', label: 'Record internet radio', title: 'How to record internet radio', description: 'Turn a live show into named, individual tracks on Mac and iPhone, and where the law of personal recording actually stands.' },
      { slug: 'identify-song-on-radio', label: 'What song is playing?', title: 'What song is playing on the radio?', description: 'Three ways to identify a radio song, including one that reads the stream itself and never asks for the microphone.' },
      { slug: 'find-radio-stream-url', label: 'Find a stream URL', title: 'How to find a station\'s stream URL', description: 'Four ways to get the direct address, what you may do with it, and how to add a station of your own.' },
      { slug: 'iphone-fm-radio', label: 'Does the iPhone have FM radio?', title: 'Does the iPhone have FM radio?', description: 'The honest answer about the missing chip, receiver against transmitter, the emergency argument, and what to do instead.' },
    ],
  },
  {
    label: 'Buying and comparing',
    guides: [
      { slug: 'best-internet-radio-apps', label: 'Best internet radio apps', title: 'Best internet radio apps compared', description: 'Seven players for Mac, iPhone, Apple Watch and Apple TV, with prices, station counts and what each one leaves out.' },
    ],
  },
];

export const ALL_GUIDES = GROUPS.flatMap((g) => g.guides);

// Starlight sidebar entries; links end in .html because the site serves files
// (build.format "file") and the Worker does no extension rewriting.
export function sidebar() {
  return [
    { label: 'Guides', items: [{ label: 'All guides', link: '/guides/index.html' }] },
    ...GROUPS.map((g) => ({ label: g.label, items: g.guides.map((x) => ({ label: x.label, link: `/guides/${x.slug}.html` })) })),
  ];
}
