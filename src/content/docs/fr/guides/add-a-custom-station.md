---
title: "Ajouter votre propre station de radio à Macdio par son URL"
description: "Ajoutez un flux de radio Internet à Macdio par son adresse sur iPhone, iPad ou Mac, testez-le, donnez-lui un logo, modifiez-le. Sur Apple TV, via un navigateur."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Quelles adresses de flux Macdio accepte-t-il ?"
    a: "Tout flux radio en http ou https : MP3, AAC, HLS (.m3u8), les liens de playlist en .pls, .m3u, .asx ou .xspf, et les anciens serveurs SHOUTcast. Un épisode de podcast n'est pas accepté comme station."
  - q: "Et si je ne connais que le site web de la station ?"
    a: "Collez le site dans le champ d'adresse et utilisez Analyser. Macdio liste les flux qu'il y trouve, chacun avec un menu de qualité, et vous en choisissez un."
  - q: "Pourquoi Macdio affiche-t-il « Tap Add again to save it anyway » ?"
    a: "Macdio n'a pas pu joindre le flux en vérifiant l'adresse. Un second appui sur Ajouter enregistre quand même la station, ce qui aide quand une station n'est en panne que pour un moment."
  - q: "Mes stations personnalisées apparaissent-elles sur mes autres appareils ?"
    a: "Oui. Elles se synchronisent par iCloud avec votre Mac, iPhone, iPad et Apple TV, et l'Apple Watch les reçoit de l'iPhone."
  - q: "Puis-je donner un logo à une station personnalisée ?"
    a: "Oui. Choisissez Auto, Lien (l'adresse d'une image), Mon image (une image de Photos ou de Fichiers) ou Aucun. Votre propre image s'affiche sur tous vos appareils."
---

Vous pouvez ajouter n'importe quelle station de radio Internet à Macdio par l'adresse de son flux, sur iPhone, iPad et Mac. Touchez « + » dans la Bibliothèque, choisissez « Ajouter une station personnalisée » (sur Mac, « Ajouter une station… »), collez l'URL, nommez la station et ajoutez-la. Macdio vérifie que l'adresse envoie vraiment du son avant d'enregistrer, puis la station se synchronise par iCloud avec vos autres appareils, Apple TV comprise.

L'annuaire compte plus de 60 000 stations et en oublie quand même, souvent de petites stations locales. Si vous n'avez pas encore l'adresse, [comment trouver l'URL du flux d'une station](/guides/find-radio-stream-url.html) indique où chercher.

## Étapes rapides

Sur iPhone ou iPad :

1. Ouvrez la Bibliothèque et touchez « + ».
2. Choisissez « Ajouter une station personnalisée ».
3. Collez l'adresse dans « Adresse du flux ou site web de la station ».
4. Touchez « Analyser » pour confirmer le flux et remplir le nom, ou tapez vous-même un « Nom de la station ».
5. Touchez « Ajouter ».

## Où est le bouton d'ajout sur chaque appareil ?

| Appareil | Où le trouver | Bouton qui enregistre |
|---|---|---|
| iPhone et iPad | Bibliothèque, « + », « Ajouter une station personnalisée », ou Réglages, « Stations Personnalisées », « Ajouter une station personnalisée » | « Ajouter » |
| Mac | Bibliothèque, « + », « Ajouter une station… » | « Ajouter une station » |
| Apple TV | Réglages, « Modifier sur l'ordinateur », puis un navigateur sur le même Wi-Fi | « Save » dans le navigateur |
| Apple Watch et CarPlay | Pas de formulaire d'ajout. Ils lisent les stations de votre bibliothèque | |

Sur iPhone, les Réglages sont sous Plus, sauf si vous les avez placés dans la barre d'onglets.

## Comment ajouter une station sur iPhone ou iPad

Dans la fiche « Station personnalisée », « Analyser » (ou la touche Retour) vérifie ce que vous avez tapé dans « Adresse du flux ou site web de la station ». Un flux est confirmé et un nom vide est rempli. Un site web donne la liste des flux qu'il contient, chacun avec un menu de qualité et un bouton « Utiliser ». « Logo », « Pays » et les « Tags » séparés par des virgules sont facultatifs. « Tester l'URL du flux » répond « Le flux est accessible ! » quand tout va bien. « Ajouter » reste grisé tant que le nom ou l'adresse est vide, ou pendant un test ou une analyse.

## Comment ajouter une station sur Mac

Dans la Bibliothèque, cliquez sur « + » et choisissez « Ajouter une station… ». La fiche « Ajouter une station personnalisée » contient « Nom de la station », « URL du flux » avec un bouton « Analyser », « Logo de la station », « Pays (facultatif) » et « Tags (séparés par des virgules, optionnel) ». Dès que vous tapez une adresse, « Tester le flux » apparaît, et un flux valide affiche « Stream is reachable » avec son codec et son débit. Cliquez sur « Ajouter une station » ou appuyez sur Retour.

## Quelles URL de flux fonctionnent dans Macdio ?

- Les adresses qui commencent par http ou https. Si vous omettez le début, Macdio essaie d'abord « https:// », puis « http:// » tout court.
- Les flux MP3 et AAC directs.
- Les flux HLS : une adresse qui se termine par .m3u8, ou un serveur qui répond avec une playlist HLS.
- Les liens de playlist qui se terminent par .pls, .m3u, .asx ou .xspf. Macdio ouvre la playlist et utilise son premier flux.
- Les serveurs SHOUTcast, y compris les anciens qui répondent « ICY 200 OK ».

Un fichier de durée fixe, comme un épisode de podcast ou un jingle, n'est pas accepté comme station.

## Ce que Macdio vérifie quand vous touchez Ajouter

