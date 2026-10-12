---
title: "Je Macdio-zenders bewerken in een browser op je computer"
description: "Bewerken op de computer opent je eigen zenders in een browser op hetzelfde wifi, vanaf iPhone, iPad of Apple TV. Toevoegen, wijzigen, JSON, CSV of M3U."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Welke apparaten hebben Bewerken op de computer?"
    a: "iPhone, iPad en Apple TV. De Mac heeft al een toetsenbord en bewerkt zenders in de app. Apple Watch en CarPlay hebben het niet."
  - q: "Waarom kan mijn computer het adres niet openen?"
    a: "Beide apparaten moeten in hetzelfde wifinetwerk zitten, het editorscherm moet open blijven, en op iPhone en iPad heeft Macdio toestemming voor het lokale netwerk nodig. Het adres kan bij elke start veranderen."
  - q: "Wijzigt de editor zenders uit de catalogus?"
    a: "Nee. Alleen de zenders die je zelf hebt toegevoegd verschijnen in de browser, en zenders uit de catalogus worden nooit gewijzigd."
  - q: "Kan ik een M3U-playlist met zenders importeren?"
    a: "Ja. Plak de tekst van de playlist in Import, klik op Add to list en daarna op Save. Import neemt ook JSON en CSV aan."
  - q: "Is de editor veilig op een gedeeld wifinetwerk?"
    a: "Hij vraagt een code van 6 cijfers die bij elke start nieuw is, sluit na 5 foute codes en draait alleen zolang het editorscherm open is. De verbinding is gewoon http binnen je netwerk."
  - q: "Wat gebeurt er met een zender die ik in de browser weghaal?"
    a: "Zodra je op Save klikt, wordt hij op elk apparaat verwijderd. Save vervangt je lijst met eigen zenders door de tabel op de pagina, dus laad de pagina eerst opnieuw als je ergens anders zenders hebt gewijzigd."
---

Met Bewerken op de computer beheer je de zenders die je zelf hebt toegevoegd vanuit een browser op elke computer in hetzelfde wifinetwerk, met een echt toetsenbord. Je start het in de instellingen van Macdio op iPhone, iPad of Apple TV, opent het adres dat het toont, typt de code van 6 cijfers en krijgt een tabel waarin je zenders kunt toevoegen, wijzigen, herschikken, importeren en exporteren. Er gaat niets via een server. De browser praat alleen met je apparaat.

De Mac heeft het niet. Daar voeg je zenders toe met "Zender toevoegen…" en bewerk je ze met de rechtermuisknop, zie [een eigen zender toevoegen](/guides/add-a-custom-station.html).

## In het kort

1. Open op iPhone of iPad Instellingen, "Aangepaste Stations", "Bewerken op de computer". Open op Apple TV Instellingen, ga naar de kaart "Bewerken op de computer" en kies "Open".
2. Start de editor: "Editor starten" op iPhone, iPad en Apple TV.
3. Typ het adres dat het apparaat toont in een browser op je computer.
4. Vul de code van 6 cijfers in.
5. Breng je wijzigingen aan en klik op "Save".

## Zo start je de editor op iPhone of iPad

Ga naar Instellingen, "Aangepaste Stations", "Bewerken op de computer" (op de iPhone staat Instellingen onder Meer, tenzij je het naar de tabbalk hebt verplaatst) en tik op "Editor starten". De eerste keer vraagt iOS of Macdio apparaten in je lokale netwerk mag zoeken. Sta dat toe, anders kan de browser de iPhone of iPad niet bereiken.

Zodra hij draait, toont het onderdeel "Klaar" de regel "Open op je computer" met het adres, en "Vul daarna deze code in" met de code als puntjes tot je op "Toon" tikt. "Editor stoppen" beëindigt hem.

## Zo start je de editor op Apple TV

Open Instellingen, ga naar de kaart "Bewerken op de computer" ("Editor voor mijn zenders") en kies "Open". Druk in het scherm "Bewerken op de computer" op "Editor starten".

De TV toont "Open dit adres" met het adres in grote letters en "Voer daarna deze code in" met de 6 cijfers, altijd zichtbaar. "Editor stoppen", "Gereed" of de Menu-knop sluit hem. Kan hij niet starten, dan krijg je "Probeer opnieuw".

## Wat kun je doen in de browser?

Het adres is een gewoon http-adres, gemaakt van het wifi-adres van het apparaat en een poortnummer. De poort wordt bij elke start opnieuw gekozen, dus het adres kan anders zijn dan de vorige keer, en de code is ook bij elke start nieuw.

De pagina in de browser is in het Engels, dus de knoppen hieronder staan zoals je ze daar ziet. De pagina vraagt eerst om de code. Een foute code geeft "That code did not work. Check the code on your device." (de code werkte niet, kijk op je apparaat).

Daarna zie je "My Stations" met het aantal, plus "Reload" en "Save". De werkbalk heeft een filterveld (op naam, adres of tag), "Add station", "Scan a website", "Import", "Export" en een knop die de tabel op naam sorteert. De kolommen zijn een ster, Name, Stream URL, Logo URL, Country en Tags.

Elke rij heeft een sleepgreep, een ster die de zender een favoriet maakt, "Logo" om een logo te zoeken, "Test" om je apparaat te vragen of de stream speelt, en "✕" om de rij weg te halen. Op een klein scherm vervangen pijltjes omhoog en omlaag het slepen. Gebruiken twee rijen hetzelfde adres, dan markeert de pagina ze met "Another row uses this same address".

