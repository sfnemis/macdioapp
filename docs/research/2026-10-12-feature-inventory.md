# Macdio feature inventory, verified from source (2026-10-12)

Source of truth: the app repository at `/Users/xfn/Developments/Dev/shortwave`, branch `v3`, HEAD `2e4b66ff`. Every path below is relative to that root. The demo edition under `Macdio/Showcase/` was ignored.

Method: target membership was computed from the three `project.pbxproj` files (explicit `PBXSourcesBuildPhase` entries plus the synchronized folder groups), so "Platforms" states where a file is actually compiled, not where a comment says it runs. Platform-conditional code (`#if os(...)`) was read where it mattered. Nothing in `docs/features-inventory.md` (June 2026) was copied; it served only as a checklist of names, and its competitor section was not used.

Platform key: iPhone and iPad are one iOS binary (`MacdioiOS` target; iPad gets its own split layout, `MacdioiOS/Views/iOSContentView.swift`, 11 `NavigationSplitView` or size-class sites). Mac is the native `Macdio` target (AppKit and SwiftUI, not Catalyst). TV is `MacdioTV`. Watch is `MacdioWatch Watch App`. CarPlay lives inside the iOS target. Widgets are `MacdioWidgets`.

Confidence: "verified" means the implementing type or function was read; "inferred" means the file is compiled for that platform but the screen was not read end to end; "NOT FOUND" means the repository contains no such code.

## 1. Feature table

### Directory and search

| Feature | What it does | Platforms | Evidence | Confidence |
|---|---|---|---|---|
| Radio Browser directory | Browses and searches the community Radio Browser directory, with bootstrap over `all.api.radio-browser.info` and a mirror fallback pool | iPhone, iPad, Mac, TV, Watch | `Macdio/Services/Discovery/RadioBrowserClient.swift` (`fallbackServers`, `bootstrapHosts`) | verified |
| Own directory fallback | When Radio Browser does not answer, requests go to Macdio's own mirror `dir.macdio.app` | iPhone, iPad, Mac, TV, Watch | `RadioBrowserClient.swift:188` `static let ownDirectory = "dir.macdio.app"` | verified |
| Search and sort | Search by name; browse by country, region, genre, language; sort by Most Popular, Most Voted, Highest Quality (bitrate) | iPhone, iPad, Mac, TV | `Macdio/Views/Discover/DiscoverView.swift` sort enum (`popularity`, `votes`, `bitrate`), `MacdioiOS/Views/Discover/iOSDiscoverView.swift`, `MacdioTV/Views/TVBrowseView.swift` | verified |
| City search (MapKit) | A typed city is geocoded with `MKGeocodingRequest` (OS 26) or `CLGeocoder` (earlier), then stations with coordinates within 50 km are listed, most listened first | iPhone, iPad, Mac, TV | `Macdio/Services/Discovery/StationRepository.swift` `lookup(_:locale:)`; `RadioBrowserClient.swift` `stationsNear(latitude:longitude:radiusMeters: 50_000, limit: 60)` | verified |
| Country suggestions | The device region drives the suggested country in Library, Discover and Podcasts | iPhone, iPad, Mac | `Macdio/Services/Discovery/GeoCountryService.swift` | verified |
| Recommendations | Suggests stations from tag and country frequency of favourites and history | iPhone, iPad, Mac | `Macdio/Services/Discovery/RecommendationEngine.swift` `recommend(favorites:history:candidates:)` | verified |
| Station logos | Bundled logo pack, station favicon, logo.dev lookup, user-picked image for custom stations | iPhone, iPad, Mac, TV, Watch | `Macdio/Views/Components/SharedComponents.swift` (logo resolver around lines 1595 to 1821), `Macdio/Views/Settings/MacSettingsView.swift:878` | verified |
| Custom station by URL | Add a station from a stream or playlist URL with name and logo; playlist files are resolved | iPhone, iPad, Mac (TV through the Wi-Fi editor) | `MacdioiOS/Views/Library/AddCustomStationSheet.swift`; `Macdio/Views/Library/LibraryView.swift:1386` "Add Custom Station" | verified |
| Stream URL resolution | Resolves PLS, M3U, M3U8, ASX and XSPF playlists, probes Icecast mount lists, strips variant tails from names | iPhone, iPad, Mac, TV, Watch | `Macdio/Services/Audio/StreamURLResolver.swift:4,21,482` | verified |
| Station editor over Wi-Fi | The phone or Apple TV serves a small web page on the local network (`NWListener`, Bonjour `_macdio-editor._tcp`, random 6-digit PIN); a browser lists, edits and tests only user-added stations (`GET /api/stations`, `POST /api/stations`, `POST /api/test`). Runs only while the editor screen is open | iPhone, iPad, TV (not Mac: zero references in `Macdio.xcodeproj`) | `Macdio/Services/StationEditorServer.swift:5-20,116,127,141,258-282`; `MacdioiOS/Views/Settings/iOSStationEditorView.swift`; `MacdioTV/Views/TVStationEditorView.swift`; `NSBonjourServices` in both Info.plists | verified |
| Station list import and export | Favourites and custom lists as a JSON file through save and open panels | Mac only | `Macdio/Services/Discovery/StationImportExport.swift` `exportStations`, `importStations`; `LibraryView.swift:197,203` | verified |

### Library and sync

