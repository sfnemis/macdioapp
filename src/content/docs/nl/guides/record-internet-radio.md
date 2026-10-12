---
title: "Zo neem je internetradio op op een Mac (stap voor stap)"
description: "Drie manieren om internetradio op te nemen op een Mac, plus wat werkt op iPhone: een speler die opneemt, een systeemaudio-tool en Audacity met virtuele audio."
datePublished: 2026-08-09
lastUpdated: 2026-09-14
faq:
  - q: "Welke kwaliteit hebben de opnames?"
    a: "Identiek aan de stream. De binnenkomende audio wordt weggeschreven zoals ze aankomt, zonder opnieuw te coderen, dus een zender op 128 kbps geeft een bestand op 128 kbps en een zender op 320 kbps een bestand op 320 kbps."
  - q: "Kan ik een opname exporteren naar de Finder of de Bestanden-app?"
    a: "Nee. Opnames blijven in de app op je apparaat, waar je ze kunt afspelen of verwijderen. Er is geen delen, exporteren of iCloud-bestandssynchronisatie voor."
  - q: "Kan ik opnemen terwijl ik andere apps gebruik?"
    a: "Ja. Opnemen legt de stream vast en niet de speakers, dus het gaat op Mac en iPhone op de achtergrond door terwijl je iets anders doet, en met het scherm uit."
  - q: "Kan ik opnemen op Apple Watch of Apple TV?"
    a: "Nee. Opnemen is een functie voor Mac, iPhone en iPad. De apps voor horloge en tv spelen zenders af en bedienen het afspelen."
  - q: "Hoe neem ik een radioprogramma op dat 's nachts wordt uitgezonden?"
    a: "Start de opname voordat je naar bed gaat en laat de grens van drie uur hem beëindigen, of verhoog die grens in de instellingen als het programma langer is. Er is geen planner die zelf een opname start."
---

Drie manieren om het te doen, wat elke manier je kost, en waar de bestanden terechtkomen.

**De makkelijkste manier om internetradio op te nemen op een Mac is een radiospeler met ingebouwd opnemen, omdat die de stream zelf bewaart en geen audio hoeft om te leiden. Het hele systeem opnemen met een opnametool werkt ook, en het is de enige optie als de audio uit een website komt of uit een app die niet kan opnemen. Op een iPhone bestaat alleen de ingebouwde route.**

## Waarom zou je internetradio opnemen

De meeste verzoeken komen neer op een van drie dingen: een programma dat wordt uitgezonden terwijl je slaapt of werkt, een dj-set die je wilt bewaren omdat hij nooit ergens zal worden gepost, of één nummer dat je één keer hoorde en wilt terugvinden. Streams zijn live en er wordt niets voor je bewaard, dus als je het later wilt, moet je het vangen terwijl het voorbijkomt.

## Methode 1: opnemen met een speler die het ingebouwd heeft

Een speler die opneemt schrijft de binnenkomende stream naar de schijf. Niets wordt opnieuw gecodeerd, er lekken geen systeemgeluiden in, en een melding tijdens de opname komt niet in het bestand terecht. [Macdio](/mac.html) doet dit op Mac en op [iPhone](/iphone.html) met dezelfde knop.

Speel een zender af en druk dan op opnemen. Kies Doorlopend voor één bestand per sessie, of Splitsen per nummer om de sessie bij elke nummerwissel te laten knippen. Laat het lopen, gebruik andere apps, en druk op stop als je klaar bent. De sessie verschijnt meteen op het tabblad Opnames.

Splitsen per nummer is het deel dat het weten waard is. Het let op de nummerinformatie die in de stream binnenkomt en knipt bij elke wissel, zodat een programma van twee uur een lijst met benoemde nummers met hoezen wordt in plaats van één lang bestand waar je doorheen moet schuiven. Als een zender niets bruikbaars stuurt, en dat doen er genoeg, achterhaalt Macdio het nummer uit de audio die het al in handen heeft, zodat het benoemen doorgaat met het scherm uit en zonder ooit om microfoontoegang te vragen. De [gids over songherkenning](/guides/identify-song-on-radio.html) legt uit hoe dat deel werkt.

