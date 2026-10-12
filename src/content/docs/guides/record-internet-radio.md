---
title: "How to Record Internet Radio on a Mac (Step by Step)"
description: "Three ways to record internet radio on a Mac, and what works on iPhone: a player with recording built in, a system audio tool, or Audacity."
datePublished: 2026-08-09
lastUpdated: 2026-09-14
faq:
  - q: "What quality are the recordings?"
    a: "Identical to the stream. The incoming audio is written as it arrives with no re-encode, so a 128 kbps station gives a 128 kbps file and a 320 kbps station gives a 320 kbps file."
  - q: "Can I export a recording to Finder or the Files app?"
    a: "No. Recordings stay inside the app on your device, where you can play or delete them. There is no share, export or iCloud file sync for them."
  - q: "Can I record while using other apps?"
    a: "Yes. Recording captures the stream rather than the speakers, so it continues in the background on Mac and iPhone while you do something else, and with the screen off."
  - q: "Can I record on Apple Watch or Apple TV?"
    a: "No. Recording is a Mac, iPhone and iPad feature. The watch and TV apps play stations and control playback."
  - q: "How do I record a radio show that airs at night?"
    a: "Start the recording before you go to bed and let the three hour limit end it, or raise that limit in settings if the show is longer. There is no scheduler that starts a recording on its own."
---

Three ways to do it, what each one costs you, and where the files end up.

**The easiest way to record internet radio on a Mac is a radio player with recording built in, because it saves the stream itself and needs no audio routing. Recording the whole system with a capture tool works too, and it is the only option when the audio comes from a website or an app that cannot record. On an iPhone, only the built-in route exists.**

## Why record internet radio at all

Most requests come down to one of three things: a show that airs while you are asleep or at work, a DJ set you want to keep because it will never be posted anywhere, or a single track you heard once and want to find again. Streams are live and nothing is stored for you, so if you want it later, you have to catch it as it goes past.

## Method 1: record with a player that has it built in

A player that records writes the incoming stream to disk. Nothing is re-encoded, no system sounds leak in, and a notification during the recording does not end up in the file. [Macdio](/mac.html) does this on Mac and on [iPhone](/iphone.html) with the same button.

Play a station, then press record. Choose Continuous for one file per session, or Split by Track to have the session cut at every song change. Leave it running, use other apps, and press stop when you are done. The session appears in the Recordings tab straight away.

Split by Track is the part worth knowing about. It watches the song information arriving inside the stream and cuts at each change, so a two hour show becomes a list of named tracks with artwork instead of one long file you have to scrub through. When a station sends nothing useful, which plenty of them do, Macdio works the song out from the audio it already has in hand, so the naming keeps going with the screen off and without ever asking for microphone permission. The [song identification guide](/guides/identify-song-on-radio.html) covers how that part works.

The trade is that a built-in recorder only records what the player can play. It captures internet radio and nothing else, so a video call or a browser tab is out of scope.

## Method 2: capture the whole system with Audio Hijack

Audio Hijack from Rogue Amoeba records audio from any application on a Mac, or all the system audio at once, so it covers streams that live in a browser tab or in a player with no recorder. Version 4.6.0 runs on macOS 14.4 through macOS 27 and can be downloaded free, with limitations applied until you buy a licence, according to Rogue Amoeba's product page (checked 14 September 2026).

You pick the source application, add a recorder block, and press the run button. It is more setup than a record button, and there is a catch worth planning around: whatever the Mac plays lands in the file. A Slack notification at minute forty is in the recording for good. It also gives you one long file with no idea where a song starts or ends, so the tracklist work is yours to do afterwards.

## Method 3: Audacity plus a virtual audio device

Audacity is free and open source, which makes it the usual answer on forums, but macOS does not let an app record system audio on its own. You have to install a virtual audio device first, such as the free and open source BlackHole, route the Mac's output through it, then set Audacity to record from that device. You will also want to hear what you are recording, which means a multi-output device in Audio MIDI Setup so the sound reaches both your speakers and the recorder.

It works, it costs nothing, and it is the fiddliest of the three. The upside is that Audacity is an editor, so trimming, fading and exporting in a specific format are right there once the capture is done.

