---
title: "Macdio Shortcuts: Every Action, Plus Radio Automations"
description: "All nine Macdio actions in Apple's Shortcuts app, what each one does, and automations that start a station at 7:00 or play the newest podcast episode."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Which Macdio actions are in the Shortcuts app?"
    a: "Nine: Play Station, Play Favorites, Resume Radio, Stop Radio, Open Podcast, Play Latest Episode, Resume Podcast, Play Up Next and Mark This Moment. They are there on iPhone, iPad and Mac."
  - q: "Can Macdio start a radio station automatically every morning?"
    a: "Yes. Make a time of day automation in the Shortcuts app, add Macdio's Play Station action and pick the station. It runs at the time you set."
  - q: "Can a shortcut stop Macdio at a set time?"
    a: "Yes. Use the Stop Radio action in a time of day automation. It runs without opening the app. A station stops, and an episode pauses and keeps its place."
  - q: "Why is my station missing from the Shortcuts station picker?"
    a: "The picker only knows stations stored in your Macdio library: favorites, stations you added yourself and stations you have played. Play the station once or make it a favorite, then type its name in the picker."
  - q: "Why does the picker list the same station more than once?"
    a: "Each short spoken name gets its own row, so BBC Radio 1 can also appear as BBC 1 and BBC One. Every one of those rows plays the same station."
  - q: "Do Macdio shortcuts work on Apple TV or Apple Watch?"
    a: "No. The actions exist on iPhone, iPad and Mac. Apple TV and Apple Watch have no Macdio actions."
---

Macdio adds nine actions to Apple's Shortcuts app on iPhone, iPad and Mac. With them you can start a station, play your favorites, stop the radio or play a podcast from your own shortcuts and automations, for example a station that starts by itself at 7:00 on weekdays. Apple TV and Apple Watch have no Macdio actions.

## Quick steps

To start a station at a set time every morning on iPhone or iPad:

1. Open the Shortcuts app and go to Automation.
2. Create a new personal automation and choose the time of day trigger.
3. Set the time and the days, and let it run immediately.
4. Add an action, search for Macdio and choose "Play Station".
5. Tap "Station", pick your station and save.

The automation screens belong to Apple's Shortcuts app, not to Macdio, so their wording can differ a little between iOS versions. The Macdio parts ("Play Station" and its "Station" field) are always named as above.

## Every Macdio action in the Shortcuts app

| Action | What you choose | What it does | Opens Macdio |
|---|---|---|---|
| "Play Station" | "Station" | Plays that station. | Yes |
| "Play Favorites" | Nothing | Starts the first station in your own favorites order. Your other favorites become the list that next and previous move through. | Yes |
| "Resume Radio" | Nothing | Resumes a paused station or episode. If nothing is paused, it plays whichever you heard more recently, the last station or the last episode in progress. If you have never played anything, it starts your first favorite by name. | Yes |
| "Stop Radio" | Nothing | Stops a station. An episode pauses and keeps its place. | No |
| "Open Podcast" | "Podcast" | Opens that show's page in Macdio. | Yes |
| "Play Latest Episode" | "Podcast" | Plays the newest episode of that show. | No |
| "Resume Podcast" | Nothing | Resumes the episode you listened to last. | No |
| "Play Up Next" | Nothing | Plays the first item in Up Next. | No |
| "Mark This Moment" | Nothing | Saves the current second of the playing episode as a highlight, together with the sentence from its transcript. | No |

The actions marked No run in the background. "Play Latest Episode", "Resume Podcast" and "Play Up Next" play audio without bringing Macdio to the front, so they suit automations that should not take over the screen. More about highlights is in [podcast transcripts and highlights](/guides/podcast-transcripts-and-highlights.html).

## How the station picker finds your stations

When you tap "Station" in "Play Station", Macdio suggests up to 20 stations: your favorites first, A to Z, then the stations you played most recently. Each station also shows its short spoken names as separate rows with the full name underneath, so "BBC Radio 1", "BBC 1" and "BBC One" can all appear. They all play the same station.

