---
title: "Internetradio auf dem Mac aufnehmen: Schritt für Schritt"
description: "Drei Wege, Internetradio auf dem Mac aufzunehmen, und was auf dem iPhone geht: ein Player mit Aufnahme, ein Tool für den Systemton oder Audacity."
datePublished: 2026-08-09
lastUpdated: 2026-10-12
faq:
  - q: "Welche Qualität haben die Aufnahmen?"
    a: "Dieselbe wie der Stream. Der eingehende Ton wird so geschrieben, wie er ankommt, ohne neue Kodierung. Ein Sender mit 128 kbps ergibt eine Datei mit 128 kbps, ein Sender mit 320 kbps eine mit 320 kbps."
  - q: "Kann ich eine Aufnahme in den Finder oder die Dateien-App exportieren?"
    a: "Nein. Aufnahmen bleiben in der App auf deinem Gerät, wo du sie abspielen oder löschen kannst. Es gibt für sie kein Teilen, keinen Export und keine Dateisynchronisierung über iCloud."
  - q: "Kann ich aufnehmen, während ich andere Apps nutze?"
    a: "Ja. Die Aufnahme greift den Stream ab, nicht die Lautsprecher, sie läuft also auf Mac und iPhone im Hintergrund weiter, während du etwas anderes machst, auch bei ausgeschaltetem Bildschirm, solange der Sender weiterspielt."
  - q: "Kann ich auf der Apple Watch oder dem Apple TV aufnehmen?"
    a: "Nein. Aufnehmen ist eine Funktion für Mac, iPhone und iPad. Die Apps für Watch und TV spielen Sender und steuern die Wiedergabe."
  - q: "Wie nehme ich eine Radiosendung auf, die nachts läuft?"
    a: "Starte die Aufnahme, bevor du ins Bett gehst, und lass das Drei-Stunden-Limit sie beenden, oder erhöhe das Limit in den Einstellungen, wenn die Sendung länger ist. Einen Planer, der eine Aufnahme von selbst startet, gibt es nicht."
---

Drei Wege, was jeder dich kostet und wo die Dateien landen.

**Am einfachsten nimmst du Internetradio auf dem Mac mit einem Radioplayer auf, der die Aufnahme schon eingebaut hat, denn er speichert den Stream selbst und braucht kein Audio-Routing. Den ganzen Systemton mit einem Mitschnitt-Tool aufzunehmen funktioniert auch, und es ist die einzige Möglichkeit, wenn der Ton von einer Website oder aus einer App kommt, die nicht aufnehmen kann. Auf dem iPhone gibt es nur den eingebauten Weg.**

## Warum überhaupt Internetradio aufnehmen

Die meisten Wünsche laufen auf eins von drei Dingen hinaus: eine Sendung, die läuft, während du schläfst oder arbeitest, ein DJ-Set, das du behalten willst, weil es nirgends veröffentlicht wird, oder ein einzelner Titel, den du einmal gehört hast und wiederfinden willst. Streams sind live, und nichts wird für dich gespeichert. Wenn du es später haben willst, musst du es mitnehmen, während es vorbeizieht.

## Methode 1: mit einem Player aufnehmen, der es eingebaut hat

Ein Player mit Aufnahme schreibt den eingehenden Stream auf die Festplatte. Nichts wird neu kodiert, keine Systemtöne schleichen sich ein, und eine Mitteilung während der Aufnahme landet nicht in der Datei. [Macdio](/mac.html) macht das auf dem Mac und auf dem [iPhone](/iphone.html) mit derselben Taste.

Spiel einen Sender und drück auf Aufnehmen. Wähle „Durchgehend“ für eine Datei pro Sitzung oder „Nach Titel aufteilen“, damit die Sitzung bei jedem Songwechsel geschnitten wird. Lass es laufen, nutz andere Apps und drück auf Stopp, wenn du fertig bist. Die Sitzung erscheint sofort im Tab „Aufnahmen“.

„Nach Titel aufteilen“ ist der Teil, den du kennen solltest. Es beobachtet die Songinformationen, die im Stream mitkommen, und schneidet bei jedem Wechsel, so wird aus einer zweistündigen Sendung eine Liste benannter Titel mit Cover statt einer langen Datei, durch die du spulen musst. Schickt ein Sender nichts Brauchbares, und das tun viele, ermittelt Macdio den Song aus dem Ton, den es ohnehin hat, so geht die Benennung auch bei ausgeschaltetem Bildschirm weiter, ohne je nach Mikrofonzugriff zu fragen. Wie dieser Teil funktioniert, steht im [Ratgeber zur Songerkennung](/guides/identify-song-on-radio.html).

