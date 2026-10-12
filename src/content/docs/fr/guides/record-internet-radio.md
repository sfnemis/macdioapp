---
title: "Comment enregistrer la radio Internet sur un Mac (pas à pas)"
description: "Trois façons d'enregistrer la radio Internet sur un Mac, plus ce qui marche sur iPhone : un lecteur avec enregistrement intégré, un outil de capture audio système, et Audacity avec un périphérique audio virtuel."
datePublished: 2026-08-09
lastUpdated: 2026-09-14
faq:
  - q: "Quelle est la qualité des enregistrements ?"
    a: "Identique au flux. L'audio entrant est écrit tel qu'il arrive, sans réencodage, donc une station à 128 kbps donne un fichier à 128 kbps et une station à 320 kbps un fichier à 320 kbps."
  - q: "Puis-je exporter un enregistrement vers le Finder ou l'app Fichiers ?"
    a: "Non. Les enregistrements restent dans l'app sur votre appareil, où vous pouvez les lire ou les supprimer. Il n'y a ni partage, ni export, ni synchronisation de fichiers iCloud pour eux."
  - q: "Puis-je enregistrer en utilisant d'autres apps ?"
    a: "Oui. L'enregistrement capture le flux et non les haut-parleurs, donc il continue en arrière-plan sur Mac et iPhone pendant que vous faites autre chose, et écran éteint."
  - q: "Puis-je enregistrer sur Apple Watch ou Apple TV ?"
    a: "Non. L'enregistrement est une fonction Mac, iPhone et iPad. Les apps montre et télé lisent les stations et pilotent la lecture."
  - q: "Comment enregistrer une émission de radio diffusée la nuit ?"
    a: "Lancez l'enregistrement avant d'aller vous coucher et laissez la limite de trois heures y mettre fin, ou relevez cette limite dans les réglages si l'émission est plus longue. Il n'y a pas de programmateur qui lance un enregistrement tout seul."
---

Trois façons de le faire, ce que chacune vous coûte, et où finissent les fichiers.

**La façon la plus simple d'enregistrer la radio Internet sur un Mac est un lecteur radio avec enregistrement intégré, parce qu'il sauvegarde le flux lui-même et n'a besoin d'aucun routage audio. Enregistrer tout le système avec un outil de capture marche aussi, et c'est la seule option quand l'audio vient d'un site web ou d'une app qui ne sait pas enregistrer. Sur un iPhone, seule la voie intégrée existe.**

## Pourquoi enregistrer la radio Internet

La plupart des demandes reviennent à l'une de ces trois choses : une émission diffusée pendant que vous dormez ou travaillez, un set de DJ que vous voulez garder parce qu'il ne sera jamais publié nulle part, ou un seul morceau entendu une fois que vous voulez retrouver. Les flux sont en direct et rien n'est stocké pour vous, donc si vous le voulez plus tard, il faut l'attraper au passage.

## Méthode 1 : enregistrer avec un lecteur qui l'intègre

Un lecteur qui enregistre écrit le flux entrant sur le disque. Rien n'est réencodé, aucun son système ne s'infiltre, et une notification pendant l'enregistrement ne finit pas dans le fichier. [Macdio](/mac.html) le fait sur Mac et sur [iPhone](/iphone.html) avec le même bouton.

Lancez une station, puis appuyez sur Enregistrer. Choisissez Continu pour un fichier par session, ou Diviser par piste pour que la session soit découpée à chaque changement de chanson. Laissez tourner, utilisez d'autres apps, et appuyez sur Stop quand vous avez fini. La session apparaît tout de suite dans l'onglet Enregistrements.

