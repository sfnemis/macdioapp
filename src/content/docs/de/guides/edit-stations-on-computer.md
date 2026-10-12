---
title: "Macdio-Sender im Browser am Computer bearbeiten, über WLAN"
description: "Am Computer bearbeiten öffnet deine eigenen Macdio-Sender im Browser im selben WLAN, von iPhone, iPad oder Apple TV aus. Hinzufügen, ändern, JSON, CSV, M3U."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Welche Geräte haben Am Computer bearbeiten?"
    a: "iPhone, iPad und Apple TV. Der Mac hat schon eine Tastatur und bearbeitet Sender in der App. Apple Watch und CarPlay haben es nicht."
  - q: "Warum kann mein Computer die Adresse nicht öffnen?"
    a: "Beide Geräte müssen im selben WLAN sein, der Editor-Bildschirm muss offen bleiben, und auf iPhone und iPad braucht Macdio die Erlaubnis für das lokale Netzwerk. Die Adresse kann sich bei jedem Start ändern."
  - q: "Ändert der Editor Sender aus dem Verzeichnis?"
    a: "Nein. Im Browser erscheinen nur die Sender, die du selbst hinzugefügt hast, und Sender aus dem Verzeichnis werden nie geändert."
  - q: "Kann ich eine M3U-Playlist mit Sendern importieren?"
    a: "Ja. Füge den Text der Playlist in Import ein, klick auf Add to list und dann auf Save. Import nimmt auch JSON und CSV."
  - q: "Ist der Editor in einem geteilten WLAN sicher?"
    a: "Er braucht einen 6-stelligen Code, der bei jedem Start neu ist, schließt nach 5 falschen Codes und läuft nur, solange der Editor-Bildschirm offen ist. Die Verbindung ist einfaches http innerhalb deines Netzwerks."
  - q: "Was passiert mit einem Sender, den ich im Browser entferne?"
    a: "Sobald du auf Save klickst, wird er auf jedem Gerät gelöscht. Save ersetzt deine Liste eigener Sender durch die Tabelle auf der Seite, lade die Seite also zuerst neu, wenn du woanders Sender geändert hast."
---

Mit Am Computer bearbeiten verwaltest du die Sender, die du selbst hinzugefügt hast, in einem Browser auf einem beliebigen Computer im selben WLAN, mit einer echten Tastatur. Du startest es in den Einstellungen von Macdio auf iPhone, iPad oder Apple TV, öffnest die angezeigte Adresse, gibst den 6-stelligen Code ein und bekommst eine Tabelle, in der du deine Sender hinzufügen, bearbeiten, sortieren, importieren und exportieren kannst. Nichts läuft über einen Server. Der Browser spricht nur mit deinem Gerät.

Der Mac hat es nicht. Dort fügst du Sender mit „Sender hinzufügen…“ hinzu und bearbeitest sie per Rechtsklick, siehe [eigenen Sender hinzufügen](/guides/add-a-custom-station.html).

## Kurz und knapp

1. Öffne auf iPhone oder iPad Einstellungen, „Eigene Sender“, „Am Computer bearbeiten“. Auf dem Apple TV öffnest du die Einstellungen, gehst zur Karte „Am Computer bearbeiten“ und wählst „Öffnen“.
2. Starte den Editor: „Editor starten“ auf iPhone, iPad und Apple TV.
3. Tippe die Adresse, die das Gerät zeigt, in einen Browser auf deinem Computer.
4. Gib den 6-stelligen Code ein.
5. Nimm deine Änderungen vor und klick auf „Save“.

## So startest du den Editor auf iPhone oder iPad

Geh zu Einstellungen, „Eigene Sender“, „Am Computer bearbeiten“ (auf dem iPhone liegen die Einstellungen unter Mehr, außer du hast sie in die Tableiste geholt) und tippe auf „Editor starten“. Beim ersten Mal fragt iOS, ob Macdio Geräte in deinem lokalen Netzwerk finden darf. Erlaube es, sonst erreicht der Browser das iPhone oder iPad nicht.