| Feature | What it does | Platforms | Evidence | Confidence |
|---|---|---|---|---|
| Favourites | Heart a station, manual order (`sortIndex`), notes per station | iPhone, iPad, Mac, TV, Watch | `Macdio/Models/Station.swift` (`isFavorite`, `sortIndex`, `userNotes`) | verified |
| Custom lists (My Lists) | Named station lists with icon and order | iPhone, iPad, Mac, TV (Watch shows favourites, saved songs and recents only) | `Macdio/Models/Category.swift` `StationCategory`; `MacdioiOS/Views/Library/AddToListSheet.swift`; TV "My Lists" strings | verified |
| Recently played | One row per station play with duration and device, synced | iPhone, iPad, Mac, TV, Watch | `Macdio/Models/Category.swift` `PlaybackHistory` | verified |
| Recently heard tracks | Local list of titles heard, max 750 on iPhone and Mac, 50 on the watch; not synced | iPhone, iPad, Mac, TV, Watch | `Macdio/Services/TrackHistoryStore.swift:6-12` | verified |
| Saved tracks (heart a song) | Saves title, artist, artwork, station and a lyrics snapshot; playlists of saved tracks; synced | iPhone, iPad, Mac, TV, Watch | `Macdio/Models/SavedTrack.swift` (`SavedTrack`, `TrackPlaylist`); `Macdio/Views/Components/SaveTrackButton.swift` | verified |
| Apple Music bridge | MusicKit search for a saved track; "Love Songs in Apple Music" mirrors hearts as Apple Music ratings; adding to library or playlists is iOS only | iPhone, iPad (library), Mac, TV, Watch (search and love) | `Macdio/Services/AppleMusicService.swift` `supportsLibraryManagement` (`#if os(iOS)`), `favoriteInAppleMusic`, `searchSong` | verified |
| Duplicate guard | One place that refuses duplicate stations, favourites, saved tracks and playlist entries so synced data stays clean | all | `Macdio/Services/DuplicateGuard.swift` | verified |
| iCloud sync, no account | SwiftData with CloudKit private database. Synced: Station, StationCategory, SavedTrack, TrackPlaylist, PlaybackHistory, Podcast, Episode, EpisodeTranscript, EpisodeHighlight, EpisodeInsight. Local only: Recording, Song, AppSettings, EpisodeDownload. Opt-in prompt, uses the user's own iCloud; there is no Macdio login anywhere | iPhone, iPad, Mac, TV (the watch store is local, `cloudKitDatabase: .none`, and is fed by the iPhone snapshot) | `Macdio/Services/Data/ModelContainerFactory.swift` `cloudModels`, `localModels`, lines 188-208; entitlements `iCloud.com.macdio.app`; `Macdio/Views/Components/iCloudSyncPromptView.swift`; no sign-in code (grep) | verified |
| Settings sync | iCloud key-value store carries appearance, buffering, limits, highlight destinations, notification toggles | iPhone, iPad, Mac, TV, Watch | `Macdio/Services/SettingsSyncService.swift` (`NSUbiquitousKeyValueStore`, keys listed in file) | verified |
| iCloud self-test | "Test iCloud Sync" round trip in Settings | iPhone, iPad, Mac, TV | `Macdio/Services/CloudSyncTestService.swift` | verified |
| Reset all data | Deletes the local stores after a confirmation | all | `Macdio/Services/DataResetService.swift` | verified |
| Watch link | iPhone sends a latest-wins snapshot over WatchConnectivity; wrist edits (favourite, star, position, played, saved track, highlight, subscription) go back as idempotent events | iPhone, Watch | `MacdioiOS/Services/WatchSyncService.swift`; `MacdioiOS/MacdioWatch Watch App/Services/WatchSync.swift`; `Macdio/Services/Sync/WatchSyncPayload.swift` | verified |

### Playback engine

| Feature | What it does | Platforms | Evidence | Confidence |
|---|---|---|---|---|
| Relay for Icecast and SHOUTcast | A local loopback proxy strips Range headers, keeps the connection open, parses ICY metadata and hands clean audio to AVPlayer; on the Mac an in-process `AVAssetResourceLoader` does the same without a socket | iPhone, iPad, Mac, TV (the watch plays the station URL directly) | `Macdio/Services/Audio/StreamProxyServer.swift:4-22`; `Macdio/Services/Audio/IcecastResourceLoader.swift` (`#if os(macOS)`) | verified |
| Stream formats | Direct streams: MP3, AAC and AAC+, Ogg Vorbis, Opus, FLAC, WAV. HLS streams (`.m3u8`, `Station.isHLS`). Playlist files: PLS, M3U, M3U8, ASX, XSPF | iPhone, iPad, Mac, TV, Watch | `StreamURLResolver.swift:21,103,285-295,321`; `Macdio/Models/Station.swift` `isHLS` | verified |
| Automatic reconnect | Progressive backoff 1, 2, 5, 10, 30, 30, 60, 60 s; one reconnect per network path change (Wi-Fi to cellular) | all | `Macdio/Services/Audio/AudioPlayerService+Networking.swift:108-112,143,161` | verified |
| Safety buffer and adaptive buffering | A user-set lead of 0 to 15 s is held in the relay, plus an adaptive step from the station's stall history; off for HLS | iPhone, iPad, Mac, TV | `Macdio/Services/Audio/AudioPlayerService.swift:680-690` `safetyBufferTarget`, `isAdaptiveBufferingEnabled`; `:2465` | verified |
| Live Pause | A real pause on a live stream: the relay keeps spooling and play resumes where it stopped; opt-in, off by default | iPhone, iPad, Mac, TV | `AudioPlayerService.swift:1289-1300` (`livePauseEnabled`) | verified |
| Preferred stream quality | Picks the low, medium or best variant a station offers | Mac (`audioQuality`), TV (`streamQuality`) | `MacSettingsView.swift:59,93-96`; `MacdioTV/Views/TVSettingsView.swift:11` | verified |
| Now Playing integration | Lock Screen, Control Center, CarPlay and headphone remote commands: play, pause, next and previous station, skip, playback rate | all | `Macdio/Services/Audio/AudioPlayerService+RemoteCommands.swift:140-214`; `AudioPlayerService+NowPlaying.swift` | verified |
| Headphone presses | AirPods double and triple press skip inside an episode and switch stations in radio | iPhone, iPad, Mac | `Macdio/Services/Podcast/PodcastLibrary.swift:84-92` `headphonePressesSkip` | verified |
| AirPlay | Route picker on Mac and iOS, an AirPlay button on TV; the Mac keeps external playback for multi-room | iPhone, iPad, Mac, TV | `SharedComponents.swift:224` (`AVRoutePickerView`), `MacdioiOS/Views/Player/PlayerHelperViews.swift:10`, `MacdioTV/Views/TVAirPlayButton.swift`, `AudioPlayerService.swift:2528-2537` | verified |
| Game controllers | MFi and Bluetooth gamepads with remappable buttons (play, stop, next and previous station, favourite, Song ID, full player, tabs, volume) on iPhone, iPad and Mac; extended gamepads (PS5, Xbox) detected on TV where the system focus engine drives the UI | iPhone, iPad, Mac, TV | `AudioPlayerService+RemoteCommands.swift:231-238` (`ControllerAction`, `#if os(iOS) \|\| os(macOS)`), `AudioPlayerService.swift:1282-1285`; Mac "Game Controller" and iOS "Button Map" settings | verified |
| Sleep timer | Presets 15, 30, 45 min, 1 h, 2 h and End of track; 30 s fade-out; optional nightly repeat within a 12 h window | iPhone, iPad, Mac, TV, Watch | `Macdio/Services/Audio/SleepTimerService.swift:28,41-59,64-69`; `WatchSettingsView.swift:15` | verified |
| Alarm | Wake to a station or the newest episode of a show, once, daily or weekdays, 9-minute snooze, through local notifications | iPhone, iPad | `MacdioiOS/Views/Player/FullPlayerView.swift:1833` `final class AlarmService` (`snoozeMinutes = 9`, `wakeFeedURL`) | verified |
| Clock Mode | Bedside full-screen clock radio with dimming | iPhone, iPad | `FullPlayerView.swift:2106` `struct ClockRadioView` | verified |
| Auto-play on launch | Resumes the last station when the app opens | Mac, TV | `MacSettingsView.swift` "Auto-Play on Launch"; `TVSettingsView.swift` | verified |
| Background audio | `UIBackgroundModes audio` on iOS, TV and watch | iPhone, iPad, TV, Watch | `MacdioiOS/Resources/Info.plist:110`, `MacdioTV/Resources/Info.plist:65`, watch build setting `INFOPLIST_KEY_UIBackgroundModes` | verified |

