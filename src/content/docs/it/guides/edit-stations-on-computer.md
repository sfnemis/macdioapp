---
title: "Modifica le stazioni di Macdio dal browser di un computer"
description: "Modifica dal computer apre le tue stazioni in un browser sulla stessa Wi-Fi, da iPhone, iPad o Apple TV. Aggiungi, modifica, importa ed esporta JSON, CSV o M3U."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Quali dispositivi hanno Modifica dal computer?"
    a: "iPhone, iPad e Apple TV. Il Mac ha già una tastiera e modifica le stazioni nell'app. Apple Watch e CarPlay non ce l'hanno."
  - q: "Perché il mio computer non riesce ad aprire l'indirizzo?"
    a: "I due dispositivi devono essere sulla stessa rete Wi-Fi, la schermata dell'editor deve restare aperta, e su iPhone e iPad Macdio ha bisogno del permesso per la rete locale. L'indirizzo può cambiare a ogni avvio."
  - q: "L'editor cambia le stazioni della directory?"
    a: "No. Nel browser compaiono solo le stazioni che hai aggiunto tu, e le stazioni della directory non vengono mai toccate."
  - q: "Posso importare una playlist M3U di stazioni?"
    a: "Sì. Incolla il testo della playlist in Import, fai clic su Add to list, poi su Save. Import accetta anche JSON e CSV."
  - q: "L'editor è sicuro su una Wi-Fi condivisa?"
    a: "Chiede un codice di 6 cifre nuovo a ogni avvio, si chiude dopo 5 codici sbagliati e funziona solo mentre la schermata dell'editor è aperta. La connessione è in semplice http dentro la tua rete."
  - q: "Cosa succede a una stazione che tolgo nel browser?"
    a: "Quando fai clic su Save viene cancellata su ogni dispositivo. Save sostituisce l'elenco delle tue stazioni personalizzate con la tabella della pagina, quindi ricarica prima la pagina se hai cambiato delle stazioni altrove."
---

Modifica dal computer ti fa gestire le stazioni che hai aggiunto tu dal browser di qualsiasi computer sulla stessa rete Wi-Fi, con una tastiera vera. Lo avvii nelle Impostazioni di Macdio su iPhone, iPad o Apple TV, apri l'indirizzo che ti mostra, inserisci il codice di 6 cifre e ottieni una tabella dove aggiungere, modificare, riordinare, importare ed esportare le tue stazioni. Non passa niente da un server. Il browser parla solo con il tuo dispositivo.

Il Mac non ce l'ha. Lì aggiungi le stazioni con "Aggiungi stazione…" e le modifichi con un clic destro, vedi [aggiungere una stazione tua](/guides/add-a-custom-station.html).

## Passi rapidi

1. Su iPhone o iPad, apri Impostazioni, "Stazioni Personalizzate", "Modifica dal computer". Su Apple TV, apri Impostazioni, vai alla scheda "Modifica sul computer" e scegli "Apri".
2. Avvia l'editor: "Avvia l'editor" su iPhone e iPad, "Avvia l’editor" su Apple TV.
3. Scrivi l'indirizzo che compare sul dispositivo nel browser del computer.
4. Inserisci il codice di 6 cifre.
5. Fai le tue modifiche e fai clic su "Save".

## Come avviare l'editor su iPhone o iPad

Vai in Impostazioni, "Stazioni Personalizzate", "Modifica dal computer" (su iPhone le Impostazioni stanno sotto Altro, a meno che tu non le abbia spostate nella barra delle schede) e tocca "Avvia l'editor". La prima volta iOS chiede se Macdio può trovare dispositivi sulla rete locale. Consentilo, altrimenti il browser non riesce a raggiungere l'iPhone o l'iPad.

Quando è in funzione, la sezione "Pronto" mostra "Sul tuo computer apri" con l'indirizzo, e "Poi inserisci questo codice" con il codice nascosto da puntini finché non tocchi "Mostra". "Ferma l'editor" lo chiude.

## Come avviare l'editor su Apple TV

Apri Impostazioni, vai alla scheda "Modifica sul computer" ("Editor delle mie stazioni") e scegli "Apri". Nella schermata "Modifica sul computer", premi "Avvia l’editor".

La TV mostra "Apri questo indirizzo" con l'indirizzo a caratteri grandi e "Poi inserisci questo codice" con le 6 cifre, sempre visibili. "Ferma l’editor", "Fine" o il tasto Menu lo chiudono. Se non riesce ad avviarsi, ti viene offerto "Riprova".

## Cosa puoi fare nel browser?

L'indirizzo è un semplice indirizzo http fatto dell'indirizzo Wi-Fi del dispositivo e di un numero di porta. La porta viene scelta di nuovo a ogni avvio, quindi l'indirizzo può essere diverso dall'ultima volta, e anche il codice è nuovo a ogni avvio.

La pagina del browser è in inglese, quindi qui i nomi dei suoi pulsanti restano in inglese. Per prima cosa chiede il codice. Uno sbagliato dà "That code did not work. Check the code on your device."

Dopo vedi "My Stations" con il numero delle stazioni, più "Reload" e "Save". La barra degli strumenti ha un campo filtro (per nome, indirizzo o tag), "Add station", "Scan a website", "Import", "Export" e un pulsante che ordina la tabella per nome. Le colonne sono una stella, Name, Stream URL, Logo URL, Country e Tags.

