---
title: "How to Add Your Own Radio Station to Macdio by Stream URL"
description: "Add any internet radio stream to Macdio by its address on iPhone, iPad or Mac, test it, give it a logo, then edit or delete it. Apple TV uses a browser."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Which stream addresses does Macdio accept?"
    a: "Any http or https radio stream: MP3, AAC, HLS (.m3u8), playlist links ending in .pls, .m3u, .asx or .xspf, and old SHOUTcast servers. A podcast episode is not taken as a station."
  - q: "What if I only know the station's website?"
    a: "Paste the website into the address field and use Scan. Macdio lists the streams it finds there, each with a quality menu, and you pick one."
  - q: "Why does Macdio say \"Tap Add again to save it anyway\"?"
    a: "Macdio could not reach the stream when it checked the address. A second tap saves the station anyway, which helps when a station is only down for a while."
  - q: "Do my custom stations show up on my other devices?"
    a: "Yes. They sync through iCloud to your Mac, iPhone, iPad and Apple TV, and Apple Watch gets them from the iPhone."
  - q: "Can I give a custom station its own logo?"
    a: "Yes. Pick Auto, Link (an image address), My Image (a picture from Photos or Files) or None. Your own picture shows on all your devices."
---

You can add any internet radio station to Macdio by its stream address on iPhone, iPad and Mac. Tap "+" in Library, choose "Add Custom Station" (on the Mac, "Add Station…"), paste the URL, name the station and add it. Macdio checks that the address really sends audio before it saves, and the station then syncs through iCloud to your other devices, Apple TV included.