### Song ID and lyrics

| Feature | What it does | Platforms | Evidence | Confidence |
|---|---|---|---|---|
| Song ID from the stream, no microphone | ShazamKit signatures are built from the relay's unplayed tail bytes or from a second network capture of the stream URL, decoded to PCM in memory. There is no `AVAudioEngine` input, no `NSMicrophoneUsageDescription` in any Info.plist | iPhone, iPad, Mac, TV, Watch | `Macdio/Services/Audio/ShazamService.swift:315` (`SHSignatureGenerator`), `:467,619` (`StreamProxyServer.unplayedTailBytes`), `:795` (network capture), `:1553` (`AVAssetReader`); `MacdioiOS/MacdioWatch Watch App/Services/WatchShazam.swift` | verified |
| Automatic Song ID | Repeats on a cadence for stations that send no title; on the watch it is "Only on Wi-Fi" by default | iPhone, iPad, Mac, TV, Watch | `WatchShazam.swift:49-50`; TV "Auto Identify Songs"; Mac "Auto Shazam" toggle | verified |
| Synced lyrics (LRCLIB) | Fetches synced and plain lyrics from lrclib.net, highlights the line being heard, user offset in 1 s steps, reset | iPhone, iPad, Mac, TV | `Macdio/Services/Lyrics/LyricsService.swift:67,102` (`searchLRCLIB`); `AudioPlayerService.swift:407` `lyricsOffset`; `Macdio/Views/Lyrics/LyricsView.swift:199-239`; `MacdioiOS/Views/Player/iOSLyricsView.swift`; `MacdioTV/Views/TVLyricsView.swift` | verified |
| Lyrics on Apple TV | Side panel that slides in next to Now Playing, synced or plain | TV | `MacdioTV/Views/TVLyricsView.swift:1-2` | verified |

### Recording

| Feature | What it does | Platforms | Evidence | Confidence |
|---|---|---|---|---|
| Stream recording | Records the raw stream to a file; format Original, MP3, AAC or M4A; quality Original, 128, 192 or 256 kbps; default stop after 3 h (setting `maxRecordingMinutes`); refuses to start under 500 MB free | iPhone, iPad, Mac | `Macdio/Services/Recording/RecordingService.swift:1` (`#if os(iOS) \|\| os(macOS)`), `:41-42,150,189-194`; `Macdio/Models/RecordingSettings.swift`; `MacdioiOS/Views/Recording/iOSRecordingListView.swift`; `Macdio/Views/Recording/RecordingView.swift` | verified |
| Split by track | One file per song from ICY metadata, with a minimum-length guard and same-song refinement so a title correction does not cut a song in two | iPhone, iPad, Mac | `RecordingService.swift:52-57,387,439-451,477-577`; `RecordingSettings.swift:60-76` `RecordingMode.splitByTrack` | verified |
| Songs inside a recording | The Song ID engine scans a finished recording and stores a timestamped song list | iPhone, iPad, Mac | `Macdio/Services/Podcast/TracklistService.swift:1-7`; `Macdio/Models/Song.swift` | verified |
| Recordings stay in the app | No share sheet, export, AirDrop or Finder reveal exists for recordings (App Review 5.2.3 decision) | iPhone, iPad, Mac | grep of `ShareLink`, `UIActivityViewController`, `NSSavePanel` in the two recording views: none | verified (absence) |

### Podcasts