Der Haken: Eine eingebaute Aufnahme nimmt nur auf, was der Player abspielen kann. Sie erfasst Internetradio und sonst nichts, ein Videocall oder ein Browser-Tab liegt also außerhalb ihrer Reichweite.

## Methode 2: den ganzen Systemton mit Audio Hijack aufnehmen

Audio Hijack von Rogue Amoeba nimmt den Ton jeder Anwendung auf dem Mac auf, oder den gesamten Systemton auf einmal, und deckt damit Streams ab, die in einem Browser-Tab oder in einem Player ohne Aufnahme laufen. Version 4.6.0 läuft auf macOS 14.4 bis macOS 27 und lässt sich kostenlos laden, mit Einschränkungen, bis du eine Lizenz kaufst, laut der Produktseite von Rogue Amoeba (geprüft am 14. September 2026).

Du wählst die Quell-App, fügst einen Recorder-Block hinzu und drückst auf die Starttaste. Das ist mehr Einrichtung als eine Aufnahmetaste, und es gibt einen Haken, den du einplanen solltest: Alles, was der Mac abspielt, landet in der Datei. Eine Slack-Mitteilung in Minute vierzig bleibt für immer in der Aufnahme. Außerdem bekommst du eine lange Datei, ohne zu wissen, wo ein Song anfängt oder aufhört, die Arbeit an der Titelliste bleibt also hinterher an dir hängen.

## Methode 3: Audacity plus ein virtuelles Audiogerät

Audacity ist kostenlos und Open Source, deshalb ist es die übliche Antwort in Foren, aber macOS lässt eine App den Systemton nicht von sich aus aufnehmen. Du musst zuerst ein virtuelles Audiogerät installieren, etwa das kostenlose Open-Source-Tool BlackHole, die Ausgabe des Mac darüber leiten und dann Audacity auf dieses Gerät als Aufnahmequelle stellen. Du willst auch hören, was du aufnimmst, das heißt, du brauchst ein Gerät mit mehreren Ausgängen im Audio-MIDI-Setup, damit der Ton deine Lautsprecher und den Recorder erreicht.

Das funktioniert, kostet nichts und ist von den dreien das fummeligste. Der Vorteil: Audacity ist ein Editor, Schneiden, Ein- und Ausblenden und der Export in ein bestimmtes Format sind also gleich da, sobald die Aufnahme fertig ist.

## Welche Methode du nehmen solltest

Ist der Sender in einer Radio-App, nimm die Aufnahme der App. Nur dieser Weg gibt dir sauberen Ton und Aufteilung nach Titeln ohne zusätzliche Software. Kommt der Ton von woanders, oder nimmst du ein Podcast-Interview und gleichzeitig ein Musikbett auf, ist Audio Hijack das Werkzeug für genau diese Aufgabe. Audacity ist die Wahl, wenn das Budget null ist und ein Nachmittag Einrichtung in Ordnung geht.

## So nimmst du Radio auf dem iPhone auf

Hier gibt es nur die erste Methode. iOS gibt keiner App Zugriff auf den Systemton, ein iPhone-Gegenstück zu Audio Hijack gibt es also nicht, und eine Bildschirmaufnahme speichert auch keinen sauberen Stream. Ein Player mit eingebauter Aufnahme ist die ganze Liste.

In Macdio ist es dieselbe Taste wie auf dem Mac. Tipp auf Aufnehmen, während ein Sender läuft, und die Aufnahme läuft weiter, während du andere Apps nutzt, denn hier wird der Stream geschrieben, und kein Mikrofon hört zu. Aufnahmen erscheinen im Tab „Aufnahmen“, sobald du stoppst.

## Kannst du eine Aufnahme planen?

In Macdio nicht. Es gibt keinen Timer, der donnerstags um 21:00 einen Sender startet, und das steht auf der Wunschliste, nicht in der App. Auf dem Mac kommt Audio Hijack dem heute am nächsten, oder eine Kurzbefehle-Automation öffnet einen Sender zu einer festen Zeit, während du selbst auf Aufnehmen drückst.

Was Macdio hat, ist die umgekehrte Absicherung: Eine Sitzung stoppt nach drei Stunden von selbst, damit eine vergessene Aufnahme nicht über Nacht die Festplatte füllt. Das Limit lässt sich in den Einstellungen anpassen, wenn du eine lange Sendung mitschneidest, und die verbleibende Zeit wird während der Aufnahme angezeigt.

## Was eine Aufnahme vorzeitig beendet