Diviser par piste est la partie à connaître. Il surveille les informations de chanson qui arrivent dans le flux et coupe à chaque changement, donc une émission de deux heures devient une liste de pistes nommées avec pochette au lieu d'un long fichier à parcourir. Quand une station n'envoie rien d'utile, ce que beaucoup font, Macdio déduit la chanson de l'audio qu'il a déjà en main, donc le nommage continue écran éteint et sans jamais demander l'autorisation micro. Le [guide sur l'identification des chansons](/guides/identify-song-on-radio.html) explique comment cette partie fonctionne.

Le compromis, c'est qu'un enregistreur intégré n'enregistre que ce que le lecteur peut lire. Il capture la radio Internet et rien d'autre, donc un appel vidéo ou un onglet de navigateur sont hors de portée.

## Méthode 2 : capturer tout le système avec Audio Hijack

Audio Hijack de Rogue Amoeba enregistre l'audio de n'importe quelle application sur un Mac, ou tout l'audio système d'un coup, donc il couvre les flux qui vivent dans un onglet de navigateur ou dans un lecteur sans enregistreur. La version 4.6.0 tourne de macOS 14.4 à macOS 27 et se télécharge gratuitement, avec des limitations tant que vous n'achetez pas de licence, d'après la page produit de Rogue Amoeba (vérifiée le 14 septembre 2026).

Vous choisissez l'application source, ajoutez un bloc enregistreur, et appuyez sur le bouton de lancement. C'est plus de réglages qu'un bouton d'enregistrement, et il y a un piège à anticiper : tout ce que le Mac joue atterrit dans le fichier. Une notification Slack à la quarantième minute reste dans l'enregistrement pour de bon. Il vous donne aussi un seul long fichier sans la moindre idée d'où une chanson commence ou finit, donc le travail de tracklist reste à faire après coup.

## Méthode 3 : Audacity plus un périphérique audio virtuel

Audacity est gratuit et open source, ce qui en fait la réponse habituelle sur les forums, mais macOS ne laisse pas une app enregistrer l'audio système toute seule. Il faut d'abord installer un périphérique audio virtuel, comme BlackHole, gratuit et open source, faire passer la sortie du Mac par lui, puis régler Audacity pour enregistrer depuis ce périphérique. Vous voudrez aussi entendre ce que vous enregistrez, ce qui demande un périphérique à sorties multiples dans Configuration audio et MIDI pour que le son atteigne à la fois vos haut-parleurs et l'enregistreur.

Ça marche, ça ne coûte rien, et c'est la plus laborieuse des trois. L'avantage, c'est qu'Audacity est un éditeur, donc couper, faire des fondus et exporter dans un format précis sont à portée de main une fois la capture terminée.

## Quelle méthode utiliser

Si la station est dans une app de radio, utilisez l'enregistreur de l'app. C'est la seule voie qui donne un audio propre et un découpage par piste sans logiciel supplémentaire. Si l'audio est ailleurs, ou si vous enregistrez une interview de podcast et un fond musical en même temps, Audio Hijack est l'outil fait pour ce travail. Audacity est le choix quand le budget est zéro et qu'un après-midi de réglages est acceptable.

## Comment enregistrer la radio sur un iPhone

Seule la première méthode existe ici. iOS ne donne à aucune app l'accès à la capture audio système, donc il n'y a pas d'équivalent d'Audio Hijack sur iPhone, et l'enregistrement d'écran ne sauvegardera pas non plus un flux propre. Un lecteur avec enregistrement intégré, c'est toute la liste.

Dans Macdio, c'est le même bouton que sur le Mac. Touchez Enregistrer pendant qu'une station joue, et l'enregistrement continue pendant que vous utilisez d'autres apps, parce que c'est le flux qui est écrit et non un micro qui écoute. Les enregistrements apparaissent dans l'onglet Enregistrements dès que vous arrêtez.

## Peut-on programmer un enregistrement ?

Pas dans Macdio. Il n'y a pas de minuteur qui lance une station jeudi à 21 h, et c'est sur la liste des demandes plutôt que dans l'app. Sur un Mac, Audio Hijack est ce qui s'en rapproche le plus aujourd'hui, ou une automatisation Raccourcis peut ouvrir une station à une heure donnée pendant que vous appuyez vous-même sur Enregistrer.

Ce que Macdio a, c'est la protection inverse : une session s'arrête d'elle-même après trois heures, pour qu'un enregistrement oublié ne dévore pas le disque pendant la nuit. La limite se règle dans les réglages quand vous enregistrez une longue émission, et le temps restant s'affiche pendant que l'enregistrement tourne.

## Ce qui arrête un enregistrement avant l'heure

Deux choses mettent fin à une session avant vous, et toutes deux sauvegardent le fichier plutôt que de le perdre. La première est la limite de trois heures ci-dessus. La deuxième est le disque. Macdio surveille l'espace libre pendant qu'il écrit, vous avertit toutes les cinq minutes dès que le disque passe sous 500 Mo, et arrête l'enregistrement avec une notification si l'espace devient critique, donc le pire cas est un fichier plus court plutôt qu'un disque plein et un fichier corrompu. Une longue session de nuit sur un portable presque plein est le cas à surveiller, parce qu'une station à 320 kbps écrit environ 144 Mo par heure.

## Quelle taille font les fichiers ?

Un enregistrement pèse autant que le flux, puisque rien n'est ajouté ni compressé davantage. À 128 kbps, le débit le plus courant, ça fait environ 58 Mo par heure, donc une soirée entière de radio fait à peu près 350 Mo. Une station à 320 kbps tourne autour de 2,4 Mo par minute, et une station de parole à bas débit peut faire le quart. Diviser par piste rend le calcul plus doux en pratique, parce que vous gardez les trois chansons que vous vouliez et supprimez le reste.

## Dans quel format sont les fichiers

Un enregistrement garde ce que la station envoie. Une station MP3 vous donne un .mp3 et une station AAC un .aac, sans rien de réencodé en route vers le disque, donc le fichier sonne exactement comme le flux. Les pistes que Diviser par piste découpe sont écrites en .m4a. Il n'y a aucun réglage de qualité à rater ici, parce qu'il n'y a pas de second encodage.

## Où vivent les enregistrements

Dans l'app, sur votre propre appareil, dans l'onglet Enregistrements où chaque session et chaque piste découpée peut être lue ou supprimée. Ils ne sont pas copiés dans votre bibliothèque musicale, ils n'apparaissent ni dans l'app Fichiers ni dans le Finder, et il n'y a pas de bouton de partage ou d'export. C'est une limite délibérée pour une fonction d'enregistrement personnel, pas quelque chose qui attend d'être terminé, et elle garde un enregistrement personnel vraiment personnel. Rien n'est envoyé nulle part.

## Enregistrer la radio Internet est-il légal ?

Enregistrer une émission pour sa propre écoute privée est une pratique de longue date dans la plupart des pays, la même tradition que d'enregistrer la FM sur une cassette. Ce qui reste personnel reste simple : ne redistribuez pas et ne republiez pas les enregistrements, et vérifiez les règles de votre propre pays en cas de doute. Ceci est une information générale et non un conseil juridique.

## Questions fréquentes

### Quelle est la qualité des enregistrements ?

Identique au flux. L'audio entrant est écrit tel qu'il arrive, sans réencodage, donc une station à 128 kbps donne un fichier à 128 kbps et une station à 320 kbps un fichier à 320 kbps.

### Puis-je exporter un enregistrement vers le Finder ou l'app Fichiers ?

Non. Les enregistrements restent dans l'app sur votre appareil, où vous pouvez les lire ou les supprimer. Il n'y a ni partage, ni export, ni synchronisation de fichiers iCloud pour eux.

### Puis-je enregistrer en utilisant d'autres apps ?

Oui. L'enregistrement capture le flux et non les haut-parleurs, donc il continue en arrière-plan sur Mac et iPhone pendant que vous faites autre chose, et écran éteint.

### Puis-je enregistrer sur Apple Watch ou Apple TV ?

Non. L'enregistrement est une fonction Mac, iPhone et iPad. Les apps montre et télé lisent les stations et pilotent la lecture.

### Comment enregistrer une émission de radio diffusée la nuit ?

Lancez l'enregistrement avant d'aller vous coucher et laissez la limite de trois heures y mettre fin, ou relevez cette limite dans les réglages si l'émission est plus longue. Il n'y a pas de programmateur qui lance un enregistrement tout seul.

## Prêt à essayer ?

Procurez-vous Macdio sur l'[App Store](https://apps.apple.com/app/macdio/id6761737888). Un seul achat, tous les appareils Apple, sans abonnement.
