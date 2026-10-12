---
title: "Eigenen Radiosender per Stream-URL zu Macdio hinzufügen"
description: "Füge jeden Radiostream per Adresse zu Macdio hinzu, auf iPhone, iPad oder Mac: testen, Logo geben, bearbeiten, löschen. Apple TV nutzt den Browser."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Welche Stream-Adressen nimmt Macdio an?"
    a: "Jeden Radiostream über http oder https: MP3, AAC, HLS (.m3u8), Playlist-Links mit der Endung .pls, .m3u, .asx oder .xspf und alte SHOUTcast-Server. Eine Podcastfolge wird nicht als Sender angenommen."
  - q: "Was, wenn ich nur die Website des Senders kenne?"
    a: "Füge die Website in das Adressfeld ein und nutze Scannen. Macdio listet die Streams, die es dort findet, jeden mit einem Qualitätsmenü, und du wählst einen aus."
  - q: "Warum sagt Macdio „Tippe noch einmal auf Hinzufügen, um ihn trotzdem zu speichern“?"
    a: "Macdio hat den Stream beim Prüfen der Adresse nicht erreicht. Ein zweiter Tipp speichert den Sender trotzdem, was hilft, wenn ein Sender nur eine Weile ausgefallen ist."
  - q: "Erscheinen meine eigenen Sender auf meinen anderen Geräten?"
    a: "Ja. Sie werden über iCloud mit deinem Mac, iPhone, iPad und Apple TV synchronisiert, und die Apple Watch bekommt sie vom iPhone."
  - q: "Kann ich einem eigenen Sender ein eigenes Logo geben?"
    a: "Ja. Wähle Automatisch, Link (eine Bildadresse), Mein Bild (ein Bild aus Fotos oder Dateien) oder Keine. Dein eigenes Bild erscheint auf all deinen Geräten."
---

Du kannst jeden Internetradiosender über seine Stream-Adresse zu Macdio hinzufügen, auf iPhone, iPad und Mac. Tippe in der Bibliothek auf „+“, wähle „Benutzerdefinierten Sender hinzufügen“ (auf dem Mac „Sender hinzufügen…“), füge die URL ein, gib dem Sender einen Namen und füge ihn hinzu. Macdio prüft vor dem Speichern, ob die Adresse wirklich Audio sendet, und danach wird der Sender über iCloud mit deinen anderen Geräten synchronisiert, auch mit dem Apple TV.

Das Verzeichnis hat über 60.000 Sender und trotzdem fehlen einige, oft kleine lokale. Hast du die Adresse noch nicht, zeigt [Die Stream-URL eines Senders finden](/guides/find-radio-stream-url.html), wo du suchen kannst.

## Kurz und knapp

Auf iPhone oder iPad:

1. Öffne die Bibliothek und tippe auf „+“.
2. Wähle „Benutzerdefinierten Sender hinzufügen“.
3. Füge die Adresse in „Stream-Adresse oder Website des Senders“ ein.
4. Tippe auf „Scannen“, um den Stream zu bestätigen und den Namen auszufüllen, oder tippe selbst einen „Sendername“ ein.
5. Tippe auf „Hinzufügen“.

## Wo ist die Taste zum Hinzufügen auf jedem Gerät?

| Gerät | Wo du sie findest | Taste, die speichert |
|---|---|---|
| iPhone und iPad | Bibliothek, „+“, „Benutzerdefinierten Sender hinzufügen“, oder Einstellungen, „Eigene Sender“, „Benutzerdefinierten Sender hinzufügen“ | „Hinzufügen“ |
| Mac | Bibliothek, „+“, „Sender hinzufügen…“ | „Sender hinzufügen“ |
| Apple TV | Einstellungen, „Am Computer bearbeiten“, dann ein Browser im selben WLAN | „Save“ im Browser |
| Apple Watch und CarPlay | Kein Formular zum Hinzufügen. Sie spielen Sender aus deiner Bibliothek | |

Auf dem iPhone liegen die Einstellungen unter Mehr, außer du hast sie in die Tableiste geholt.

## So fügst du auf iPhone oder iPad einen Sender hinzu