Zwei Dinge beenden eine Sitzung vor dir, und beide sichern die Datei, statt sie zu verlieren. Das erste ist das Drei-Stunden-Limit oben. Das zweite ist der Speicher. Macdio startet keine Aufnahme mit weniger als 500 MB freiem Platz, beobachtet beim Schreiben den freien Platz, warnt dich alle fünf Minuten, sobald das Laufwerk unter 500 MB fällt, und stoppt die Aufnahme mit einer Mitteilung, wenn der Platz kritisch wird. Schlimmstenfalls bekommst du also eine kürzere Datei statt einer vollen Festplatte und einer kaputten Datei. Eine lange Nachtsitzung auf einem fast vollen Laptop ist der Fall, auf den du achten solltest, denn ein Sender mit 320 kbps schreibt etwa 144 MB pro Stunde.

## Wie groß werden die Dateien?

Eine Aufnahme ist so schwer wie der Stream, denn nichts wird hinzugefügt oder weiter komprimiert. Bei 128 kbps, der häufigsten Bitrate, sind das rund 58 MB pro Stunde, ein ganzer Radioabend also etwa 350 MB. Ein Sender mit 320 kbps liegt bei etwa 2,4 MB pro Minute, und ein Wortsender mit niedriger Bitrate kann bei einem Viertel davon liegen. „Nach Titel aufteilen“ macht die Rechnung in der Praxis freundlicher, weil du die drei Songs behältst, die du wolltest, und den Rest löschst.

## In welchem Format die Dateien sind

Eine Aufnahme behält, was der Sender schickt. Ein MP3-Sender ergibt eine .mp3, ein AAC-Sender eine .aac, ohne neue Kodierung auf dem Weg zur Festplatte, die Datei klingt also genau wie der Stream. Hat Song ID in einer AAC-Aufnahme einen Song erkannt, werden Titel, Künstler, Cover und Liedtext in die Datei geschrieben, und daraus wird eine .m4a. Hier gibt es keine Qualitätseinstellung, die du falsch setzen könntest, weil der Ton nie ein zweites Mal kodiert wird.

## Wo die Aufnahmen liegen

In der App, auf deinem eigenen Gerät, im Tab „Aufnahmen“, wo jede Sitzung und jeder geteilte Titel abgespielt oder gelöscht werden kann. Sie werden nicht in deine Musikmediathek kopiert, die App zeigt sie weder in der Dateien-App noch in deinen Finder-Ordnern, und es gibt keine Taste zum Teilen oder Exportieren. Das ist eine bewusste Grenze für eine private Aufnahmefunktion, nichts, was noch fertig werden müsste, und sie sorgt dafür, dass eine private Aufnahme privat bleibt. Nichts wird irgendwohin hochgeladen.

## Ist es legal, Internetradio aufzunehmen?

Eine Sendung für das eigene, private Hören aufzunehmen ist in den meisten Ländern seit Langem üblich, dieselbe Tradition wie früher UKW auf Kassette mitzuschneiden. Was privat bleibt, bleibt einfach: Verbreite oder veröffentliche die Aufnahmen nicht weiter, und prüf die Regeln deines eigenen Landes, wenn du unsicher bist. Das ist eine allgemeine Information und keine Rechtsberatung.

## Häufige Fragen

### Welche Qualität haben die Aufnahmen?

Dieselbe wie der Stream. Der eingehende Ton wird so geschrieben, wie er ankommt, ohne neue Kodierung. Ein Sender mit 128 kbps ergibt eine Datei mit 128 kbps, ein Sender mit 320 kbps eine mit 320 kbps.

### Kann ich eine Aufnahme in den Finder oder die Dateien-App exportieren?

Nein. Aufnahmen bleiben in der App auf deinem Gerät, wo du sie abspielen oder löschen kannst. Es gibt für sie kein Teilen, keinen Export und keine Dateisynchronisierung über iCloud.

### Kann ich aufnehmen, während ich andere Apps nutze?

Ja. Die Aufnahme greift den Stream ab, nicht die Lautsprecher, sie läuft also auf Mac und iPhone im Hintergrund weiter, während du etwas anderes machst, auch bei ausgeschaltetem Bildschirm, solange der Sender weiterspielt.

### Kann ich auf der Apple Watch oder dem Apple TV aufnehmen?

Nein. Aufnehmen ist eine Funktion für Mac, iPhone und iPad. Die Apps für Watch und TV spielen Sender und steuern die Wiedergabe.

### Wie nehme ich eine Radiosendung auf, die nachts läuft?

Starte die Aufnahme, bevor du ins Bett gehst, und lass das Drei-Stunden-Limit sie beenden, oder erhöhe das Limit in den Einstellungen, wenn die Sendung länger ist. Einen Planer, der eine Aufnahme von selbst startet, gibt es nicht.

## Willst du es ausprobieren?

Hol dir Macdio im [App Store](https://apps.apple.com/app/macdio/id6761737888). Ein Kauf, jedes Apple-Gerät, kein Abo.