Typing in the picker searches every station in your Macdio library by name and shows up to 20 matches. Your library means your favorites, the stations you added yourself and the stations you have played. A directory station you have never opened is not in it yet, so play it once or make it a favorite first. If you need a stream that is not in the directory at all, see [how to add a custom station](/guides/add-a-custom-station.html).

The "Podcast" picker in "Open Podcast" and "Play Latest Episode" lists the shows you subscribe to, again with short names as extra rows.

## Three automations worth setting up

### Start your morning station

Follow the quick steps above. If you use "Play Favorites" instead of "Play Station", the rest of your favorites line up behind the first one, and a double press on your AirPods moves to the next favorite. The [AirPods and headphone controls guide](/guides/airpods-and-headphone-controls.html) explains how that list works.

For the other end of the day, a second time of day automation with "Stop Radio" stops the radio at midnight without opening the app. Macdio's own sleep timer does the same job from inside the player, see [sleep timer and Clock Mode](/guides/sleep-timer-and-clock-mode.html).

### Play a station when a Focus turns on

The Shortcuts app can run an automation when a Focus turns on or off. This trigger is Apple's, so look for it in the list of personal automation triggers. Choose your Work Focus, set it to run when the Focus turns on, and add "Play Station" with the station you like to work to. A second automation for when the Focus turns off, with "Stop Radio", ends it again.

### Hear the newest episode of a show every morning

Make a time of day automation and add "Play Latest Episode", then pick the show. It plays the show's newest full episode without opening Macdio. If the feed was last checked more than an hour ago, Macdio refreshes it first, but waits only about 6 seconds. If the refresh takes longer, it plays the newest episode it already knows. Only shows you subscribe to can be picked; [podcasts in Macdio](/guides/podcasts-in-macdio.html) covers subscribing.

## Does it work on the Mac?

Yes. The same nine actions appear in the Shortcuts app on the Mac, and they control the Mac's player. You can put them in any shortcut you build there.

## Where are the Siri phrases?

Every action above also answers to spoken phrases, such as "Play [station] on Macdio" or "Stop Macdio". The full list, with the languages they work in, is in the [Siri guide](/guides/siri-radio.html).

## Limits worth knowing

- There are no Macdio actions on Apple TV or Apple Watch.
- Only stations in your library can be picked. If you later delete a station, a saved shortcut that plays it can no longer find it, so pick the station again.
- "Mark This Moment" needs an episode that is playing and has a transcript. Otherwise it answers "No episode is playing." or "This episode has no transcript yet, so there is no sentence to mark."
- Right after the app starts, an action can answer "Macdio is still starting. Try again in a moment."
- When and how an automation runs, for example with the iPhone locked, is decided by iOS. Try a new automation once at a moment you are watching, so you know it starts the way you expect.

## Frequently asked questions

### Which Macdio actions are in the Shortcuts app?

Nine: "Play Station", "Play Favorites", "Resume Radio", "Stop Radio", "Open Podcast", "Play Latest Episode", "Resume Podcast", "Play Up Next" and "Mark This Moment". They are there on iPhone, iPad and Mac.

### Can Macdio start a radio station automatically every morning?

Yes. Make a time of day automation in the Shortcuts app, add Macdio's "Play Station" action and pick the station. It runs at the time you set.

### Can a shortcut stop Macdio at a set time?

Yes. Use the "Stop Radio" action in a time of day automation. It runs without opening the app. A station stops, and an episode pauses and keeps its place.

### Why is my station missing from the Shortcuts station picker?

The picker only knows stations stored in your Macdio library: favorites, stations you added yourself and stations you have played. Play the station once or make it a favorite, then type its name in the picker.

### Why does the picker list the same station more than once?

Each short spoken name gets its own row, so BBC Radio 1 can also appear as BBC 1 and BBC One. Every one of those rows plays the same station.

### Do Macdio shortcuts work on Apple TV or Apple Watch?

No. The actions exist on iPhone, iPad and Mac. Apple TV and Apple Watch have no Macdio actions.

## Try it

Get Macdio on the [App Store](https://apps.apple.com/app/macdio/id6761737888), play a station once, then build your first automation around it. One purchase covers every Apple device, with no subscription.