The directory has 60,000+ stations and still misses some, often small local ones. If you do not have the address yet, [how to find a station's stream URL](/guides/find-radio-stream-url.html) shows where to look.

## Quick steps

On iPhone or iPad:

1. Open Library and tap "+".
2. Choose "Add Custom Station".
3. Paste the address into "Stream URL or station website".
4. Tap "Scan" to confirm the stream and fill in the name, or type a "Station Name" yourself.
5. Tap "Add".

## Where is the add button on each device?

| Device | Where to find it | Button that saves |
|---|---|---|
| iPhone and iPad | Library, "+", "Add Custom Station", or Settings, "Custom Stations", "Add Custom Station" | "Add" |
| Mac | Library, "+", "Add Station…" | "Add Station" |
| Apple TV | Settings, "Edit on Computer", then a browser on the same Wi-Fi | "Save" in the browser |
| Apple Watch and CarPlay | No add form. They play stations from your library | |

On iPhone, Settings sits under More unless you moved it into the tab bar.

## How to add a station on iPhone or iPad

In the "Custom Station" sheet, "Scan" (or Return) checks what you typed into "Stream URL or station website". A stream is confirmed and an empty name filled in. A website gets a list of the streams on it, each with a quality menu and a "Use" button. "Logo", "Country" and comma separated "Tags" are optional. "Test Stream URL" answers "Stream is reachable!" when all is well. "Add" stays grey while the name or address is empty, or while a test or scan runs.

## How to add a station on the Mac

In Library, click "+" and choose "Add Station…". The sheet "Add Custom Station" has "Station Name", "Stream URL" with a "Scan" button, "Station Logo", "Country (optional)" and "Tags (comma separated, optional)". Once you type an address, "Test Stream" appears, and a good stream reports "Stream is reachable" with its codec and bitrate. Click "Add Station" or press Return.

## Which stream URLs work in Macdio?

- Addresses that start with http or https. Leave the start off and Macdio tries "https://" first, then plain "http://".
- Direct MP3 and AAC streams.
- HLS streams: an address ending in .m3u8, or a server that answers with an HLS playlist.
- Playlist links ending in .pls, .m3u, .asx or .xspf. Macdio opens the playlist and uses its first stream.
- SHOUTcast servers, old ones that answer "ICY 200 OK" included.

A file with a fixed length, such as a podcast episode or a jingle, is not accepted as a station.

## What Macdio checks when you tap Add

Something that cannot be an address gives "Invalid URL format. Please check the URL." A second station with the same name and the same address gives "A station with this name and URL already exists."

Then Macdio asks the server, waiting up to 6 seconds. If the address is a website, nothing is saved and the scan runs so you can pick one of its streams. If the server cannot be reached, you see the reason and "Tap Add again to save it anyway." (on the Mac, "Click Add again to save it anyway."). A second tap saves it.

The new station appears under "My Stations". It becomes a favorite only when you star it (see [favorites, lists and sync](/guides/favorites-lists-and-sync.html)).

## How to give a custom station a logo

The "Logo" control (on the Mac, "Station Logo") has four choices:

- "Auto" looks the station up on Logo.dev by its name and address.
- "Link" takes a direct link to an image file, the kind you get from Copy Image Address, ending in .png or .jpg. If you paste a page that carries the logo, Macdio swaps in the image when it can find it.
- "My Image" uses your own picture: "Photos" or "Files" on iPhone and iPad (iCloud Drive works), "Choose Image…" on the Mac. It is stored with the station, so it shows on all your devices.
- "None" draws Macdio's own artwork.

To change it later, long-press the station on iPhone or iPad, or right-click it on the Mac, and choose "Station Logo…". That works for directory stations too, with Auto, My Image and None. Link is only for stations you added yourself.

## How to edit or delete a custom station

On iPhone and iPad, long-press the station and choose "Edit Station", or swipe right on its row and tap "Edit". Change what you need and tap "Save". To delete it, swipe left on the row in "My Stations", tap "Remove" and confirm with "Delete". The confirmation says the station goes from every device and from every list it is in.

On the Mac, right-click the station and choose "Edit Station" (then "Save Changes") or "Delete Station", which also asks first.

Saving an edit does not test a changed address, so use the test button first. Directory stations cannot be edited, but "Rename…" (iPhone and iPad) and "Rename Station…" (Mac) give them your own name, and "Reset Name" brings the original back.

## Adding a station on Apple TV

The TV has no add form. Start "Edit on Computer" in its Settings and a browser on a computer on the same Wi-Fi gets a table of your own stations, Logo URL included ([step by step](/guides/edit-stations-on-computer.html)). Stations added on iPhone, iPad or Mac reach the TV through iCloud anyway.

## Limits worth knowing

- Adding a station needs a connection, because the check, the scan and the logo lookup all go online.
- A website scan can take up to a minute, and some sites hide their player so well that no stream is found.
- iPhone and iPad have no file import for station lists. For many stations at once, use Import in the [browser editor](/guides/edit-stations-on-computer.html).
- CarPlay and [Siri](/guides/siri-radio.html) find a custom station once it is a favorite or one you played recently. CarPlay also shows it inside your lists.

## Frequently asked questions

### Which stream addresses does Macdio accept?

Any http or https radio stream: MP3, AAC, HLS (.m3u8), playlist links ending in .pls, .m3u, .asx or .xspf, and old SHOUTcast servers. A podcast episode is not taken as a station.

### What if I only know the station's website?

Paste the website into the address field and use Scan. Macdio lists the streams it finds there, each with a quality menu, and you pick one.

### Why does Macdio say "Tap Add again to save it anyway"?

Macdio could not reach the stream when it checked the address. A second tap saves the station anyway, which helps when a station is only down for a while.

### Do my custom stations show up on my other devices?

Yes. They sync through iCloud to your Mac, iPhone, iPad and Apple TV, and Apple Watch gets them from the iPhone.

### Can I give a custom station its own logo?

Yes. Pick Auto, Link (an image address), My Image (a picture from Photos or Files) or None. Your own picture shows on all your devices.

## Try it

Get Macdio on the [App Store](https://apps.apple.com/app/macdio/id6761737888) and add the one station the directory does not have. One purchase covers iPhone, iPad, Mac, Apple TV and Apple Watch, with no subscription.
