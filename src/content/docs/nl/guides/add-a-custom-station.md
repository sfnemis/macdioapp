---
title: "Een eigen radiozender toevoegen aan Macdio via de stream-URL"
description: "Voeg elke radiostream via het adres toe aan Macdio op iPhone, iPad of Mac, test hem, geef hem een logo, wijzig of verwijder hem. Apple TV gaat via een browser."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Welke streamadressen accepteert Macdio?"
    a: "Elke radiostream via http of https: MP3, AAC, HLS (.m3u8), playlistlinks die eindigen op .pls, .m3u, .asx of .xspf, en oude SHOUTcast-servers. Een podcastaflevering wordt niet als zender geaccepteerd."
  - q: "En als ik alleen de website van de zender ken?"
    a: "Plak de website in het adresveld en gebruik Scannen. Macdio toont de streams die het daar vindt, elk met een kwaliteitsmenu, en jij kiest er een."
  - q: "Waarom zegt Macdio \"Tap Add again to save it anyway\"?"
    a: "Macdio kon de stream niet bereiken toen het het adres controleerde. Een tweede tik bewaart de zender toch, handig als een zender maar even uit de lucht is."
  - q: "Verschijnen mijn eigen zenders op mijn andere apparaten?"
    a: "Ja. Ze synchroniseren via iCloud naar je Mac, iPhone, iPad en Apple TV, en Apple Watch krijgt ze van de iPhone."
  - q: "Kan ik een eigen zender een eigen logo geven?"
    a: "Ja. Kies Automatisch, Link (een afbeeldingsadres), Mijn afbeelding (een foto uit Foto's of Bestanden) of Geen. Je eigen afbeelding verschijnt op al je apparaten."
---

Op iPhone, iPad en Mac kun je elke internetradiozender aan Macdio toevoegen via het streamadres. Tik op "+" in de bibliotheek, kies "Aangepaste zender toevoegen" (op de Mac "Zender toevoegen…"), plak de URL, geef de zender een naam en voeg hem toe. Macdio controleert of het adres echt audio stuurt voordat het bewaart, en daarna synchroniseert de zender via iCloud naar je andere apparaten, Apple TV ook.

De catalogus heeft meer dan 60.000 zenders en mist er toch een paar, vaak kleine lokale zenders. Heb je het adres nog niet, dan laat [zo vind je de stream-URL van een zender](/guides/find-radio-stream-url.html) zien waar je moet zoeken.

## In het kort

Op iPhone of iPad:

1. Open de bibliotheek en tik op "+".
2. Kies "Aangepaste zender toevoegen".
3. Plak het adres in "Streamadres of website van de zender".
4. Tik op "Scannen" om de stream te bevestigen en de naam in te vullen, of typ zelf een "Zendernaam".
5. Tik op "Voeg toe".

## Waar zit de knop om toe te voegen op elk apparaat?

| Apparaat | Waar je hem vindt | Knop die bewaart |
|---|---|---|
| iPhone en iPad | Bibliotheek, "+", "Aangepaste zender toevoegen", of Instellingen, "Aangepaste Stations", "Aangepaste zender toevoegen" | "Voeg toe" |
| Mac | Bibliotheek, "+", "Zender toevoegen…" | "Zender toevoegen" |
| Apple TV | Instellingen, "Bewerken op de computer", daarna een browser in hetzelfde wifinetwerk | "Save" in de browser |
| Apple Watch en CarPlay | Geen formulier om toe te voegen. Ze spelen zenders uit je bibliotheek | |

Op de iPhone staat Instellingen onder Meer, tenzij je het naar de tabbalk hebt verplaatst.

## Zo voeg je een zender toe op iPhone of iPad