Ogni riga ha una maniglia per trascinarla, una stella che rende la stazione un preferito, "Logo" per trovare un logo, "Test" per chiedere al dispositivo se lo stream suona, e "✕" per togliere la riga. Su uno schermo piccolo, frecce su e giù sostituiscono il trascinamento. Quando due righe usano lo stesso indirizzo, la pagina le segna con "Another row uses this same address".

"Scan a website" usa lo stesso strumento di ricerca dell'app: elenca ogni canale sul sito di una stazione con una scelta della qualità, e "Add selected" li mette nella tabella.

L'ordine delle righe diventa l'ordine di Le mie stazioni nell'app. Niente arriva al dispositivo finché non fai clic su "Save", e a quel punto lo stato dice "Saved to device". Da lì le modifiche si sincronizzano tramite iCloud sugli altri tuoi dispositivi.

## Come importare stazioni da JSON, CSV o M3U

"Import" accetta testo che incolli:

- JSON: un elenco di stazioni, ognuna con "name" e "streamURL", e se vuoi "logoURL", "country" e "tags".
- CSV: una riga di intestazione `name,stream,logo,country,tags,favorite`, poi una stazione per riga.
- M3U: una riga `#EXTINF:-1,` con il nome della stazione, seguita dall'indirizzo dello stream.

I pulsanti "Fill with a JSON example", "Fill with a CSV example" e "Fill with an M3U example" mettono nel riquadro un esempio che funziona. Questo è quello M3U:

```
#EXTM3U
#EXTINF:-1,Radio Paradise
https://stream.radioparadise.com/aac-320
```

"Add to list" aggiunge le righe alla tabella. Arrivano al dispositivo quando fai clic su "Save".

## Come esportare le tue stazioni

"Export" mostra le tue stazioni come JSON, CSV e M3U in un'unica schermata e offre "JSON file", "CSV file" e "M3U file". I file scaricati si chiamano macdio-stations.json, macdio-stations.csv e macdio-stations.m3u.

## Cosa fa Save al tuo elenco di stazioni

Save sostituisce l'elenco delle tue stazioni personalizzate con la tabella della pagina. Il dispositivo tiene le righe che vedi e cancella ogni tua stazione che non è nella tabella, e iCloud porta quella cancellazione su ogni dispositivo. In pratica:

- Una riga che togli con "✕" viene cancellata su ogni dispositivo quando salvi, e la pagina non chiede conferma.
- Se hai aggiunto o cambiato stazioni su un altro dispositivo dopo che questa pagina si è caricata, fai clic su "Reload" prima di modificare. Un salvataggio da una pagina vecchia rimette la tabella vecchia.
- Lascia l'indirizzo in ogni riga, che cominci con http:// o https://. Una riga con l'indirizzo vuoto o senza quell'inizio viene scartata al salvataggio, e la stazione a cui apparteneva viene cancellata. Il browser non aggiunge "https://" per te come fa l'app.

## Quando si ferma l'editor?

Funziona solo finché lo tieni aperto. Si ferma quando premi stop, quando esci dalla schermata dell'editor, quando Macdio passa in background o quando chiudi la scheda del browser. Si ferma anche quando il browser resta in silenzio per 2 minuti, quando nessun browser si collega entro 5 minuti, e dopo 5 codici sbagliati. Mentre è in funzione, lo schermo del telefono o della TV resta acceso.

## Limiti da conoscere

- I due dispositivi devono essere sulla stessa rete.
- La tabella contiene fino a 500 stazioni, e si analizza un sito alla volta.
- Le stazioni della directory e le tue liste restano fuori dall'editor. Quelle si cambiano nell'app, vedi [preferiti, liste e sincronizzazione](/guides/favorites-lists-and-sync.html).
- Il JSON di questa pagina e il JSON di "Esporta stazioni…" sul Mac sono formati diversi. Rileggi ciascuno con la sua importazione.

## Domande frequenti

### Quali dispositivi hanno Modifica dal computer?

iPhone, iPad e Apple TV. Il Mac ha già una tastiera e modifica le stazioni nell'app. Apple Watch e CarPlay non ce l'hanno.

### Perché il mio computer non riesce ad aprire l'indirizzo?

I due dispositivi devono essere sulla stessa rete Wi-Fi, la schermata dell'editor deve restare aperta, e su iPhone e iPad Macdio ha bisogno del permesso per la rete locale. L'indirizzo può cambiare a ogni avvio.

### L'editor cambia le stazioni della directory?

No. Nel browser compaiono solo le stazioni che hai aggiunto tu, e le stazioni della directory non vengono mai toccate.

### Posso importare una playlist M3U di stazioni?

Sì. Incolla il testo della playlist in "Import", fai clic su "Add to list", poi su "Save". Import accetta anche JSON e CSV.

### L'editor è sicuro su una Wi-Fi condivisa?

Chiede un codice di 6 cifre nuovo a ogni avvio, si chiude dopo 5 codici sbagliati e funziona solo mentre la schermata dell'editor è aperta. La connessione è in semplice http dentro la tua rete.

### Cosa succede a una stazione che tolgo nel browser?

Quando fai clic su "Save" viene cancellata su ogni dispositivo. Save sostituisce l'elenco delle tue stazioni personalizzate con la tabella della pagina, quindi ricarica prima la pagina se hai cambiato delle stazioni altrove.

## Vuoi provarlo?

Scarica Macdio dall'[App Store](https://apps.apple.com/app/macdio/id6761737888), aggiungi qualche stazione, poi apri Modifica dal computer su iPhone, iPad o Apple TV. Un acquisto, ogni dispositivo Apple, nessun abbonamento.