| Feature | What it does | Platforms | Evidence | Confidence |
|---|---|---|---|---|
| Podcast directory | Search through Podcast Index with iTunes Search as fallback; trending shows (Podcast Index); Apple charts per country and genre and Apple Trending Episodes through the public marketing RSS | iPhone, iPad, Mac, TV, Watch | `Macdio/Services/Podcast/PodcastDirectoryClient.swift` `search`, `trending`, `topChart`, `trendingEpisodes`, `itunesSearch`, `marketingChart` | verified |
| Subscriptions | Per show: playback speed, skip intro seconds, episode limit, auto-download | iPhone, iPad, Mac, TV, Watch (subscribe) | `Macdio/Models/Podcast.swift:33-38` | verified |
| OPML import and export | Imports every `xmlUrl` from an OPML file, exports subscriptions | iPhone, iPad, Mac (the TV target compiles `OPML.swift` but no TV screen uses it) | `Macdio/Services/Podcast/OPML.swift`; `MacdioiOS/Views/Podcasts/iOSPodcastsView.swift:60` (`fileImporter` for `.opml`); `Macdio/Views/Podcasts/PodcastsView.swift` | verified |
| Downloads | Episode downloads with progress, per-show auto-download, a storage cap ("Keep downloads under"), delete all | iPhone, iPad, Mac (TV reads but does not surface downloads) | `PodcastLibrary.swift:98,860,1770-1778,1984-1988`; `Macdio/Models/Podcast.swift` `EpisodeDownload`; `iOSSettingsView.swift:395-400` | verified |
| Up Next and Continue Listening | A queue of episodes, in-progress strip, resume last episode | iPhone, iPad, Mac, TV, Watch | `PodcastLibrary.swift` `upNext()`, `inProgress(limit:)`, `playNextInQueue()`; `Macdio/Views/Podcasts/ContinueListeningStrip.swift` | verified |
| Live station in Up Next | A station plays for N minutes, then the queue moves on to the next episode | iPhone, iPad, Mac (TV inferred) | `PodcastLibrary.swift:1706-1718` `startUpNext(afterMinutes:)` | verified |
| Publisher chapters | Reads `<podcast:chapters>` JSON files; chapter list in the player | iPhone, iPad, Mac, TV | `Macdio/Services/Podcast/PodcastFeedParser.swift:118`; `PodcastExtras.swift` `parseChapters`; `MacdioiOS/Views/Podcasts/iOSChaptersView.swift`; `MacdioTV/Views/TVEpisodeDetailsPanel.swift` | verified |
| Generated chapters | When a feed ships no chapters, titles and times are drawn from the transcript with Apple's language model: Private Cloud Compute on OS 27, the on-device model elsewhere; stored once and synced | iPhone, iPad, Mac | `Macdio/Services/Podcast/ChapterGenerator.swift:1-14,73-80,303-308`; entitlement `com.apple.developer.private-cloud-compute` | verified |
| Episode summary | Same model path produces a short summary from the transcript; other devices read the synced row | iPhone, iPad, Mac (TV shows the synced text) | `ChapterGenerator.swift:257` `summarize(...)`; `Macdio/Models/Podcast.swift` `EpisodeInsight.summary` | verified |
| Publisher transcripts | `<podcast:transcript>` in SRT, WebVTT, JSON, HTML or plain text, shown in the lyrics panel and followed during playback | iPhone, iPad, Mac, TV | `PodcastFeedParser.swift:120-125`; `PodcastExtras.swift:107-147` `parseTranscript`; `LyricsService.swift:118-160` | verified |
| On-device transcription | `SpeechAnalyzer` with `SpeechTranscriber` for the locales Apple ships, the on-device `SFSpeechRecognizer` for the rest (Turkish among them); the model download is part of the job; audio and text never leave the device; cues are stored in CloudKit for the other devices; continues as a background task | iPhone, iPad, Mac | `Macdio/Services/Podcast/TranscriptionService.swift:1,9-16,641-655,694-699,739-758`; `Info.plist` `NSSpeechRecognitionUsageDescription`; `BGTaskSchedulerPermittedIdentifiers` `com.macdio.app.transcribe` | verified |
| Transcription languages | The list a phone can transcribe is read at run time from the system, not hard-coded; Settings has a "Transcription Languages" page | iPhone, iPad, Mac | `TranscriptionService.swift:696,741`; `iOSSettingsView.swift:387-388` | verified |
| Transcript search | Full-text search across every stored transcript, up to 60 hits, jumps to the moment | iPhone, iPad, Mac | `TranscriptionService.swift:314-344` `search(_:limit:)` | verified |
| Highlights (Mark this moment) | Marks the second and the transcript sentence at that point; synced; also from Siri and from the watch | iPhone, iPad, Mac, Watch | `Macdio/Services/Podcast/HighlightStore.swift`; `Macdio/Models/Podcast.swift` `EpisodeHighlight`; `MacdioiOS/App/MacdioShortcuts.swift:94` `MarkMomentIntent`; `WatchSync.swift:230` | verified |
| Highlight export | Six destinations: Apple Notes (Shortcuts x-callback on iOS, AppleScript on Mac), Notion (API), Readwise (API), Bear, Obsidian and Craft (URL schemes); tokens stay in the Keychain | iPhone, iPad, Mac | `Macdio/Services/Podcast/HighlightDelivery.swift:18-19,122-128,267,296,348-351,411-449`; `Macdio.entitlements` Apple Events exception for `com.apple.Notes` | verified |
| Songs inside an episode | The Song ID engine scans a downloaded episode and keeps a timestamped tracklist, synced; the TV shows it next to the chapters | iPhone, iPad, Mac (TV displays) | `TracklistService.swift`; `EpisodeInsight.tracklist`; `TVEpisodeDetailsPanel.swift:1-4` | verified |
| Skip repeated segments | Intros, outros and sponsor beds shared by a show's episodes are found with a local `SHCustomCatalog` and skipped; nothing leaves the device | iPhone, iPad, Mac | `Macdio/Services/Podcast/SegmentSkipService.swift:1-9` | verified |
| Speed and skip intervals | Global and per-show rate, skip forward and back lengths | iPhone, iPad, Mac, TV | `PodcastLibrary.swift:74-82`; `AudioPlayerService+Podcast.swift:104` | verified |
| Charts by country in Discover | A country page lists its Apple podcast chart next to its stations | iPhone, iPad, Mac | `Macdio/Views/Podcasts/PodcastChartStrip.swift:1-5` | verified |
| New-episode push | The device registers its token and followed feeds with `push.macdio.app` (payload: token, env, feeds, lang); the Worker sends the push, a service extension attaches the artwork | iPhone, iPad, Mac (TV has the entitlement, registration path not read) | `PodcastLibrary.swift:2515-2623` `PushRegistration`; `MacdioNotificationService/NotificationService.swift:1-6`; `Macdio/App/MacdioAppDelegate.swift:30`; `MacdioiOS/App/MacdioiOSApp.swift:168` | verified |
| Background feed refresh | `com.macdio.app.podcastRefresh` background task | iPhone, iPad | `MacdioiOSApp.swift:678`; `Info.plist:5-8` | verified |
| Podcasts on the watch | Feeds are fetched on the watch's own network; Continue, Up Next, Latest and the shows in one list | Watch | `MacdioiOS/MacdioWatch Watch App/Services/WatchPodcastFeed.swift:1-3`; `Views/WatchPodcastsView.swift:1-5` | verified |

