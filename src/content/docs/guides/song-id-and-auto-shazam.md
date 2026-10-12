---
title: "Song ID and Auto Shazam in Macdio: Name Songs on Any Station"
description: "How Song ID and Auto Shazam name the song a station is playing in Macdio on iPhone, iPad, Mac, Apple TV and Apple Watch, and where those songs go next."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Does Macdio use the microphone to identify songs?"
    a: "No. Macdio makes a short fingerprint of the stream it is already playing and sends only that fingerprint to Apple's Shazam catalog. The app never asks for microphone permission, so the phone can stay in your pocket."
  - q: "Why is the Shazam button greyed out?"
    a: "The station already sends the artist, the title and the song's own cover, so Macdio uses the station's information and turns the button off for that song."
  - q: "Where do the songs I identify go?"
    a: "Into Recently Heard on the Tracks screen. Tap the heart to keep a song in Saved Tracks, and turn on Love Songs in Apple Music if you want hearted songs in your Apple Music library too."
  - q: "Is Auto Shazam on by default?"
    a: "It is off on iPhone, iPad, Mac and Apple TV. On Apple Watch it is on, together with Only on Wi-Fi."
  - q: "Why did Song ID find a song but the title did not change?"
    a: "When the station names its own song, Macdio keeps the station's text. A match that names a different song is dropped, and a match with the same artist only lends its album cover."
---

In Macdio, Song ID names the song a station is playing: press the Shazam button in the player and Macdio matches a short fingerprint of the stream against Apple's Shazam catalog, then shows the title, artist and cover. Auto Shazam (on Apple TV it is called "Auto Identify Songs") does the same on its own whenever a station sends no song information. Both work on iPhone, iPad, Mac, Apple TV and Apple Watch, Song ID also works in CarPlay, and neither one uses the microphone.

For other ways to name a song, read [what song is playing on the radio](/guides/identify-song-on-radio.html).

## Quick steps

1. Play a station and tap the mini player to open the full player.
2. Tap the Shazam button next to the heart.
3. Wait a few seconds while the artwork shows "Identifying…".
4. When the song appears, tap the heart if you want to keep it.

## How to identify a song on each device

| Device | Where the button is | What it looks like |
|---|---|---|
| iPhone, iPad | Full player, next to the heart | Shazam logo (VoiceOver: "Identify song with Shazam") |
| Mac | Player panel and compact player | Shazam logo, tooltip "Identify current song with Shazam" |
| Apple TV | "Now Playing" tab | "Identify" |
| Apple Watch | Player screen | Shazam logo |
| CarPlay | Now Playing screen | Shazam logo |

On Apple TV and Apple Watch the label moves through "Listening" and "Checking" to "Found!" or "No Match". In CarPlay the answer appears under the title (see the [CarPlay guide](/guides/carplay-radio.html)). A press works while the player is paused too, because Macdio reads the audio you already heard. On iPhone, iPad and Mac, the X button of a game controller runs Song ID by default ([game controllers](/guides/game-controllers.html)).

## Why is the Song ID button greyed out?

When a station sends the artist, the title and the song's own cover, Macdio treats that as correct and dims the button. The Mac tooltip then says "The station already provides song info", and CarPlay answers "This station shows its own titles". A cover Macdio found by itself does not count, so on those stations the button stays available.

When a station sends the artist and title but no cover, Song ID can run, but the station's text stays: a match for a different song is dropped, and a match with the same artist only lends its cover. When a station sends only a slogan, or a title with no artist, a press replaces that text with the match.

## Where identified songs go

Every song Song ID finds goes into Recently Heard. Nothing is saved on its own: to keep a song, tap the heart in the player.

- iPhone and iPad: the "Tracks" tab, with "Recently Heard" and "Saved" sections. On iPhone, if you picked another tab in Settings > Appearance > "Tab Bar", Tracks is under More.
- Mac: "Tracks" in the bar at the top of the main window, on a page titled "Saved Tracks".
- Apple TV: the "Saved Tracks" tab.
- Apple Watch: "Saved Songs" in the library.

