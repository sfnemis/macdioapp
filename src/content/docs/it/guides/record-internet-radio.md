---
title: "Come registrare la radio internet su Mac (passo per passo)"
description: "Tre modi per registrare la radio internet su Mac, e cosa funziona su iPhone: un lettore con registrazione integrata, uno strumento audio di sistema o Audacity."
datePublished: 2026-08-09
lastUpdated: 2026-09-14
faq:
  - q: "Che qualità hanno le registrazioni?"
    a: "La stessa dello stream. L'audio in arrivo viene scritto così com'è, senza ricodifica, quindi una stazione a 128 kbps dà un file a 128 kbps e una stazione a 320 kbps dà un file a 320 kbps."
  - q: "Posso esportare una registrazione nel Finder o nell'app File?"
    a: "No. Le registrazioni restano dentro l'app sul tuo dispositivo, dove puoi ascoltarle o cancellarle. Non c'è condivisione, esportazione né sincronizzazione dei file con iCloud."
  - q: "Posso registrare mentre uso altre app?"
    a: "Sì. La registrazione cattura lo stream e non gli altoparlanti, quindi continua in sottofondo su Mac e iPhone mentre fai altro, anche a schermo spento."
  - q: "Posso registrare su Apple Watch o Apple TV?"
    a: "No. La registrazione è una funzione di Mac, iPhone e iPad. Le app per l'orologio e la TV riproducono le stazioni e controllano la riproduzione."
  - q: "Come registro un programma radio che va in onda di notte?"
    a: "Avvia la registrazione prima di andare a letto e lascia che la chiuda il limite di tre ore, oppure alza quel limite nelle impostazioni se il programma è più lungo. Non c'è una programmazione che avvii una registrazione da sola."
---

Tre modi per farlo, quanto ti costa ciascuno, e dove finiscono i file.

**Il modo più facile per registrare la radio internet su un Mac è un lettore radio con la registrazione integrata, perché salva lo stream stesso e non richiede di instradare l'audio. Registrare tutto il sistema con uno strumento di cattura funziona anche, ed è l'unica opzione quando l'audio arriva da un sito o da un'app che non sa registrare. Su un iPhone esiste solo la strada integrata.**

## Perché registrare la radio internet

La maggior parte delle richieste si riduce a una di tre cose: un programma che va in onda mentre dormi o lavori, un DJ set che vuoi tenere perché non verrà mai pubblicato da nessuna parte, o un singolo brano che hai sentito una volta e vuoi ritrovare. Gli stream sono in diretta e nessuno li conserva per te, quindi se li vuoi dopo, devi prenderli mentre passano.

## Metodo 1: registrare con un lettore che lo fa già

Un lettore che registra scrive su disco lo stream in arrivo. Niente viene ricodificato, non entrano suoni di sistema, e una notifica durante la registrazione non finisce nel file. [Macdio](/mac.html) lo fa su Mac e su [iPhone](/iphone.html) con lo stesso pulsante.

Avvia una stazione, poi premi registra. Scegli Continuo per avere un file per sessione, oppure Dividi per brano per far tagliare la sessione a ogni cambio di canzone. Lasciala andare, usa altre app, e premi stop quando hai finito. La sessione compare subito nella scheda Registrazioni.

Dividi per brano è la parte che vale la pena conoscere. Tiene d'occhio le informazioni sulla canzone che arrivano dentro lo stream e taglia a ogni cambio, così un programma di due ore diventa un elenco di brani con il loro nome e la copertina invece di un unico lungo file da scorrere a mano. Quando una stazione non manda niente di utile, e capita spesso, Macdio ricava la canzone dall'audio che ha già in mano, così i nomi continuano ad arrivare anche a schermo spento e senza mai chiedere il permesso per il microfono. La [guida al riconoscimento delle canzoni](/guides/identify-song-on-radio.html) spiega come funziona questa parte.

Il compromesso è che un registratore integrato registra solo quello che il lettore sa riprodurre. Cattura la radio internet e nient'altro, quindi una videochiamata o una scheda del browser sono fuori portata.

## Metodo 2: catturare tutto il sistema con Audio Hijack

Audio Hijack di Rogue Amoeba registra l'audio di qualsiasi applicazione su un Mac, o tutto l'audio di sistema insieme, quindi copre gli stream che vivono in una scheda del browser o in un lettore senza registratore. La versione 4.6.0 gira da macOS 14.4 fino a macOS 27 e si può scaricare gratis, con delle limitazioni finché non compri una licenza, secondo la pagina del prodotto di Rogue Amoeba (controllata il 14 settembre 2026).

Scegli l'applicazione sorgente, aggiungi un blocco registratore e premi il pulsante di avvio. È più lavoro di un pulsante di registrazione, e c'è un problema da tenere in conto: qualsiasi cosa il Mac riproduca finisce nel file. Una notifica di Slack al minuto quaranta resta nella registrazione per sempre. In più ti dà un unico lungo file senza sapere dove comincia o finisce una canzone, quindi l'elenco dei brani te lo devi fare tu dopo.

## Metodo 3: Audacity più un dispositivo audio virtuale

Audacity è gratuito e open source, ed è per questo la risposta tipica nei forum, ma macOS non permette a un'app di registrare l'audio di sistema da sola. Prima devi installare un dispositivo audio virtuale, come BlackHole, gratuito e open source, far passare l'uscita del Mac attraverso di esso, poi impostare Audacity perché registri da quel dispositivo. Vorrai anche sentire quello che registri, e questo vuol dire un dispositivo a uscita multipla in Configurazione MIDI Audio, così il suono arriva sia alle casse sia al registratore.