### Siri, Spotlight, CarPlay, widgets

| Feature | What it does | Platforms | Evidence | Confidence |
|---|---|---|---|---|
| Siri and Shortcuts | Ten App Intents: Play Station, Resume Radio, Play Favorites, Mark This Moment, Stop Radio, Open Podcast, Play Latest Episode, Resume Podcast, Play Up Next, Play Live Radio; phrases name the station ("Play Radio Paradise on Macdio"); the same intents run on the Mac | iPhone, iPad, Mac | `MacdioiOS/App/MacdioShortcuts.swift:11-304,424-543`; `MacdioiOS/App/StationEntity.swift`; `Macdio/App/MacSiri.swift:1-9`; `MacdioiOS/Resources/AppShortcuts.xcstrings` | verified |
| Spotlight | Stations are indexed with CoreSpotlight so "BBC Radio" in Spotlight opens the app; stations are also an `IndexedEntity` | iPhone, iPad (no CoreSpotlight in the Mac target) | `MacdioiOS/Services/SpotlightIndexer.swift:5-23`; `StationEntity.swift:283` | verified |
| CarPlay | Tab bar with Home, Podcasts, Favorites, Discover; a Search template one tap away; Now Playing with rate button and Up Next | CarPlay (iOS target) | `MacdioiOS/App/CarPlaySceneDelegate.swift:1-9,574,858-1767`; entitlement `com.apple.developer.carplay-audio` | verified |
| Widgets | Four widgets: Now Playing (small, medium, Lock Screen circular, rectangular, inline), Station Lists (medium, large, configurable list), Shows (medium, large), Latest Episodes (medium, large) | iPhone, iPad | `MacdioWidgets/MacdioWidgets.swift:158-162,938-1047`; `MacdioiOS/Services/WidgetUpdater.swift` | verified |
| URL scheme | `macdio://` deep links | iPhone, iPad | `MacdioiOS/Resources/Info.plist:31-33` | verified |

### Mac

| Feature | What it does | Platforms | Evidence | Confidence |
|---|---|---|---|---|
| Menu bar player | `MenuBarExtra` with Now Playing, favourites, sleep timer (+15 m), Settings, Quit; "Show Macdio in" Dock, menu bar or both | Mac | `Macdio/App/MacdioApp.swift:310,320`; `Macdio/Views/MenuBar/MenuBarPlayerView.swift`; `MacSettingsView.swift:72,174` | verified |
| Compact player window | A second small window that replaces the main one | Mac | `MacdioApp.swift:287` (`Window("Macdio", id: "compact-player")`) | verified |
| Dock artwork and Dock menu | Album art on the Dock icon, media controls in the right-click menu | Mac | `Macdio/Services/DockTileManager.swift:1` | verified |
| Open at Login | `SMAppService` login item | Mac | `MacSettingsView.swift:183-188,419-421` | verified |
| Keyboard shortcuts | 19 bindings, among them Space play and pause, ⌘← and ⌘→ station, ⌘M, ⇧⌘M, ⌘R, ⇧⌘P, ⌘F; none on iPad | Mac | grep of `.keyboardShortcut(` in `Macdio/Views` and `Macdio/App` (19), in `MacdioiOS` (0) | verified |
| Track change notifications | Notification Center banner with title, artist and station, on by default | Mac | `Macdio/App/AppState.swift:672-690` | verified |
| Station library auto-refresh | Scheduled refresh of directory data for the library, weekly by default | Mac | `AppState.swift:615`; `MacSettingsView.swift:76,196` | verified |
| Apple Events to Notes | Sandbox exception so highlights can be written into Apple Notes | Mac | `Macdio/Resources/Macdio.entitlements`; `Info.plist` `NSAppleEventsUsageDescription` | verified |

### Apple TV and Apple Watch

| Feature | What it does | Platforms | Evidence | Confidence |
|---|---|---|---|---|
| Apple TV app | Tabs: Now Playing, Recently Played, Podcasts, Discover, Favorites, Saved Tracks, Stats, Settings; Siri Remote focus navigation | TV | `MacdioTV/Views/TVContentView.swift:1-15,70-135` | verified |
| Ambient Mode | Artwork, song and clock with the chrome hidden | TV | `MacdioTV/Views/TVNowPlayingView.swift:46-50`; `TVSettingsView.swift:24` | verified |
| Episode details on TV | Chapters and songs of the playing episode in one list; transcript in the lyrics panel | TV | `MacdioTV/Views/TVEpisodeDetailsPanel.swift:1-4` | verified |
| Top Shelf | Favourites and recently played rows on the Apple TV home screen from an App Group snapshot | TV | `MacdioTV/MacdioTopShelf/ContentProvider.swift:1-9,55-64`; writer in `MacdioTV/TopShelf/ContentProvider.swift` | verified |
| Standalone watch app | `WKRunsIndependentlyOfCompanionApp = YES`; browses the directory and plays on the watch's own connection (Wi-Fi or cellular); works without the iPhone app | Watch | `MacdioiOS/MacdioiOS.xcodeproj/project.pbxproj:1326-1327`; `WatchBrowseView.swift:1-2`; `WatchSync.swift:9,152`; `WatchPodcastFeed.swift:1` | verified |
| Watch tabs | Now Playing, Library (saved songs, favourites, recents), Podcasts, Browse, Settings (sleep timer, stats, iPhone link) | Watch | `MacdioiOS/MacdioWatch Watch App/Views/WatchContentView.swift:1-9` | verified |
| Watch Song ID and marks | Identify from the Now Playing screen; marked moments go back to the phone | Watch | `WatchShazam.swift`; `WatchNowPlayingView.swift:1-9`; `WatchSync.swift:22-27,230` | verified |
| Watch complications | NOT FOUND (no WidgetKit or ClockKit code in the watch target) | Watch | grep | NOT FOUND |

