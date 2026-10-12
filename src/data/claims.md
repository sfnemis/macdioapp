# Claims register

Every concrete capability, platform, format, limit, number and price the site
states appears here with the file or screen in the app repo
(`~/Developments/Dev/shortwave`) that implements it and the date it was read.
A sentence with no entry here does not ship. "Not implemented" entries exist so
nobody adds the claim later by accident.

Status values: verified (read in code on the date), not implemented, open (to
read before the page that needs it is written).

| Claim | Where it is implemented | Status | Date |
| -- | -- | -- | -- |
| Platforms: iPhone, iPad, Mac (native), Apple TV, Apple Watch, CarPlay | targets Macdio, MacdioiOS, MacdioTV, MacdioWatch; `MacdioiOS/App/CarPlaySceneDelegate.swift` | verified | 2026-10-12 |
| One Universal Purchase covers every platform, no subscription | bundle id com.macdio.app on all targets (CLAUDE.md), price per territory in `public/pricing.json` | verified | 2026-10-12 |
| Song identification from the stream without the microphone | `Macdio/Services/Audio/ShazamService.swift` (ShazamKit on decoded stream audio) | verified | 2026-10-12 |
| Split-track live radio recording on iPhone, iPad and Mac (not Apple TV or Watch) | `Macdio/Services/Recording/RecordingService.swift` line 1 `#if os(iOS) \|\| os(macOS)`, `StreamRecorder.swift` | verified | 2026-10-12 |
| Synced lyrics on live radio | `Macdio/Services/Lyrics/LyricsService.swift` (LRCLIB) | verified | 2026-10-12 |
| On-device podcast transcripts, in the episode's language where the device supports it | `Macdio/Services/Podcast/TranscriptionService.swift` (SpeechTranscriber.supportedLocales, episode language first) | verified | 2026-10-12 |
| Highlights to Apple Notes, Notion, Obsidian, Bear, Craft, Readwise | `Macdio/Services/Podcast/HighlightDelivery.swift` enum cases notion, readwise, bear, obsidian, craft, appleNotes | verified | 2026-10-12 |
| Highlights by Siri | open | open | |
| Chapters, episode summary, transcript search | showcase clips exist (iphone-chapters, iphone-summary, iphone-transcript-search); read the code before stating details | open | |
| Up Next holds a live station next to an episode | `ShowcaseRuntime.swift` comment on #227 | verified | 2026-10-12 |
| Apple Watch plays on its own (feeds on the watch's own Wi-Fi or cellular network, phone not needed) | `MacdioiOS/MacdioWatch Watch App/Services/WatchPodcastFeed.swift` | verified | 2026-10-12 |
| Apple TV Top Shelf | `com.macdio.app.MacdioTopShelf` extension (CLAUDE.md) | verified | 2026-10-12 |
| Clock Mode bedside radio (iOS only) | memory project_clock_mode (builds 133 to 141); alarm: open | open | |
| Menu bar player (Mac only) | showcase clip mac-menubar recorded from the Mac build (AXPress on the menu bar extra, 2026-10-12) | verified | 2026-10-12 |
| Importing favourites from TuneIn, myTuner or Broadcasts | open; likely not implemented | open | |
| OPML import and export of podcast subscriptions | `Macdio/Services/Podcast/OPML.swift` ("OPML in and out", #224 #225) | verified | 2026-10-12 |
| Station count | `src/data/counts.json` stations, dated | verified by script | run date |
| Podcast count | `src/data/counts.json` podcasts, dated | verified by script | run date |
| Own station directory dir.macdio.app used when Radio Browser does not answer | tracker #561, memory reference_dir_macdio_app | verified | 2026-10-12 |
| No account, no ads, no analytics SDK in the app | grep for Firebase, Mixpanel, Amplitude, Sentry, TelemetryDeck, GoogleAnalytics across Swift sources and pbxproj: none | verified | 2026-10-12 |
| Station editor over Wi-Fi: the iPhone, iPad or Apple TV serves a PIN-protected editor page for the user's own stations | `Macdio/Services/StationEditorServer.swift`, `MacdioiOS/Views/Settings/iOSStationEditorView.swift`, `MacdioTV/Views/TVStationEditorView.swift`; no Mac view | verified | 2026-10-12 |
| Android or web version | not implemented | not implemented | 2026-10-12 |