Funziona, non costa niente, ed è il più macchinoso dei tre. Il vantaggio è che Audacity è un editor, quindi tagliare, sfumare ed esportare in un formato preciso è lì a portata di mano quando la cattura è finita.

## Quale metodo usare

Se la stazione è in un'app radio, usa il registratore dell'app. È l'unica strada che ti dà audio pulito e divisione per brano senza software in più. Se l'audio è altrove, o stai registrando insieme un'intervista per un podcast e una base musicale, Audio Hijack è lo strumento fatto per quel lavoro. Audacity è la scelta quando il budget è zero e un pomeriggio di configurazione è accettabile.

## Come registrare la radio su un iPhone

Qui esiste solo il primo metodo. iOS non dà a nessuna app accesso alla cattura dell'audio di sistema, quindi non c'è un equivalente di Audio Hijack per iPhone, e nemmeno la registrazione dello schermo salva uno stream pulito. Un lettore con la registrazione integrata è tutto quello che c'è.

In Macdio è lo stesso pulsante del Mac. Tocca registra mentre suona una stazione, e la registrazione continua mentre usi altre app, perché viene scritto lo stream e non c'è un microfono in ascolto. Le registrazioni compaiono nella scheda Registrazioni non appena ti fermi.

## Si può programmare una registrazione?

Non in Macdio. Non c'è un timer che avvia una stazione alle 21:00 del giovedì, ed è nell'elenco delle richieste, non nell'app. Su un Mac, Audio Hijack è oggi la cosa più vicina, oppure un'automazione di Comandi Rapidi può aprire una stazione a un orario stabilito mentre premi registra tu.

Quello che Macdio ha è la protezione opposta: una sessione si ferma da sola dopo tre ore, così una registrazione dimenticata non si mangia il disco durante la notte. Il limite si regola nelle impostazioni quando registri un programma lungo, e il tempo rimasto si vede mentre la registrazione va avanti.

## Cosa ferma una registrazione prima del tempo

Due cose chiudono una sessione prima di te, ed entrambe salvano il file invece di perderlo. La prima è il limite di tre ore qui sopra. La seconda è il disco. Macdio controlla lo spazio libero mentre scrive, ti avvisa ogni cinque minuti quando il disco scende sotto i 500 MB, e ferma la registrazione con una notifica se lo spazio diventa critico, quindi nel caso peggiore hai un file più corto, non un disco pieno e un file rovinato. Il caso da tenere d'occhio è una lunga sessione notturna su un portatile quasi pieno, perché una stazione a 320 kbps scrive circa 144 MB all'ora.

## Quanto diventano grandi i file?

Una registrazione pesa quanto lo stream, perché non viene aggiunto né compresso niente. A 128 kbps, il bitrate più comune, sono circa 58 MB all'ora, quindi un'intera serata di radio fa circa 350 MB. Una stazione a 320 kbps fa circa 2,4 MB al minuto, e una stazione parlata a bitrate basso può pesare un quarto. In pratica Dividi per brano rende i conti più leggeri, perché tieni le tre canzoni che volevi e cancelli il resto.

## In che formato sono i file

Una registrazione mantiene quello che manda la stazione. Una stazione MP3 ti dà un .mp3 e una stazione AAC un .aac, senza ricodifica sulla strada verso il disco, quindi il file suona esattamente come lo stream. I brani che Dividi per brano ritaglia vengono scritti come .m4a. Qui non c'è nessuna impostazione di qualità da sbagliare, perché non c'è una seconda codifica.

## Dove stanno le registrazioni

Dentro l'app, sul tuo dispositivo, nella scheda Registrazioni, dove ogni sessione e ogni brano diviso si può ascoltare o cancellare. Non vengono copiate nella tua libreria musicale, non compaiono nell'app File o nel Finder, e non c'è un pulsante per condividere o esportare. È un limite voluto per una funzione di registrazione personale, non qualcosa in attesa di essere finito, e tiene personale una registrazione personale. Niente viene caricato da nessuna parte.

## Registrare la radio internet è legale?

Registrare una trasmissione per il tuo ascolto privato è una pratica di lunga data nella maggior parte dei paesi, la stessa tradizione di chi registrava l'FM su cassetta. Quello che resta personale resta semplice: non ridistribuire e non ripubblicare le registrazioni, e controlla le regole del tuo paese se hai dubbi. Questa è un'informazione generale, non una consulenza legale.

## Domande frequenti

### Che qualità hanno le registrazioni?

La stessa dello stream. L'audio in arrivo viene scritto così com'è, senza ricodifica, quindi una stazione a 128 kbps dà un file a 128 kbps e una stazione a 320 kbps dà un file a 320 kbps.

### Posso esportare una registrazione nel Finder o nell'app File?

No. Le registrazioni restano dentro l'app sul tuo dispositivo, dove puoi ascoltarle o cancellarle. Non c'è condivisione, esportazione né sincronizzazione dei file con iCloud.

### Posso registrare mentre uso altre app?

Sì. La registrazione cattura lo stream e non gli altoparlanti, quindi continua in sottofondo su Mac e iPhone mentre fai altro, anche a schermo spento.

### Posso registrare su Apple Watch o Apple TV?

No. La registrazione è una funzione di Mac, iPhone e iPad. Le app per l'orologio e la TV riproducono le stazioni e controllano la riproduzione.

### Come registro un programma radio che va in onda di notte?

Avvia la registrazione prima di andare a letto e lascia che la chiuda il limite di tre ore, oppure alza quel limite nelle impostazioni se il programma è più lungo. Non c'è una programmazione che avvii una registrazione da sola.

## Vuoi provarlo?

Scarica Macdio dall'[App Store](https://apps.apple.com/app/macdio/id6761737888). Un acquisto, ogni dispositivo Apple, nessun abbonamento.