De ruil is dat een ingebouwde recorder alleen opneemt wat de speler kan afspelen. Hij legt internetradio vast en niets anders, dus een videogesprek of een browsertabblad valt erbuiten.

## Methode 2: het hele systeem vastleggen met Audio Hijack

Audio Hijack van Rogue Amoeba neemt audio op van elke app op een Mac, of alle systeemaudio tegelijk, dus het dekt streams die in een browsertabblad of in een speler zonder recorder leven. Versie 4.6.0 draait op macOS 14.4 tot en met macOS 27 en kan gratis worden gedownload, met beperkingen tot je een licentie koopt, volgens de productpagina van Rogue Amoeba (gecontroleerd op 14 september 2026).

Je kiest de bron-app, voegt een recorderblok toe en drukt op de startknop. Het is meer instelwerk dan een opnameknop, en er is een valkuil om rekening mee te houden: alles wat de Mac afspeelt komt in het bestand. Een Slack-melding op minuut veertig zit voorgoed in de opname. Het geeft je ook één lang bestand zonder enig idee waar een nummer begint of eindigt, dus het werk aan de tracklist is daarna voor jou.

## Methode 3: Audacity plus een virtueel audioapparaat

Audacity is gratis en open source, wat het het gebruikelijke antwoord op forums maakt, maar macOS laat een app niet zelfstandig systeemaudio opnemen. Je moet eerst een virtueel audioapparaat installeren, zoals het gratis en open source BlackHole, de uitvoer van de Mac erdoorheen leiden, en dan Audacity instellen om van dat apparaat op te nemen. Je wilt ook horen wat je opneemt, en dat betekent een apparaat met meerdere uitvoeren in Audio/MIDI-configuratie, zodat het geluid zowel je speakers als de recorder bereikt.

Het werkt, het kost niets, en het is de meest gepriegelde van de drie. Het voordeel is dat Audacity een editor is, dus inkorten, uitfaden en exporteren in een specifiek formaat zitten er meteen bij zodra de opname klaar is.

## Welke methode je gebruikt

Staat de zender in een radio-app, gebruik dan de eigen recorder van de app. Het is de enige route die je schone audio en splitsen per nummer geeft zonder extra software. Zit de audio ergens anders, of neem je een podcastinterview en een muziekbed tegelijk op, dan is Audio Hijack het gereedschap dat voor die klus is gebouwd. Audacity is de keuze als het budget nul is en een middag instellen acceptabel is.

## Zo neem je radio op op een iPhone

Hier bestaat alleen de eerste methode. iOS geeft geen enkele app toegang tot het vastleggen van systeemaudio, dus er is geen iPhone-equivalent van Audio Hijack, en schermopname bewaart ook geen schone stream. Een speler met ingebouwd opnemen is de hele lijst.

In Macdio is het dezelfde knop als op de Mac. Tik op opnemen terwijl een zender speelt, en de opname gaat door terwijl je andere apps gebruikt, omdat het de stream is die wordt weggeschreven en geen microfoon die luistert. Opnames verschijnen op het tabblad Opnames zodra je stopt.

## Kun je een opname inplannen?

Niet in Macdio. Er is geen timer die op donderdag om 21:00 een zender start, en dat staat op de verzoeklijst en niet in de app. Op een Mac is Audio Hijack het dichtstbijzijnde wat er vandaag is, of een automatisering in Opdrachten kan op een vast tijdstip een zender openen terwijl je zelf op opnemen drukt.

Wat Macdio wél heeft is de omgekeerde beveiliging: een sessie stopt vanzelf na drie uur, zodat een opname die je bent vergeten niet 's nachts de schijf opvreet. De grens is in de instellingen aan te passen als je een lang programma opneemt, en de resterende tijd wordt getoond terwijl de opname loopt.

## Wat een opname vroegtijdig stopt

