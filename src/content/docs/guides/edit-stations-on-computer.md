---
title: "Edit Your Macdio Stations from a Computer Browser on Wi-Fi"
description: "Edit on Computer opens your own Macdio stations in a browser on the same Wi-Fi, from iPhone, iPad or Apple TV. Add, edit, import and export JSON, CSV or M3U."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Which devices have Edit on Computer?"
    a: "iPhone, iPad and Apple TV. The Mac has a keyboard already and edits stations in the app. Apple Watch and CarPlay do not have it."
  - q: "Why can't my computer open the address?"
    a: "Both devices must be on the same Wi-Fi, the editor screen must stay open, and on iPhone and iPad Macdio needs local network permission. The address can change at every start."
  - q: "Does the editor change stations from the directory?"
    a: "No. Only the stations you added yourself appear in the browser, and directory stations are never changed."
  - q: "Can I import an M3U playlist of stations?"
    a: "Yes. Paste the playlist text into Import, click Add to list, then Save. Import also takes JSON and CSV."
  - q: "Is the editor safe on a shared Wi-Fi?"
    a: "It needs a 6 digit code that is new at every start, closes after 5 wrong codes, and runs only while the editor screen is open. The connection is plain http inside your network."
  - q: "What happens to a station I remove in the browser?"
    a: "Once you click Save it is deleted on every device. Save replaces your custom station list with the table in the page, so reload the page first if you changed stations somewhere else."
---

Edit on Computer lets you manage the stations you added yourself from a browser on any computer on the same Wi-Fi, with a real keyboard. You start it in Macdio's Settings on iPhone, iPad or Apple TV, open the address it shows, type the 6 digit code, and get a table where you can add, edit, reorder, import and export your stations. Nothing goes through a server. The browser talks only to your device.

The Mac does not have it. There you add stations with "Add Station…" and edit them with a right-click, see [add a custom station](/guides/add-a-custom-station.html).

## Quick steps

1. On iPhone or iPad, open Settings, "Custom Stations", "Edit on Computer". On Apple TV, open Settings, go to the "Edit on Computer" card and choose "Open".
2. Start the editor: "Start the editor" on iPhone and iPad, "Start the Editor" on Apple TV.
3. Type the address shown on the device into a browser on your computer.
4. Enter the 6 digit code.
5. Make your changes and click "Save".

## How to start the editor on iPhone or iPad

Go to Settings, "Custom Stations", "Edit on Computer" (on iPhone, Settings sits under More unless you moved it into the tab bar) and tap "Start the editor". The first time, iOS asks whether Macdio may find devices on your local network. Allow it, or the browser cannot reach the iPhone or iPad.

Once it runs, the "Ready" section shows "On your computer, open" with the address, and "Then enter this code" with the code hidden as dots until you tap "Show". "Stop the editor" ends it.

## How to start the editor on Apple TV

Open Settings, go to the "Edit on Computer" card ("My Stations Editor") and choose "Open". On the "Edit on Computer" screen, press "Start the Editor".

The TV shows "Open this address" with the address in large type and "Then enter this code" with the 6 digits, always visible. "Stop the Editor", "Done" or the Menu button closes it. If it cannot start, "Try Again" is offered.

## What can you do in the browser?

The address is a plain http address made of the device's Wi-Fi address and a port number. The port is picked again at every start, so the address can differ from last time, and the code is new at every start too.

The page first asks for the code. A wrong one gives "That code did not work. Check the code on your device."

After that you see "My Stations" with a count, plus "Reload" and "Save". The toolbar has a filter field (by name, address or tag), "Add station", "Scan a website", "Import", "Export" and a button that sorts the table by name. The columns are a star, Name, Stream URL, Logo URL, Country and Tags.

Each row has a drag handle, a star that makes the station a favorite, "Logo" to find a logo, "Test" to ask your device whether the stream plays, and "✕" to remove the row. On a small screen, up and down arrows replace dragging. When two rows use the same address, the page marks them with "Another row uses this same address".

"Scan a website" uses the same finder as the app: it lists every channel on a station's site with a quality picker, and "Add selected" puts them in the table.

The order of the rows becomes the order of My Stations in the app. Nothing reaches your device until you click "Save", and the status then reads "Saved to device". From there the changes sync through iCloud to your other devices.

## How to import stations from JSON, CSV or M3U

"Import" takes text that you paste in:

- JSON: a list of stations, each with "name" and "streamURL", and optionally "logoURL", "country" and "tags".
- CSV: a header line `name,stream,logo,country,tags,favorite`, then one station per line.
- M3U: an `#EXTINF:-1,` line with the station name, followed by the stream address.

The buttons "Fill with a JSON example", "Fill with a CSV example" and "Fill with an M3U example" put a working sample in the box. This is the M3U one:

```
#EXTM3U
#EXTINF:-1,Radio Paradise
https://stream.radioparadise.com/aac-320
```

"Add to list" adds the rows to the table. They reach the device when you click "Save".

## How to export your stations

"Export" shows your stations as JSON, CSV and M3U on one screen and offers "JSON file", "CSV file" and "M3U file". The downloads are named macdio-stations.json, macdio-stations.csv and macdio-stations.m3u.

## What Save does to your station list

Save replaces your custom station list with the table in the page. Your device keeps the rows you see and deletes every station of yours that is not in the table, and iCloud carries that deletion to every device. In practice:

- A row you remove with "✕" is deleted on every device when you save, and the page does not ask first.
- If you added or changed stations on another device after this page loaded, click "Reload" before you edit. A save from an old page puts the old table back.
- Keep the address of every row, starting with http:// or https://. A row whose address is empty or lacks that start is dropped on Save, and the station it belonged to is deleted. The browser does not add "https://" for you the way the app does.

## When does the editor stop?

It runs only while you keep it open. It stops when you press stop, when you leave the editor screen, when Macdio goes to the background, or when you close the browser tab. It also stops when the browser has been silent for 2 minutes, when no browser connects within 5 minutes, and after 5 wrong codes. The screen of the phone or TV stays awake while it runs.

## Limits worth knowing

- Both devices must be on the same network.
- The table holds up to 500 stations, and one website scan runs at a time.
- Directory stations and your lists stay out of the editor. Change those in the app, see [favorites, lists and sync](/guides/favorites-lists-and-sync.html).
- The JSON from this page and the JSON from the Mac's "Export Stations…" are different formats. Read each one back with its own import.

## Frequently asked questions

### Which devices have Edit on Computer?

iPhone, iPad and Apple TV. The Mac has a keyboard already and edits stations in the app. Apple Watch and CarPlay do not have it.

### Why can't my computer open the address?

Both devices must be on the same Wi-Fi, the editor screen must stay open, and on iPhone and iPad Macdio needs local network permission. The address can change at every start.

### Does the editor change stations from the directory?

No. Only the stations you added yourself appear in the browser, and directory stations are never changed.

### Can I import an M3U playlist of stations?

Yes. Paste the playlist text into Import, click Add to list, then Save. Import also takes JSON and CSV.

### Is the editor safe on a shared Wi-Fi?

It needs a 6 digit code that is new at every start, closes after 5 wrong codes, and runs only while the editor screen is open. The connection is plain http inside your network.

### What happens to a station I remove in the browser?

Once you click Save it is deleted on every device. Save replaces your custom station list with the table in the page, so reload the page first if you changed stations somewhere else.

## Try it

Get Macdio on the [App Store](https://apps.apple.com/app/macdio/id6761737888), add a few stations, then open Edit on Computer on your iPhone, iPad or Apple TV. One purchase, every Apple device, no subscription.