Sobald er läuft, zeigt der Bereich „Bereit“ unter „Öffne auf deinem Computer“ die Adresse und unter „Gib dann diesen Code ein“ den Code, der als Punkte verborgen bleibt, bis du auf „Einblenden“ tippst. „Editor stoppen“ beendet ihn.

## So startest du den Editor auf dem Apple TV

Öffne die Einstellungen, geh zur Karte „Am Computer bearbeiten“ („Editor für meine Sender“) und wähle „Öffnen“. Drück auf dem Bildschirm „Am Computer bearbeiten“ die Taste „Editor starten“.

Der Fernseher zeigt „Diese Adresse öffnen“ mit der Adresse in großer Schrift und „Dann diesen Code eingeben“ mit den 6 Ziffern, immer sichtbar. „Editor beenden“, „Fertig“ oder die Menu-Taste schließen ihn. Kann er nicht starten, wird „Erneut versuchen“ angeboten.

## Was kannst du im Browser machen?

Die Adresse ist eine einfache http-Adresse aus der WLAN-Adresse des Geräts und einer Portnummer. Der Port wird bei jedem Start neu gewählt, die Adresse kann also anders sein als beim letzten Mal, und auch der Code ist bei jedem Start neu.

Die Seite ist auf Englisch und fragt zuerst nach dem Code. Ein falscher ergibt „That code did not work. Check the code on your device.“

Danach siehst du „My Stations“ mit einer Anzahl, dazu „Reload“ und „Save“. Die Werkzeugleiste hat ein Filterfeld (nach Name, Adresse oder Tag), „Add station“, „Scan a website“, „Import“, „Export“ und eine Taste, die die Tabelle nach Namen sortiert. Die Spalten sind ein Stern, Name, Stream URL, Logo URL, Country und Tags.

Jede Zeile hat einen Griff zum Ziehen, einen Stern, der den Sender zum Favoriten macht, „Logo“, um ein Logo zu finden, „Test“, um dein Gerät zu fragen, ob der Stream spielt, und „✕“, um die Zeile zu entfernen. Auf einem kleinen Bildschirm ersetzen Pfeile nach oben und unten das Ziehen. Nutzen zwei Zeilen dieselbe Adresse, markiert die Seite sie mit „Another row uses this same address“.

„Scan a website“ nutzt dieselbe Suche wie die App: Es listet jeden Kanal auf der Website eines Senders mit einer Qualitätsauswahl, und „Add selected“ übernimmt sie in die Tabelle.

Die Reihenfolge der Zeilen wird zur Reihenfolge von Meine Sender in der App. Nichts kommt auf dein Gerät, bevor du auf „Save“ klickst, und der Status lautet dann „Saved to device“. Von dort werden die Änderungen über iCloud mit deinen anderen Geräten synchronisiert.

## So importierst du Sender aus JSON, CSV oder M3U

„Import“ nimmt Text, den du einfügst:

- JSON: eine Liste von Sendern, jeder mit „name“ und „streamURL“, wahlweise auch „logoURL“, „country“ und „tags“.
- CSV: eine Kopfzeile `name,stream,logo,country,tags,favorite`, dann ein Sender pro Zeile.
- M3U: eine Zeile `#EXTINF:-1,` mit dem Sendernamen, gefolgt von der Stream-Adresse.

Die Tasten „Fill with a JSON example“, „Fill with a CSV example“ und „Fill with an M3U example“ setzen ein funktionierendes Beispiel in das Feld. Das hier ist das M3U-Beispiel:

```
#EXTM3U
#EXTINF:-1,Radio Paradise
https://stream.radioparadise.com/aac-320
```

„Add to list“ fügt die Zeilen zur Tabelle hinzu. Auf das Gerät kommen sie, wenn du auf „Save“ klickst.

## So exportierst du deine Sender

„Export“ zeigt deine Sender als JSON, CSV und M3U auf einem Bildschirm und bietet „JSON file“, „CSV file“ und „M3U file“ an. Die Downloads heißen macdio-stations.json, macdio-stations.csv und macdio-stations.m3u.

## Was Save mit deiner Senderliste macht