## Which method to use

If the station is in a radio app, use the app's own recorder. It is the only route that gives you clean audio and per-track splitting without extra software. If the audio is somewhere else, or you are recording a podcast interview and a music bed at the same time, Audio Hijack is the tool built for that job. Audacity is the choice when the budget is zero and an afternoon of setup is acceptable.

## How to record radio on an iPhone

Only the first method exists here. iOS gives no app access to system audio capture, so there is no iPhone equivalent of Audio Hijack, and screen recording will not save a clean stream either. A player with recording built in is the whole list.

In Macdio it is the same button as on the Mac. Tap record while a station plays, and the recording continues while you use other apps, because it is the stream being written rather than a microphone listening. Recordings appear in the Recordings tab as soon as you stop.

## Can you schedule a recording?

Not in Macdio. There is no timer that starts a station at 21:00 on Thursday, and it is on the request list rather than in the app. On a Mac, Audio Hijack is the closest thing available today, or a Shortcuts automation can open a station at a set time while you press record yourself.

What Macdio does have is the opposite guard: a session stops on its own after three hours, so a recording you forgot about does not eat the disk overnight. The limit is adjustable in settings when you are taping a long show, and the time left is shown while the recording runs.

## What stops a recording early

Two things end a session before you do, and both of them save the file rather than lose it. The first is the three hour limit above. The second is the disk. Macdio watches free space while it writes, warns you every five minutes once the drive drops under 500 MB, and stops the recording with a notification if space gets critical, so the worst case is a shorter file rather than a full disk and a corrupt one. A long overnight session on a nearly full laptop is the case to watch, because a 320 kbps station writes about 144 MB an hour.

## How large do the files get?

A recording is as heavy as the stream, since nothing is added or compressed further. At 128 kbps, the most common bitrate, that is roughly 58 MB an hour, so a full evening of radio is about 350 MB. A 320 kbps station is around 2.4 MB a minute, and a low bitrate talk station can be a quarter of that. Split by Track makes the arithmetic friendlier in practice, because you keep the three songs you wanted and delete the rest.

## What format the files are in

A recording keeps whatever the station sends. An MP3 station gives you an .mp3 and an AAC station gives you an .aac, with nothing re-encoded on the way to disk, so the file sounds exactly like the stream did. Tracks that Split by Track cuts out are written as .m4a. There is no quality setting to get wrong here, because there is no second encode.

## Where the recordings live

Inside the app, on your own device, in the Recordings tab where each session and each split track can be played or deleted. They are not copied into your music library, they do not appear in the Files app or Finder, and there is no share or export button. That is a deliberate limit for a personal recording feature, not something waiting to be finished, and it keeps a personal recording personal. Nothing is uploaded anywhere.

## Is recording internet radio legal?

Recording a broadcast for your own private listening is a long-standing practice in most countries, the same tradition as taping FM onto a cassette. What stays personal stays simple: do not redistribute or re-publish the recordings, and check your own country's rules if you are unsure. This is general information rather than legal advice.

## Frequently asked questions

### What quality are the recordings?

Identical to the stream. The incoming audio is written as it arrives with no re-encode, so a 128 kbps station gives a 128 kbps file and a 320 kbps station gives a 320 kbps file.

### Can I export a recording to Finder or the Files app?

No. Recordings stay inside the app on your device, where you can play or delete them. There is no share, export or iCloud file sync for them.

### Can I record while using other apps?

Yes. Recording captures the stream rather than the speakers, so it continues in the background on Mac and iPhone while you do something else, and with the screen off.

### Can I record on Apple Watch or Apple TV?

No. Recording is a Mac, iPhone and iPad feature. The watch and TV apps play stations and control playback.

### How do I record a radio show that airs at night?

Start the recording before you go to bed and let the three hour limit end it, or raise that limit in settings if the show is longer. There is no scheduler that starts a recording on its own.

## Ready to try it?

Get Macdio on the [App Store](https://apps.apple.com/app/macdio/id6761737888). One purchase, every Apple device, no subscription.