### Stats, accessibility, languages, privacy, pricing

| Feature | What it does | Platforms | Evidence | Confidence |
|---|---|---|---|---|
| Listening stats | Weekly, monthly and all-time minutes, top stations and shows, per-device breakdown (Mac, iPhone, iPad, Watch, TV), daily rows, a shareable card | iPhone, iPad, Mac, TV, Watch | `MacdioiOS/Views/Stats/ListeningStatsView.swift`; `Macdio/Views/Stats/MacListeningStatsView.swift:1-2`; `MacdioTV/Views/TVListeningStatsView.swift`; `WatchStatsView.swift`; `Macdio/Views/Stats/StatsShare.swift:66-83` | verified |
| Accessibility | VoiceOver labels and hints (Mac 34 labels, 5 hints; iOS 45 and 7; TV 40 and 19), reduce-motion checks (Mac 2, iOS 4), Dynamic Type sizing on iOS, large text layouts on the watch | all | grep counts across the three view trees; `WatchNowPlayingView.swift:6-7` | verified (counts) |
| Localisation | 14 UI locales in every target: ar, de, en, es, fr, it, ja, nl, pl, pt-BR, ru, tr, zh-Hans, zh-Hant (source en). Siri phrases are localised in 19 locales (adds da, ko, nb, sv, vi) | all | `Macdio/Resources/Localizable.xcstrings` (1084 keys), `MacdioiOS/Resources/Localizable.xcstrings` (1287), `MacdioTV/Resources/Localizable.xcstrings` (361), watch (590); `AppShortcuts.xcstrings` (28 keys) | verified |
| Pricing | No purchase code: StoreKit is imported only for `requestReview`; no products, receipts or subscriptions. The one-time Universal Purchase price is set in App Store Connect, not in code | all | grep: `MacdioiOS/Views/iOSContentView.swift:200,554`, `iOSSettingsView.swift:3,586` only | verified (absence of IAP) |
| Privacy | No analytics, crash or ad SDK; zero Swift packages (no `Package.resolved`, no `XCRemoteSwiftPackageReference`); privacy manifests say `NSPrivacyTracking = false`; the iOS manifest declares Device ID and Product Interaction, not linked and not for tracking, which is the push token plus followed feeds; Notion and Readwise tokens in the Keychain; no account | all | `MacdioiOS/PrivacyInfo.xcprivacy`, `Macdio/Resources/PrivacyInfo.xcprivacy`, `MacdioTV/Resources/PrivacyInfo.xcprivacy`, watch manifest; `Macdio/Utilities/Keychain.swift` | verified |
| Third-party services named in the app | Radio Browser, LRCLIB, iTunes Search, Podcast Index, ShazamKit, Apple Private Cloud Compute, logo.dev; plus Macdio's own `push.macdio.app` and `dir.macdio.app` | all | `MacSettingsView.swift:834-880`; hosts grep | verified |

## 2. Not found

Things the June checklist or marketing drafts suggest that the code does not contain:

1. Live Activity and Dynamic Island: no `ActivityKit` anywhere; the Dynamic Island shows only the system Now Playing. The checklist's sections 16 and 17 are wrong on this.
2. Scheduled recording (record at a set time): no scheduler, no `ScheduledRecording` type. Recording starts by hand, with a maximum length.
3. Handoff between devices (`NSUserActivity` continuation): none. "Hand-off" in the code is the live station to Up Next timer, and "handoff" in networking is Wi-Fi to cellular.
4. Audio effects: no equaliser, Voice Boost, trim silence, mono or volume normalisation (`AVAudioUnitEQ`, `AVAudioEngine` processing absent). Podcast playback speed is the only audio control.
5. Import of favourites from TuneIn, myTuner or radio.net: none. TuneIn appears only as a blocked logo CDN host. The only imports are OPML (podcasts) and Macdio's own JSON (Mac).
6. Station export on iPhone, iPad and Apple TV: the JSON import and export is Mac only.
7. Station editor over Wi-Fi on the Mac: not compiled into the Mac target.
8. Spotlight on the Mac: `CoreSpotlight` is iOS only.
9. Keyboard shortcuts on iPad: none declared.
10. Watch complications and widgets: none.
11. Recording on Apple TV and the watch: `RecordingService` is `#if os(iOS) || os(macOS)`.
12. On-device transcription, generated chapters, summaries, highlight export, segment skipping and in-episode Song ID on Apple TV: those services are not in the TV target; the TV reads the synced results.
13. Alarm on Mac, TV and watch: iOS only.
14. A fixed list of transcription languages: the code asks the system at run time; the site must not print a language list for transcription.
15. A station count in code: the only string is "50,000+ stations" in the tvOS Browse copy; the number is not pinned anywhere and comes from the live directory.
16. Any account, sign-in, subscription or in-app purchase.
17. "Data Not Collected" as an absolute: the iOS privacy manifest declares two collected types for push (see the Privacy row); the site should say what is collected and why.

## 3. Differentiators

Each rests on the competitor synthesis in `macdio-web/docs/research/2026-10-12-competitors.md` (items 6 to 10) and on an evidence row above.