In het venster "Aangepaste zender" controleert "Scannen" (of de Return-toets) wat je in "Streamadres of website van de zender" hebt getypt. Een stream wordt bevestigd en een lege naam ingevuld. Bij een website krijg je een lijst met de streams die erop staan, elk met een kwaliteitsmenu en een knop "Gebruiken". "Logo", "Land" en "Tags" (gescheiden door komma's) zijn optioneel. "Stream-URL testen" antwoordt "Stream is bereikbaar!" als alles goed is. "Voeg toe" blijft grijs zolang de naam of het adres leeg is, of zolang er een test of scan loopt.

## Zo voeg je een zender toe op de Mac

Klik in de bibliotheek op "+" en kies "Zender toevoegen…". Het venster "Aangepaste zender toevoegen" heeft "Zendernaam", "Stream-URL" met een knop "Scannen", "Zenderlogo", "Land (optioneel)" en "Tags (kommagescheiden, optioneel)". Zodra je een adres typt, verschijnt "Stream testen", en een goede stream meldt "Stream is reachable" (de Mac toont dit in het Engels) met codec en bitrate. Klik op "Zender toevoegen" of druk op Return.

## Welke stream-URL's werken in Macdio?

- Adressen die beginnen met http of https. Laat je het begin weg, dan probeert Macdio eerst "https://" en daarna gewoon "http://".
- Directe MP3- en AAC-streams.
- HLS-streams: een adres dat eindigt op .m3u8, of een server die antwoordt met een HLS-playlist.
- Playlistlinks die eindigen op .pls, .m3u, .asx of .xspf. Macdio opent de playlist en gebruikt de eerste stream.
- SHOUTcast-servers, ook oude die antwoorden met "ICY 200 OK".

Een bestand met een vaste lengte, zoals een podcastaflevering of een jingle, wordt niet als zender geaccepteerd.

## Wat Macdio controleert als je op Voeg toe tikt

Iets wat geen adres kan zijn, geeft "Invalid URL format. Please check the URL." (ongeldig adres). Een tweede zender met dezelfde naam en hetzelfde adres geeft "A station with this name and URL already exists." (die zender bestaat al). Deze meldingen toont de app in het Engels.

Daarna vraagt Macdio de server om antwoord en wacht daar tot 6 seconden op. Is het adres een website, dan wordt er niets bewaard en loopt de scan, zodat je een van de streams kunt kiezen. Is de server niet bereikbaar, dan zie je de reden en "Tap Add again to save it anyway." (op de Mac "Click Add again to save it anyway."), oftewel: tik nog een keer om toch te bewaren. Een tweede tik bewaart hem.

De nieuwe zender verschijnt onder "Mijn zenders". Hij wordt pas een favoriet als je hem een ster geeft (zie [favorieten, lijsten en synchronisatie](/guides/favorites-lists-and-sync.html)).

## Zo geef je een eigen zender een logo

De keuze "Logo" (op de Mac "Zenderlogo") heeft vier opties:

- "Automatisch" zoekt de zender op bij Logo.dev aan de hand van naam en adres.
- "Link" neemt een directe link naar een afbeeldingsbestand, het soort link dat je krijgt met afbeeldingsadres kopiëren, eindigend op .png of .jpg. Plak je een pagina waar het logo op staat, dan zet Macdio de afbeelding ervoor in de plaats als het die kan vinden.
- "Mijn afbeelding" gebruikt je eigen afbeelding: "Foto's" of "Bestanden" op iPhone en iPad (iCloud Drive werkt), "Afbeelding kiezen…" op de Mac. Die wordt bij de zender bewaard, dus hij verschijnt op al je apparaten.
- "Geen" tekent de eigen afbeelding van Macdio.

Wil je het later wijzigen, houd de zender dan ingedrukt op iPhone of iPad, of klik er met de rechtermuisknop op op de Mac, en kies "Zenderlogo…". Dat werkt ook voor zenders uit de catalogus, met Automatisch, Mijn afbeelding en Geen. Link is er alleen voor zenders die je zelf hebt toegevoegd.

## Zo wijzig of verwijder je een eigen zender

Houd op iPhone en iPad de zender ingedrukt en kies "Zender bewerken", of veeg naar rechts over de rij en tik op "Bewerken". Wijzig wat je wilt en tik op "Opslaan". Om hem te verwijderen veeg je naar links over de rij in "Mijn zenders", tik je op "Verwijderen" en bevestig je met "Verwijderen". De bevestiging zegt dat de zender van elk apparaat verdwijnt en uit elke lijst waarin hij staat.

Klik op de Mac met de rechtermuisknop op de zender en kies "Zender bewerken" (daarna "Wijzigingen bewaren") of "Zender verwijderen", dat ook eerst om bevestiging vraagt.

Een wijziging bewaren test een gewijzigd adres niet, dus gebruik eerst de testknop. Zenders uit de catalogus kun je niet bewerken, maar met "Hernoemen…" (iPhone en iPad) en "Zendernaam wijzigen…" (Mac) geef je ze je eigen naam, en "Naam herstellen" brengt de oorspronkelijke naam terug.

## Een zender toevoegen op Apple TV

De TV heeft geen formulier om toe te voegen. Start "Bewerken op de computer" in de instellingen en een browser op een computer in hetzelfde wifinetwerk krijgt een tabel met je eigen zenders, de Logo-URL inbegrepen ([stap voor stap](/guides/edit-stations-on-computer.html)). Zenders die je op iPhone, iPad of Mac toevoegt, komen sowieso via iCloud op de TV.

## Grenzen om te kennen

- Een zender toevoegen kan alleen met een verbinding, want de controle, de scan en het opzoeken van het logo gaan allemaal online.
- Een scan van een website kan tot een minuut duren, en sommige sites verstoppen hun speler zo goed dat er geen stream gevonden wordt.
- iPhone en iPad hebben geen bestandsimport voor zenderlijsten. Voor veel zenders tegelijk gebruik je Import in de [editor in de browser](/guides/edit-stations-on-computer.html).
- CarPlay en [Siri](/guides/siri-radio.html) vinden een eigen zender zodra het een favoriet is of een zender die je onlangs hebt afgespeeld. CarPlay toont hem ook in je lijsten.

## Veelgestelde vragen

### Welke streamadressen accepteert Macdio?

Elke radiostream via http of https: MP3, AAC, HLS (.m3u8), playlistlinks die eindigen op .pls, .m3u, .asx of .xspf, en oude SHOUTcast-servers. Een podcastaflevering wordt niet als zender geaccepteerd.

### En als ik alleen de website van de zender ken?

Plak de website in het adresveld en gebruik "Scannen". Macdio toont de streams die het daar vindt, elk met een kwaliteitsmenu, en jij kiest er een.

### Waarom zegt Macdio "Tap Add again to save it anyway"?

Macdio kon de stream niet bereiken toen het het adres controleerde. Een tweede tik bewaart de zender toch, handig als een zender maar even uit de lucht is.

### Verschijnen mijn eigen zenders op mijn andere apparaten?

Ja. Ze synchroniseren via iCloud naar je Mac, iPhone, iPad en Apple TV, en Apple Watch krijgt ze van de iPhone.

### Kan ik een eigen zender een eigen logo geven?

Ja. Kies "Automatisch", "Link" (een afbeeldingsadres), "Mijn afbeelding" (een foto uit Foto's of Bestanden) of "Geen". Je eigen afbeelding verschijnt op al je apparaten.

## Probeer het

Haal Macdio in de [App Store](https://apps.apple.com/app/macdio/id6761737888) en voeg die ene zender toe die de catalogus niet heeft. Eén aankoop dekt iPhone, iPad, Mac, Apple TV en Apple Watch, zonder abonnement.