Im Fenster „Benutzerdefinierter Sender“ prüft „Scannen“ (oder die Eingabetaste), was du in „Stream-Adresse oder Website des Senders“ eingetippt hast. Ein Stream wird bestätigt und ein leerer Name ausgefüllt. Bei einer Website bekommst du eine Liste der Streams darauf, jeden mit einem Qualitätsmenü und einer Taste „Verwenden“. „Logo“, „Land“ und kommagetrennte „Tags“ sind freiwillig. „Stream-URL testen“ antwortet mit „Stream ist erreichbar!“, wenn alles passt. „Hinzufügen“ bleibt grau, solange Name oder Adresse leer sind oder ein Test oder Scan läuft.

## So fügst du auf dem Mac einen Sender hinzu

Klick in der Bibliothek auf „+“ und wähle „Sender hinzufügen…“. Das Fenster „Benutzerdefinierten Sender hinzufügen“ hat „Sendername“, „Stream-URL“ mit einer Taste „Scannen“, „Senderlogo“, „Land (optional)“ und „Tags (kommagetrennt, optional)“. Sobald du eine Adresse eintippst, erscheint „Stream testen“, und ein funktionierender Stream meldet „Stream ist erreichbar“ mit Codec und Bitrate. Klick auf „Sender hinzufügen“ oder drück die Eingabetaste.

## Welche Stream-URLs funktionieren in Macdio?

- Adressen, die mit http oder https beginnen. Lässt du den Anfang weg, probiert Macdio zuerst „https://“, dann einfach „http://“.
- Direkte MP3- und AAC-Streams.
- HLS-Streams: eine Adresse mit der Endung .m3u8 oder ein Server, der mit einer HLS-Playlist antwortet.
- Playlist-Links mit der Endung .pls, .m3u, .asx oder .xspf. Macdio öffnet die Playlist und nimmt ihren ersten Stream.
- SHOUTcast-Server, auch alte, die mit „ICY 200 OK“ antworten.

Eine Datei mit fester Länge, etwa eine Podcastfolge oder ein Jingle, wird nicht als Sender angenommen.

## Was Macdio prüft, wenn du auf Hinzufügen tippst

Etwas, das keine Adresse sein kann, ergibt „Ungültiges URL-Format. Bitte prüfe die URL.“ Ein zweiter Sender mit demselben Namen und derselben Adresse ergibt „Ein Sender mit diesem Namen und dieser URL existiert bereits.“

Dann fragt Macdio beim Server nach und wartet bis zu 6 Sekunden. Ist die Adresse eine Website, wird nichts gespeichert, und der Scan läuft, damit du einen ihrer Streams auswählen kannst. Ist der Server nicht erreichbar, siehst du den Grund und „Tippe noch einmal auf Hinzufügen, um ihn trotzdem zu speichern.“ (auf dem Mac „Klick noch einmal auf Hinzufügen, um ihn trotzdem zu speichern.“). Ein zweiter Tipp speichert ihn.

Der neue Sender erscheint unter „Meine Sender“. Zum Favoriten wird er erst, wenn du ihm einen Stern gibst (siehe [Favoriten, Listen und Sync](/guides/favorites-lists-and-sync.html)).

## So gibst du einem eigenen Sender ein Logo

Die Auswahl „Logo“ (auf dem Mac „Senderlogo“) hat vier Möglichkeiten:

- „Automatisch“ sucht den Sender anhand von Name und Adresse bei Logo.dev.
- „Link“ nimmt einen direkten Link auf eine Bilddatei, so wie du ihn über Bildadresse kopieren bekommst, mit der Endung .png oder .jpg. Fügst du eine Seite ein, auf der das Logo steht, setzt Macdio das Bild ein, wenn es es findet.
- „Mein Bild“ nimmt dein eigenes Bild: „Fotos“ oder „Dateien“ auf iPhone und iPad (iCloud Drive funktioniert), „Bild auswählen…“ auf dem Mac. Es wird mit dem Sender gespeichert und erscheint deshalb auf all deinen Geräten.
- „Keine“ zeigt das eigene Artwork von Macdio.

Um es später zu ändern, halte den Sender auf iPhone oder iPad gedrückt oder klick auf dem Mac mit der rechten Maustaste darauf und wähle „Senderlogo…“. Das geht auch bei Sendern aus dem Verzeichnis, mit Automatisch, Mein Bild und Keine. Link gibt es nur für Sender, die du selbst hinzugefügt hast.