Twee dingen beëindigen een sessie voordat jij dat doet, en beide bewaren het bestand in plaats van het te verliezen. Het eerste is de grens van drie uur hierboven. Het tweede is de schijf. Macdio houdt de vrije ruimte in het oog terwijl het schrijft, waarschuwt je elke vijf minuten zodra de schijf onder 500 MB zakt, en stopt de opname met een melding als de ruimte kritiek wordt, dus het ergste geval is een korter bestand in plaats van een volle schijf en een kapot bestand. Een lange nachtelijke sessie op een bijna volle laptop is het geval om in de gaten te houden, want een zender op 320 kbps schrijft ongeveer 144 MB per uur.

## Hoe groot worden de bestanden?

Een opname is zo zwaar als de stream, omdat er niets wordt toegevoegd of verder gecomprimeerd. Bij 128 kbps, de meest voorkomende bitrate, is dat ongeveer 58 MB per uur, dus een volle avond radio is ongeveer 350 MB. Een zender op 320 kbps zit rond 2,4 MB per minuut, en een praatzender met lage bitrate kan een kwart daarvan zijn. Splitsen per nummer maakt het rekenen in de praktijk vriendelijker, omdat je de drie nummers houdt die je wilde en de rest verwijdert.

## In welk formaat de bestanden zijn

Een opname bewaart wat de zender stuurt. Een MP3-zender geeft je een .mp3 en een AAC-zender een .aac, zonder dat er onderweg naar de schijf iets opnieuw wordt gecodeerd, dus het bestand klinkt precies zoals de stream deed. Nummers die Splitsen per nummer eruit knipt worden weggeschreven als .m4a. Er is hier geen kwaliteitsinstelling om verkeerd te zetten, omdat er geen tweede codering is.

## Waar de opnames staan

In de app, op je eigen apparaat, op het tabblad Opnames waar elke sessie en elk gesplitst nummer kan worden afgespeeld of verwijderd. Ze worden niet naar je muziekbibliotheek gekopieerd, ze verschijnen niet in de Bestanden-app of de Finder, en er is geen knop om te delen of te exporteren. Dat is een bewuste grens voor een functie voor persoonlijke opnames, niet iets wat nog afgemaakt moet worden, en het houdt een persoonlijke opname persoonlijk. Er wordt nergens iets geüpload.

## Is internetradio opnemen legaal?

Een uitzending opnemen om er zelf privé naar te luisteren is in de meeste landen een gevestigde praktijk, dezelfde traditie als FM op een cassette zetten. Wat persoonlijk blijft, blijft simpel: verspreid de opnames niet en publiceer ze niet opnieuw, en controleer de regels van je eigen land als je twijfelt. Dit is algemene informatie en geen juridisch advies.

## Veelgestelde vragen

### Welke kwaliteit hebben de opnames?

Identiek aan de stream. De binnenkomende audio wordt weggeschreven zoals ze aankomt, zonder opnieuw te coderen, dus een zender op 128 kbps geeft een bestand op 128 kbps en een zender op 320 kbps een bestand op 320 kbps.

### Kan ik een opname exporteren naar de Finder of de Bestanden-app?

Nee. Opnames blijven in de app op je apparaat, waar je ze kunt afspelen of verwijderen. Er is geen delen, exporteren of iCloud-bestandssynchronisatie voor.

### Kan ik opnemen terwijl ik andere apps gebruik?

Ja. Opnemen legt de stream vast en niet de speakers, dus het gaat op Mac en iPhone op de achtergrond door terwijl je iets anders doet, en met het scherm uit.

### Kan ik opnemen op Apple Watch of Apple TV?

Nee. Opnemen is een functie voor Mac, iPhone en iPad. De apps voor horloge en tv spelen zenders af en bedienen het afspelen.

### Hoe neem ik een radioprogramma op dat 's nachts wordt uitgezonden?

Start de opname voordat je naar bed gaat en laat de grens van drie uur hem beëindigen, of verhoog die grens in de instellingen als het programma langer is. Er is geen planner die zelf een opname start.

## Klaar om het te proberen?

Haal Macdio in de [App Store](https://apps.apple.com/app/macdio/id6761737888). Eén aankoop, elk Apple-apparaat, geen abonnement.