Recently Heard keeps up to 750 songs on iPhone, iPad and Mac (on the device that heard them), 200 on Apple TV and 50 on Apple Watch. Saved songs travel between your devices through iCloud when iCloud Sync is on, and the watch gets them from the iPhone (see [favorites, lists and sync](/guides/favorites-lists-and-sync.html)).

### Add hearted songs to Apple Music

Turn on "Love Songs in Apple Music" (iPhone and iPad: Settings, Apple Music section; Mac: Settings > General; Apple TV: Settings), or "Love in Apple Music" on the watch. Each song you heart is then added to your Apple Music library and marked as loved. It needs an Apple Music subscription, and songs missing from the Apple Music catalog are skipped. Removing a song from Saved Tracks never deletes it from your Apple Music library.

## How to turn on Auto Shazam

| Device | Setting | Default |
|---|---|---|
| iPhone, iPad | Settings > Playback > "Auto Shazam" | Off |
| Mac | Settings > General > "Auto Shazam" | Off |
| Apple TV | Settings > "Auto Identify Songs" | Off |
| Apple Watch | Settings > "Auto Shazam" | On |

Each device has its own switch, and the setting does not sync. On iPhone and iPad the first attempt starts as soon as you turn it on; on the Mac it starts with the next song or station change. CarPlay follows the iPhone. On Apple Watch, "Only on Wi-Fi" is on as well: automatic attempts then skip cellular and Low Data Mode connections, and they only name stations that send no song text at all. The Shazam button on the watch player works on any connection ([radio on Apple Watch](/guides/radio-on-apple-watch.html)).

## When Auto Shazam runs

Auto Shazam runs only while a station plays, and skips podcast episodes, recordings, and stations that already send the artist, title and cover.

- After a match it waits until the song should be over, using the song's length from Apple's iTunes catalog (about three and a half minutes when the length is unknown), then listens again.
- On a station where nothing has matched yet, it tries every 60 seconds for five tries, then every 5 minutes, until something matches or you change station.
- Automatic attempts are never closer than 12 seconds apart, and nothing is captured while you are paused.

An automatic match never replaces station text it disagrees with; it may only add the cover.

## Synced lyrics for the song you found

Once a song has a name, Macdio looks for its lyrics on LRCLIB, and timed lyrics follow the music line by line. Song ID knows how far into the song you tuned in, so the lyrics start on the right line even mid-song. Open them with the lyrics button at the bottom left of the iPhone and iPad full player, "Show Lyrics" in the Mac player panel, or "Lyrics" in Apple TV Now Playing. Apple Watch and CarPlay have no lyrics. See [synced lyrics](/features/synced-lyrics.html).

## Limits worth knowing

- Song ID needs an internet connection, and every attempt uses a little data.
- It is hidden while a podcast episode plays.
- If you paused with Live Pause and are more than about two and a half minutes behind live, Song ID waits until you are back near live.
- The Mac menu bar player has no Song ID button, and there is no Siri phrase for it.

## Frequently asked questions

### Does Macdio use the microphone to identify songs?

No. Macdio makes a short fingerprint of the stream it is already playing and sends only that fingerprint to Apple's Shazam catalog. The app never asks for microphone permission, so the phone can stay in your pocket.

### Why is the Shazam button greyed out?

The station already sends the artist, the title and the song's own cover, so Macdio uses the station's information and turns the button off for that song.

### Where do the songs I identify go?

Into Recently Heard on the Tracks screen. Tap the heart to keep a song in Saved Tracks, and turn on "Love Songs in Apple Music" if you want hearted songs in your Apple Music library too.

### Is Auto Shazam on by default?

It is off on iPhone, iPad, Mac and Apple TV. On Apple Watch it is on, together with "Only on Wi-Fi".

### Why did Song ID find a song but the title did not change?

When the station names its own song, Macdio keeps the station's text. A match that names a different song is dropped, and a match with the same artist only lends its album cover.

## Try it

Get Macdio on the [App Store](https://apps.apple.com/app/macdio/id6761737888), play a station that shows no song title, and press the Shazam button. The [Song ID page](/features/song-id.html) explains more. One purchase, every Apple device, no subscription.