## So bearbeitest oder löschst du einen eigenen Sender

Auf iPhone und iPad hältst du den Sender gedrückt und wählst „Sender bearbeiten“, oder du wischst auf seiner Zeile nach rechts und tippst auf „Bearbeiten“. Ändere, was nötig ist, und tippe auf „Speichern“. Zum Löschen wischst du auf der Zeile in „Meine Sender“ nach links, tippst auf „Entfernen“ und bestätigst mit „Löschen“. Die Bestätigung sagt, dass der Sender von jedem Gerät und aus jeder Liste verschwindet, in der er steht.

Auf dem Mac klickst du mit der rechten Maustaste auf den Sender und wählst „Sender bearbeiten“ (dann „Änderungen sichern“) oder „Sender löschen“, das ebenfalls vorher nachfragt.

Beim Speichern einer Änderung wird eine geänderte Adresse nicht getestet, nutze also vorher die Testtaste. Sender aus dem Verzeichnis lassen sich nicht bearbeiten, aber „Umbenennen…“ (iPhone und iPad) und „Sender umbenennen …“ (Mac) geben ihnen deinen eigenen Namen, und „Namen zurücksetzen“ holt den ursprünglichen zurück.

## Einen Sender auf dem Apple TV hinzufügen

Der Fernseher hat kein Formular zum Hinzufügen. Starte „Am Computer bearbeiten“ in seinen Einstellungen, und ein Browser auf einem Computer im selben WLAN bekommt eine Tabelle deiner eigenen Sender, Logo-URL inklusive ([Schritt für Schritt](/guides/edit-stations-on-computer.html)). Sender, die du auf iPhone, iPad oder Mac hinzufügst, kommen ohnehin über iCloud auf den Fernseher.

## Grenzen, die du kennen solltest

- Zum Hinzufügen eines Senders brauchst du eine Verbindung, weil die Prüfung, der Scan und die Logosuche online laufen.
- Der Scan einer Website kann bis zu einer Minute dauern, und manche Seiten verstecken ihren Player so gut, dass kein Stream gefunden wird.
- iPhone und iPad haben keinen Dateiimport für Senderlisten. Für viele Sender auf einmal nimm den Import im [Editor im Browser](/guides/edit-stations-on-computer.html).
- CarPlay und [Siri](/guides/siri-radio.html) finden einen eigenen Sender, sobald er ein Favorit ist oder du ihn kürzlich gespielt hast. CarPlay zeigt ihn außerdem in deinen Listen.

## Häufige Fragen

### Welche Stream-Adressen nimmt Macdio an?

Jeden Radiostream über http oder https: MP3, AAC, HLS (.m3u8), Playlist-Links mit der Endung .pls, .m3u, .asx oder .xspf und alte SHOUTcast-Server. Eine Podcastfolge wird nicht als Sender angenommen.

### Was, wenn ich nur die Website des Senders kenne?

Füge die Website in das Adressfeld ein und nutze Scannen. Macdio listet die Streams, die es dort findet, jeden mit einem Qualitätsmenü, und du wählst einen aus.

### Warum sagt Macdio „Tippe noch einmal auf Hinzufügen, um ihn trotzdem zu speichern“?

Macdio hat den Stream beim Prüfen der Adresse nicht erreicht. Ein zweiter Tipp speichert den Sender trotzdem, was hilft, wenn ein Sender nur eine Weile ausgefallen ist.

### Erscheinen meine eigenen Sender auf meinen anderen Geräten?

Ja. Sie werden über iCloud mit deinem Mac, iPhone, iPad und Apple TV synchronisiert, und die Apple Watch bekommt sie vom iPhone.

### Kann ich einem eigenen Sender ein eigenes Logo geben?

Ja. Wähle Automatisch, Link (eine Bildadresse), Mein Bild (ein Bild aus Fotos oder Dateien) oder Keine. Dein eigenes Bild erscheint auf all deinen Geräten.

## Probier es aus

Hol dir Macdio im [App Store](https://apps.apple.com/app/macdio/id6761737888) und füge den einen Sender hinzu, der im Verzeichnis fehlt. Ein Kauf gilt für iPhone, iPad, Mac, Apple TV und Apple Watch, ohne Abo.
