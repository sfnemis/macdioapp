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
| Highlights by Siri ("Mark This Moment" App Intent) and from the watch | `MacdioiOS/App/MacdioShortcuts.swift` (ten App Intents), `Macdio/Services/Podcast/HighlightStore.swift` | verified | 2026-10-12 |
| Publisher chapters, generated chapters and episode summary (Apple language model: Private Cloud Compute on OS 27, on-device model elsewhere), transcript search | `Macdio/Services/Podcast/PodcastFeedParser.swift:118`, `ChapterGenerator.swift:257`, `TranscriptionService.swift:318` (inventory section 1) | verified | 2026-10-12 |
| Up Next holds a live station next to an episode | `ShowcaseRuntime.swift` comment on #227 | verified | 2026-10-12 |
| Apple Watch plays on its own (feeds on the watch's own Wi-Fi or cellular network, phone not needed) | `MacdioiOS/MacdioWatch Watch App/Services/WatchPodcastFeed.swift` | verified | 2026-10-12 |
| Apple TV Top Shelf | `com.macdio.app.MacdioTopShelf` extension (CLAUDE.md) | verified | 2026-10-12 |
| Clock Mode bedside radio and Alarm (wake to a station or the newest episode; iPhone and iPad only) | `MacdioiOS/Views/Player/FullPlayerView.swift:1833,2106` | verified | 2026-10-12 |
| Menu bar player (Mac only) | showcase clip mac-menubar recorded from the Mac build (AXPress on the menu bar extra, 2026-10-12) | verified | 2026-10-12 |
| Importing favourites from TuneIn, myTuner or radio.net | not implemented (inventory not-found 5); the only imports are OPML for podcasts and Macdio's own JSON on the Mac | not implemented | 2026-10-12 |
| OPML import and export of podcast subscriptions | `Macdio/Services/Podcast/OPML.swift` ("OPML in and out", #224 #225) | verified | 2026-10-12 |
| Station count | `src/data/counts.json` stations, dated | verified by script | run date |
| Podcast count | `src/data/counts.json` podcasts, dated | verified by script | run date |
| Own station directory dir.macdio.app used when Radio Browser does not answer | tracker #561, memory reference_dir_macdio_app | verified | 2026-10-12 |
| No account, no ads, no analytics SDK in the app | grep for Firebase, Mixpanel, Amplitude, Sentry, TelemetryDeck, GoogleAnalytics across Swift sources and pbxproj: none | verified | 2026-10-12 |
| Station editor over Wi-Fi: the iPhone, iPad or Apple TV serves a PIN-protected editor page for the user's own stations | `Macdio/Services/StationEditorServer.swift`, `MacdioiOS/Views/Settings/iOSStationEditorView.swift`, `MacdioTV/Views/TVStationEditorView.swift`; no Mac view | verified | 2026-10-12 |
| Scheduled recording (record at a set time) | not implemented (inventory not-found 2); recording starts by hand with a maximum length | not implemented | 2026-10-12 |
| Live Activity or Dynamic Island | not implemented (no ActivityKit); the system Now Playing only | not implemented | 2026-10-12 |
| Audio effects (equaliser, Voice Boost, trim silence) | not implemented (inventory not-found 4); podcast speed is the only audio control | not implemented | 2026-10-12 |
| Android or web version | not implemented | not implemented | 2026-10-12 |
| Episode downloads for offline playback | `Macdio/Services/Podcast/PodcastLibrary.swift` `download(for:)`, download rows with `isDone` | verified | 2026-10-12 |
| Repeat skipping: a show's repeated segments learned from two downloaded episodes and skipped | `Macdio/Services/Podcast/SegmentSkipService.swift` ("Needs two downloaded episodes") | verified | 2026-10-12 |
| Playback speed is the only audio control (no trim silence, no volume boost) | grep `skipSilence`, `trimSilence`, `voiceBoost`, `volumeBoost` across Swift sources: none; rate in `PodcastLibrary.swift` | verified | 2026-10-12 |
| Widgets: Now Playing (small, medium, Lock Screen circular, rectangular, inline), Station Lists, Shows, Latest Episodes; iPhone and iPad | feature inventory row "Widgets", `MacdioWidgets` target | verified | 2026-10-12 |
| Family Sharing | an App Store Connect setting, not in code; the press kit page said "Family Sharing support" before 2026-10-12 and still does; Sait confirms in App Store Connect | open | 2026-10-12 |
| Ad-break recovery and predictive song cycle (features.html Song Identification section) | not read in code yet; `ShazamService.swift` to read before the next copy pass | open | 2026-10-12 |