1. Song ID from the stream without a microphone. Synthesis 8: no competitor states it; Broadcasts, Eter and Triode name Shazam without saying how. Evidence: `ShazamService.swift:315,467,619,795`, no `NSMicrophoneUsageDescription`. Works on all five platforms including the watch.
2. Live radio recording, with split by track and song lists. Synthesis 8: none states live recording. Evidence: `RecordingService.swift`, `RecordingSettings.swift`, `TracklistService.swift`. iPhone, iPad and Mac.
3. Synced lyrics for radio with a user offset, on Mac, iPhone, iPad and Apple TV. Synthesis 8: only iHeart mentions lyrics, in release notes. Evidence: `LyricsService.swift`, `LyricsView.swift:199-239`, `TVLyricsView.swift`.
4. On-device podcast transcripts that never upload, searchable across the library, with marked moments exported to six places. Synthesis 8: transcripts exist at Apple, Pocket Casts, Snipd and Overcast; highlights export only at Snipd. Macdio adds Apple Notes, Obsidian, Bear, Craft, Readwise and Notion. Evidence: `TranscriptionService.swift:9-16,318`, `HighlightDelivery.swift:18-19`.
5. The platform matrix itself: native Mac, Apple TV with Top Shelf, standalone watch, CarPlay, one price, no account. Synthesis 7 and 10: six "Mac" competitors are iPad apps, and no site shows Watch standalone, TV and CarPlay side by side. Evidence: target membership from the three `project.pbxproj` files, `WKRunsIndependentlyOfCompanionApp`, `carplay-audio` entitlement, absence of StoreKit purchases.
6. Live Pause and a safety buffer for live streams. Not stated by any competitor in the research. Evidence: `AudioPlayerService.swift:680-690,1289-1300`.
7. Songs identified inside podcast episodes and skipping of repeated sponsor segments, both local. Not stated by any competitor in the research. Evidence: `TracklistService.swift`, `SegmentSkipService.swift`.
8. A Wi-Fi station editor instead of a hosted account page. Not stated by any competitor in the research. Evidence: `StationEditorServer.swift:5-20`.
9. Own directory mirror behind the community directory, so a dated, sourced station count is possible (synthesis 9). Evidence: `RadioBrowserClient.swift:188`.
10. Alarm with wake-to-podcast: synthesis 8 says only myTuner states alarms; Macdio has it on iPhone and iPad (`AlarmService`), so this is parity plus the podcast wake, not an exclusive.

## 4. Platform matrix

iPhone and iPad (one app): directory, dir.macdio.app fallback, city search, recommendations, custom stations, Wi-Fi station editor, favourites, lists, recently played and heard, saved tracks with Apple Music library and playlists, iCloud sync, settings sync, relay engine with all formats, reconnect, safety buffer, Live Pause, Song ID and auto Song ID, synced lyrics, recording with split by track and song lists, podcasts (directory, OPML, downloads, Up Next, live station hand-off, chapters, generated chapters, summaries, publisher and on-device transcripts, transcript search, highlights and six export destinations, in-episode Song ID, segment skip, charts), new-episode push with artwork, background refresh, sleep timer with repeat, alarm, Clock Mode, Siri with ten intents, Spotlight, CarPlay, four widgets with Lock Screen families, game controllers with button map, AirPlay, stats, 14 languages. Not on iOS: menu bar, keyboard shortcuts (iPad), station JSON export, Live Activity.

Mac (native): everything in the iPhone list except Spotlight, CarPlay, widgets, alarm, Clock Mode, the Wi-Fi editor and Apple Music library management, plus menu bar player, compact window, Dock artwork and menu, Open at Login, 19 keyboard shortcuts, track change notifications, station library auto-refresh, JSON station import and export, preferred stream quality, Apple Notes export through AppleScript, in-process Icecast loader, Siri through the shared intents.

Apple TV: directory and search, city search, custom stations through the Wi-Fi editor, favourites, lists, recently played, saved tracks, iCloud sync, relay engine, reconnect, safety buffer, Live Pause, stream quality, Song ID and auto Song ID, lyrics panel, podcasts (directory, subscriptions, Up Next, chapters, publisher transcripts, synced summaries, songs and chapters from other devices), sleep timer, Ambient Mode, Top Shelf, AirPlay button, game controllers, stats, 14 languages. Not on TV: recording, transcription and the model features, highlights, OPML screens, downloads screens, alarm, Siri intents, widgets.

Apple Watch (standalone): directory browse, favourites, recently played, saved tracks, Now Playing with Song ID and marks, podcasts on the watch's own network, sleep timer, stats, iPhone snapshot sync, 14 languages. Not on the watch: lists, lyrics, recording, iCloud direct sync, relay (plays direct), complications.

CarPlay: Home, Podcasts, Favorites, Discover tabs, Search, Now Playing with rate and Up Next.

Widgets (iPhone, iPad): Now Playing (small, medium, Lock Screen circular, rectangular, inline), Station Lists (medium, large), Shows (medium, large), Latest Episodes (medium, large).

### Matrix for the platform page

"yes" means compiled into that target and surfaced in its UI; "reads" means the platform shows results another device produced; "no" means absent from the target. Every cell traces to a row in section 1.