Ce qui ne peut pas être une adresse donne « Invalid URL format. Please check the URL. » (format d'URL invalide). Une deuxième station avec le même nom et la même adresse donne « A station with this name and URL already exists. » (la station existe déjà).

Ensuite, Macdio interroge le serveur et attend jusqu'à 6 secondes. Si l'adresse est un site web, rien n'est enregistré et l'analyse se lance pour que vous choisissiez l'un de ses flux. Si le serveur est injoignable, vous voyez la raison et « Tap Add again to save it anyway. » (sur Mac, « Click Add again to save it anyway. »). Un second appui l'enregistre quand même.

La nouvelle station apparaît sous « Mes stations ». Elle ne devient un favori que si vous lui mettez une étoile (voir [favoris, listes et synchronisation](/guides/favorites-lists-and-sync.html)).

## Comment donner un logo à une station personnalisée

La commande « Logo » (sur Mac, « Logo de la station ») propose quatre choix :

- « Auto » cherche la station sur Logo.dev d'après son nom et son adresse.
- « Lien » prend un lien direct vers un fichier image, celui que donne Copier l'adresse de l'image, en .png ou .jpg. Si vous collez une page qui contient le logo, Macdio la remplace par l'image quand il la trouve.
- « Mon image » utilise votre propre image : « Photos » ou « Fichiers » sur iPhone et iPad (iCloud Drive fonctionne), « Choisir une image… » sur Mac. Elle est stockée avec la station, donc elle s'affiche sur tous vos appareils.
- « Aucun » affiche l'illustration de Macdio.

Pour le changer plus tard, faites un appui prolongé sur la station sur iPhone ou iPad, ou un clic droit sur Mac, et choisissez « Logo de la station… ». Cela marche aussi pour les stations de l'annuaire, avec Auto, Mon image et Aucun. Lien est réservé aux stations que vous avez ajoutées vous-même.

## Comment modifier ou supprimer une station personnalisée

Sur iPhone et iPad, faites un appui prolongé sur la station et choisissez « Modifier la station », ou balayez sa ligne vers la droite et touchez « Modifier ». Changez ce qu'il faut et touchez « Enregistrer ». Pour la supprimer, balayez la ligne vers la gauche dans « Mes stations », touchez « Supprimer » et confirmez avec « Supprimer ». La confirmation précise que la station disparaît de tous les appareils et de toutes les listes où elle figure.

Sur Mac, faites un clic droit sur la station et choisissez « Modifier la station » (puis « Enregistrer les modifications ») ou « Supprimer la station », qui demande aussi confirmation.

Enregistrer une modification ne teste pas une adresse changée, alors utilisez d'abord le bouton de test. Les stations de l'annuaire ne se modifient pas, mais « Renommer… » (iPhone et iPad) et « Renommer la station… » (Mac) leur donnent le nom de votre choix, et « Réinitialiser le nom » rétablit l'original.

## Ajouter une station sur Apple TV

La TV n'a pas de formulaire d'ajout. Lancez « Modifier sur l'ordinateur » dans ses Réglages, et le navigateur d'un ordinateur sur le même Wi-Fi reçoit un tableau de vos propres stations, URL du logo comprise ([pas à pas](/guides/edit-stations-on-computer.html)). De toute façon, les stations ajoutées sur iPhone, iPad ou Mac arrivent sur la TV par iCloud.

## Limites à connaître

- Ajouter une station demande une connexion, car la vérification, l'analyse et la recherche du logo passent toutes par Internet.
- L'analyse d'un site peut prendre jusqu'à une minute, et certains sites cachent si bien leur lecteur qu'aucun flux n'est trouvé.
- L'iPhone et l'iPad n'importent pas de fichiers de listes de stations. Pour beaucoup de stations d'un coup, utilisez l'import de l'[éditeur dans le navigateur](/guides/edit-stations-on-computer.html).
- CarPlay et [Siri](/guides/siri-radio.html) trouvent une station personnalisée dès qu'elle est en favori ou que vous l'avez écoutée récemment. CarPlay l'affiche aussi dans vos listes.

## Questions fréquentes

### Quelles adresses de flux Macdio accepte-t-il ?

Tout flux radio en http ou https : MP3, AAC, HLS (.m3u8), les liens de playlist en .pls, .m3u, .asx ou .xspf, et les anciens serveurs SHOUTcast. Un épisode de podcast n'est pas accepté comme station.

### Et si je ne connais que le site web de la station ?

Collez le site dans le champ d'adresse et utilisez « Analyser ». Macdio liste les flux qu'il y trouve, chacun avec un menu de qualité, et vous en choisissez un.

### Pourquoi Macdio affiche-t-il « Tap Add again to save it anyway » ?

Macdio n'a pas pu joindre le flux en vérifiant l'adresse. Un second appui sur « Ajouter » enregistre quand même la station, ce qui aide quand une station n'est en panne que pour un moment.

### Mes stations personnalisées apparaissent-elles sur mes autres appareils ?

Oui. Elles se synchronisent par iCloud avec votre Mac, iPhone, iPad et Apple TV, et l'Apple Watch les reçoit de l'iPhone.

### Puis-je donner un logo à une station personnalisée ?

Oui. Choisissez « Auto », « Lien » (l'adresse d'une image), « Mon image » (une image de Photos ou de Fichiers) ou « Aucun ». Votre propre image s'affiche sur tous vos appareils.

## Essayez

Procurez-vous Macdio sur l'[App Store](https://apps.apple.com/app/macdio/id6761737888) et ajoutez la station qui manque à l'annuaire. Un seul achat couvre iPhone, iPad, Mac, Apple TV et Apple Watch, sans abonnement.