"Scan a website" gebruikt dezelfde zoeker als de app: hij toont elk kanaal op de site van een zender met een kwaliteitskeuze, en "Add selected" zet ze in de tabel.

De volgorde van de rijen wordt de volgorde van Mijn zenders in de app. Er komt niets op je apparaat tot je op "Save" klikt, en dan staat er "Saved to device". Vanaf daar synchroniseren de wijzigingen via iCloud naar je andere apparaten.

## Zo importeer je zenders uit JSON, CSV of M3U

"Import" neemt tekst aan die je erin plakt:

- JSON: een lijst met zenders, elk met "name" en "streamURL", en optioneel "logoURL", "country" en "tags".
- CSV: een kopregel `name,stream,logo,country,tags,favorite`, daarna één zender per regel.
- M3U: een regel `#EXTINF:-1,` met de naam van de zender, gevolgd door het streamadres.

De knoppen "Fill with a JSON example", "Fill with a CSV example" en "Fill with an M3U example" zetten een werkend voorbeeld in het vak. Dit is het M3U-voorbeeld:

```
#EXTM3U
#EXTINF:-1,Radio Paradise
https://stream.radioparadise.com/aac-320
```

"Add to list" voegt de rijen toe aan de tabel. Ze komen op het apparaat als je op "Save" klikt.

## Zo exporteer je je zenders

"Export" toont je zenders als JSON, CSV en M3U op één scherm en biedt "JSON file", "CSV file" en "M3U file". De downloads heten macdio-stations.json, macdio-stations.csv en macdio-stations.m3u.

## Wat Save met je zenderlijst doet

Save vervangt je lijst met eigen zenders door de tabel op de pagina. Je apparaat houdt de rijen die je ziet en verwijdert elke eigen zender die niet in de tabel staat, en iCloud brengt die verwijdering naar elk apparaat. In de praktijk:

- Een rij die je met "✕" weghaalt, wordt bij het bewaren op elk apparaat verwijderd, en de pagina vraagt het niet eerst.
- Heb je op een ander apparaat zenders toegevoegd of gewijzigd nadat deze pagina geladen is, klik dan op "Reload" voordat je gaat bewerken. Bewaren vanaf een oude pagina zet de oude tabel terug.
- Laat het adres in elke rij staan, beginnend met http:// of https://. Een rij met een leeg adres, of zonder dat begin, valt weg bij Save, en de zender die erbij hoorde wordt verwijderd. De browser zet er niet vanzelf "https://" voor, zoals de app wel doet.

## Wanneer stopt de editor?

Hij draait alleen zolang je hem open houdt. Hij stopt als je op stoppen drukt, als je het editorscherm verlaat, als Macdio naar de achtergrond gaat of als je het browsertabblad sluit. Hij stopt ook als de browser 2 minuten niets van zich laat horen, als er binnen 5 minuten geen browser verbinding maakt, en na 5 foute codes. Het scherm van de telefoon of TV blijft aan zolang hij draait.

## Grenzen om te kennen

- Beide apparaten moeten in hetzelfde netwerk zitten.
- De tabel kan tot 500 zenders bevatten, en er loopt één websitescan tegelijk.
- Zenders uit de catalogus en je lijsten blijven buiten de editor. Die wijzig je in de app, zie [favorieten, lijsten en synchronisatie](/guides/favorites-lists-and-sync.html).
- De JSON van deze pagina en de JSON van "Zenders exporteren…" op de Mac zijn verschillende formaten. Lees elk terug met zijn eigen import.

## Veelgestelde vragen

### Welke apparaten hebben Bewerken op de computer?

iPhone, iPad en Apple TV. De Mac heeft al een toetsenbord en bewerkt zenders in de app. Apple Watch en CarPlay hebben het niet.

### Waarom kan mijn computer het adres niet openen?

Beide apparaten moeten in hetzelfde wifinetwerk zitten, het editorscherm moet open blijven, en op iPhone en iPad heeft Macdio toestemming voor het lokale netwerk nodig. Het adres kan bij elke start veranderen.

### Wijzigt de editor zenders uit de catalogus?

Nee. Alleen de zenders die je zelf hebt toegevoegd verschijnen in de browser, en zenders uit de catalogus worden nooit gewijzigd.

### Kan ik een M3U-playlist met zenders importeren?

Ja. Plak de tekst van de playlist in "Import", klik op "Add to list" en daarna op "Save". Import neemt ook JSON en CSV aan.

### Is de editor veilig op een gedeeld wifinetwerk?

Hij vraagt een code van 6 cijfers die bij elke start nieuw is, sluit na 5 foute codes en draait alleen zolang het editorscherm open is. De verbinding is gewoon http binnen je netwerk.

### Wat gebeurt er met een zender die ik in de browser weghaal?

Zodra je op "Save" klikt, wordt hij op elk apparaat verwijderd. Save vervangt je lijst met eigen zenders door de tabel op de pagina, dus laad de pagina eerst opnieuw als je ergens anders zenders hebt gewijzigd.

## Probeer het

Haal Macdio in de [App Store](https://apps.apple.com/app/macdio/id6761737888), voeg een paar zenders toe en open dan Bewerken op de computer op je iPhone, iPad of Apple TV. Eén aankoop, elk Apple-apparaat, geen abonnement.