Save ersetzt deine Liste eigener Sender durch die Tabelle auf der Seite. Dein Gerät behält die Zeilen, die du siehst, und löscht jeden deiner Sender, der nicht in der Tabelle steht, und iCloud trägt diese Löschung auf jedes Gerät. In der Praxis heißt das:

- Eine Zeile, die du mit „✕“ entfernst, wird beim Speichern auf jedem Gerät gelöscht, und die Seite fragt nicht vorher nach.
- Hast du auf einem anderen Gerät Sender hinzugefügt oder geändert, nachdem diese Seite geladen wurde, klick vor dem Bearbeiten auf „Reload“. Speichern von einer alten Seite holt die alte Tabelle zurück.
- Lass die Adresse jeder Zeile stehen, beginnend mit http:// oder https://. Eine Zeile, deren Adresse leer ist oder nicht so beginnt, fällt beim Speichern weg, und der Sender, zu dem sie gehörte, wird gelöscht. Der Browser ergänzt „https://“ nicht für dich, so wie es die App tut.

## Wann hört der Editor auf?

Er läuft nur, solange du ihn offen hältst. Er stoppt, wenn du auf Stopp drückst, wenn du den Editor-Bildschirm verlässt, wenn Macdio in den Hintergrund geht oder wenn du den Browser-Tab schließt. Er stoppt auch, wenn der Browser 2 Minuten lang still war, wenn sich innerhalb von 5 Minuten kein Browser verbindet, und nach 5 falschen Codes. Der Bildschirm von Telefon oder Fernseher bleibt wach, solange er läuft.

## Grenzen, die du kennen solltest

- Beide Geräte müssen im selben Netzwerk sein.
- Die Tabelle fasst bis zu 500 Sender, und es läuft immer nur ein Website-Scan auf einmal.
- Sender aus dem Verzeichnis und deine Listen bleiben aus dem Editor heraus. Die änderst du in der App, siehe [Favoriten, Listen und Sync](/guides/favorites-lists-and-sync.html).
- Das JSON von dieser Seite und das JSON aus „Sender exportieren…“ auf dem Mac sind verschiedene Formate. Lies jedes mit seinem eigenen Import wieder ein.

## Häufige Fragen

### Welche Geräte haben Am Computer bearbeiten?

iPhone, iPad und Apple TV. Der Mac hat schon eine Tastatur und bearbeitet Sender in der App. Apple Watch und CarPlay haben es nicht.

### Warum kann mein Computer die Adresse nicht öffnen?

Beide Geräte müssen im selben WLAN sein, der Editor-Bildschirm muss offen bleiben, und auf iPhone und iPad braucht Macdio die Erlaubnis für das lokale Netzwerk. Die Adresse kann sich bei jedem Start ändern.

### Ändert der Editor Sender aus dem Verzeichnis?

Nein. Im Browser erscheinen nur die Sender, die du selbst hinzugefügt hast, und Sender aus dem Verzeichnis werden nie geändert.

### Kann ich eine M3U-Playlist mit Sendern importieren?

Ja. Füge den Text der Playlist in Import ein, klick auf Add to list und dann auf Save. Import nimmt auch JSON und CSV.

### Ist der Editor in einem geteilten WLAN sicher?

Er braucht einen 6-stelligen Code, der bei jedem Start neu ist, schließt nach 5 falschen Codes und läuft nur, solange der Editor-Bildschirm offen ist. Die Verbindung ist einfaches http innerhalb deines Netzwerks.

### Was passiert mit einem Sender, den ich im Browser entferne?

Sobald du auf Save klickst, wird er auf jedem Gerät gelöscht. Save ersetzt deine Liste eigener Sender durch die Tabelle auf der Seite, lade die Seite also zuerst neu, wenn du woanders Sender geändert hast.

## Probier es aus

Hol dir Macdio im [App Store](https://apps.apple.com/app/macdio/id6761737888), füge ein paar Sender hinzu und öffne dann Am Computer bearbeiten auf deinem iPhone, iPad oder Apple TV. Ein Kauf, jedes Apple-Gerät, kein Abo.