| Feature | iPhone | iPad | Mac | Apple TV | Apple Watch | CarPlay |
|---|---|---|---|---|---|---|
| Radio Browser directory with dir.macdio.app fallback | yes | yes | yes | yes | yes | yes (Discover, Search) |
| City search | yes | yes | yes | yes | no | no |
| Custom station by URL | yes | yes | yes | editor only | no | no |
| Wi-Fi station editor | yes | yes | no | yes | no | no |
| Station JSON import and export | no | no | yes | no | no | no |
| Favourites, recently played, saved tracks | yes | yes | yes | yes | yes | favourites, recents |
| Custom lists | yes | yes | yes | yes | no | no |
| iCloud sync, no account | yes | yes | yes | yes | via iPhone snapshot | n/a |
| Relay engine, reconnect, safety buffer, Live Pause | yes | yes | yes | yes | direct playback, reconnect only | n/a |
| Song ID from the stream | yes | yes | yes | yes | yes | no button |
| Synced lyrics | yes | yes | yes | yes | no | no |
| Recording, split by track | yes | yes | yes | no | no | no |
| Podcast directory, subscriptions, Up Next | yes | yes | yes | yes | yes | yes |
| OPML import and export | yes | yes | yes | no | no | no |
| Episode downloads | yes | yes | yes | no screen | no | no |
| Publisher chapters and transcripts | yes | yes | yes | yes | no | no |
| On-device transcription, transcript search | yes | yes | yes | reads | no | no |
| Generated chapters, episode summary | yes | yes | yes | reads | no | no |
| Highlights (mark a moment) | yes | yes | yes | no | yes | no |
| Highlight export (6 destinations) | yes | yes | yes | no | no | no |
| In-episode Song ID, segment skip | yes | yes | yes | reads songs | no | no |
| New-episode push | yes | yes | yes | entitlement only | no | n/a |
| Sleep timer with repeat | yes | yes | yes | yes | yes | n/a |
| Alarm | yes | yes | no | no | no | no |
| Clock Mode | yes | yes | no | no | no | no |
| Siri and Shortcuts (10 intents) | yes | yes | yes | no | no | n/a |
| Spotlight | yes | yes | no | no | no | n/a |
| Widgets | yes | yes | no | no | no | n/a |
| Live Activity | no | no | no | no | no | no |
| Menu bar player, Dock artwork, Open at Login | no | no | yes | no | no | n/a |
| Keyboard shortcuts | no | no | yes | no | no | n/a |
| Top Shelf, Ambient Mode | no | no | no | yes | no | n/a |
| Game controllers | remappable | remappable | remappable | detected | no | n/a |
| AirPlay | yes | yes | yes | yes | no | n/a |
| Listening stats | yes | yes | yes | yes | yes | no |
| 14 languages | yes | yes | yes | yes | yes | yes |

## 5. Numbers the site may print, with sources

| Number | Value | Source |
|---|---|---|
| UI languages | 14 (ar, de, en, es, fr, it, ja, nl, pl, pt-BR, ru, tr, zh-Hans, zh-Hant) | the four `Localizable.xcstrings` files |
| Siri phrase locales | 19 | `MacdioiOS/Resources/AppShortcuts.xcstrings` |
| Third-party code dependencies | 0 Swift packages | no `Package.resolved`, `XCRemoteSwiftPackageReference` count 0 in all three projects |
| Direct stream codecs | 6 (MP3, AAC and AAC+, Ogg Vorbis, Opus, FLAC, WAV) plus HLS | `StreamURLResolver.swift:103,285-295,321` |
| Playlist formats resolved | 5 (PLS, M3U, M3U8, ASX, XSPF) | `StreamURLResolver.swift:21` |
| Reconnect backoff | 1, 2, 5, 10, 30, 30, 60, 60 s | `AudioPlayerService+Networking.swift:111` |
| Safety buffer range | 0 to 15 s, adaptive step on top | `AudioPlayerService.swift:689` |
| City search radius and size | 50 km, up to 60 stations | `RadioBrowserClient.swift:555` |
| Recording formats and bitrates | Original, MP3, AAC, M4A; Original, 128, 192, 256 kbps | `RecordingSettings.swift` |
| Recording default maximum | 3 h, user setting in minutes | `RecordingService.swift:41,189-194` |
| Free space needed to record | 500 MB to start, 100 MB floor while recording | `RecordingService.swift:42,150` |
| Sleep timer presets | 6 (15, 30, 45, 60, 120 min, End of track); fade 30 s; repeat window 12 h | `SleepTimerService.swift:28,59,64-69` |
| Alarm snooze | 9 min; modes once, daily, weekdays | `FullPlayerView.swift:1836,1876` |
| Song ID signature | about 10 s of audio per attempt; worst case 4 captures in 78 s | `ShazamService.swift:387,480` |
| Recently heard tracks kept | 750 (watch 50) | `TrackHistoryStore.swift:10-11` |
| Saved tracks shown | 5 to 100 (setting) | `MacSettingsView.swift:559` |
| Stats window | newest 5000 history rows (watch 500) | `ListeningStatsView.swift:1-4`; `WatchStatsView.swift:2` |
| Highlight export destinations | 6 | `HighlightDelivery.swift:19` |
| Siri intents | 10 | `MacdioShortcuts.swift` |
| Widgets | 4 widgets, 5 families for Now Playing | `MacdioWidgets.swift:1018-1047` |
| CarPlay tabs | 4 plus Search | `CarPlaySceneDelegate.swift:858-1767` |
| Mac keyboard shortcuts | 19 | grep of `.keyboardShortcut(` |
| Synced model types | 10 synced, 4 local only | `ModelContainerFactory.swift:23-40` |
| Push payload fields | 4 (token, env, feeds, lang) | `PodcastLibrary.swift:2623` |
| Station editor PIN | 6 digits | `StationEditorServer.swift:116` |
| Transcript length limit | none in code; search returns up to 60 hits | `TranscriptionService.swift:318` |
| Transcription languages | not pinned; read from `SpeechTranscriber.supportedLocales` and on-device `SFSpeechRecognizer` at run time | `TranscriptionService.swift:696,741` |
| Station count | not in code (only "50,000+ stations" in tvOS copy); take a dated count from the directory | `MacdioTV/Views/TVBrowseView.swift` |
| Price | not in code; one-time Universal Purchase set in App Store Connect | absence of StoreKit purchase code |

## 6. Things noticed while reading (not site content)

1. `Macdio/Resources/PrivacyInfo.xcprivacy` and the TV manifest declare no collected data, but the Mac registers with `push.macdio.app` too (`PodcastLibrary.swift:2568`, `MacdioAppDelegate.swift:30`). The iOS manifest declares the push data; the Mac one looks stale.
2. `MacdioTV/TopShelf/ContentProvider.swift` (app-side writer) and `MacdioTV/MacdioTopShelf/ContentProvider.swift` (extension) share a file name and differ; harmless but easy to confuse.
3. Siri phrases are localised in five locales (da, ko, nb, sv, vi) that the UI does not have, so Siri can answer in a language the app then shows in English.
4. `PushRegistration.appKey` is a hard-coded string in `PodcastLibrary.swift:2524`; the comment says it only filters noise and is not a secret.
