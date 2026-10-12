---
title: "Modifier vos stations Macdio depuis un ordinateur en Wi-Fi"
description: "Modifier sur l'ordinateur ouvre vos stations Macdio dans un navigateur du même Wi-Fi, depuis iPhone, iPad ou Apple TV. Ajout, import, export JSON, CSV ou M3U."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Quels appareils ont Modifier sur l'ordinateur ?"
    a: "L'iPhone, l'iPad et l'Apple TV. Le Mac a déjà un clavier et modifie les stations dans l'app. L'Apple Watch et CarPlay ne l'ont pas."
  - q: "Pourquoi mon ordinateur n'arrive-t-il pas à ouvrir l'adresse ?"
    a: "Les deux appareils doivent être sur le même Wi-Fi, l'écran de l'éditeur doit rester ouvert, et sur iPhone et iPad Macdio a besoin de l'autorisation réseau local. L'adresse peut changer à chaque démarrage."
  - q: "L'éditeur modifie-t-il les stations de l'annuaire ?"
    a: "Non. Seules les stations que vous avez ajoutées vous-même apparaissent dans le navigateur, et les stations de l'annuaire ne sont jamais modifiées."
  - q: "Puis-je importer une playlist M3U de stations ?"
    a: "Oui. Collez le texte de la playlist dans Import, cliquez sur Add to list, puis sur Save. Import accepte aussi le JSON et le CSV."
  - q: "L'éditeur est-il sûr sur un Wi-Fi partagé ?"
    a: "Il demande un code à 6 chiffres, nouveau à chaque démarrage, se ferme après 5 codes faux et ne tourne que tant que l'écran de l'éditeur est ouvert. La connexion est en http simple à l'intérieur de votre réseau."
  - q: "Que devient une station que je supprime dans le navigateur ?"
    a: "Dès que vous cliquez sur Save, elle est supprimée sur tous les appareils. Save remplace votre liste de stations personnalisées par le tableau de la page, donc rechargez d'abord la page si vous avez modifié des stations ailleurs."
---

Modifier sur l'ordinateur vous permet de gérer les stations que vous avez ajoutées vous-même depuis le navigateur de n'importe quel ordinateur sur le même Wi-Fi, avec un vrai clavier. Vous le lancez dans les Réglages de Macdio sur iPhone, iPad ou Apple TV, vous ouvrez l'adresse affichée, vous tapez le code à 6 chiffres, et vous obtenez un tableau où ajouter, modifier, réordonner, importer et exporter vos stations. Rien ne passe par un serveur. Le navigateur parle uniquement à votre appareil.

Le Mac ne l'a pas. Là, vous ajoutez les stations avec « Ajouter une station… » et vous les modifiez d'un clic droit, voir [ajouter une station personnalisée](/guides/add-a-custom-station.html).

## Étapes rapides

1. Sur iPhone ou iPad, ouvrez Réglages, « Stations Personnalisées », « Modifier sur l'ordinateur ». Sur Apple TV, ouvrez Réglages, allez sur la carte « Modifier sur l'ordinateur » et choisissez « Ouvrir ».
2. Lancez l'éditeur avec « Démarrer l'éditeur » (même libellé sur iPhone, iPad et Apple TV).
3. Tapez l'adresse affichée sur l'appareil dans un navigateur de votre ordinateur.
4. Saisissez le code à 6 chiffres.
5. Faites vos changements et cliquez sur « Save ».

## Comment lancer l'éditeur sur iPhone ou iPad

Allez dans Réglages, « Stations Personnalisées », « Modifier sur l'ordinateur » (sur iPhone, les Réglages sont sous Plus, sauf si vous les avez placés dans la barre d'onglets) et touchez « Démarrer l'éditeur ». La première fois, iOS demande si Macdio peut trouver des appareils sur votre réseau local. Autorisez-le, sinon le navigateur ne peut pas joindre l'iPhone ou l'iPad.

Une fois lancé, la section « Prêt » affiche « Sur votre ordinateur, ouvrez » avec l'adresse, et « Saisissez ensuite ce code » avec le code masqué par des points jusqu'à ce que vous touchiez « Afficher ». « Arrêter l'éditeur » y met fin.

## Comment lancer l'éditeur sur Apple TV

Ouvrez Réglages, allez sur la carte « Modifier sur l'ordinateur » (« Éditeur de mes stations ») et choisissez « Ouvrir ». Sur l'écran « Modifier sur l'ordinateur », appuyez sur « Démarrer l'éditeur ».

La TV affiche « Ouvrir cette adresse » avec l'adresse en gros caractères et « Puis saisissez ce code » avec les 6 chiffres, toujours visibles. « Arrêter l'éditeur », « OK » ou le bouton Menu le ferment. S'il ne peut pas démarrer, « Réessayer » vous est proposé.

## Que pouvez-vous faire dans le navigateur ?

L'adresse est une adresse http simple, faite de l'adresse Wi-Fi de l'appareil et d'un numéro de port. Le port est choisi à nouveau à chaque démarrage, donc l'adresse peut différer de la dernière fois, et le code change lui aussi à chaque démarrage. La page du navigateur est en anglais, donc ses boutons gardent ici leur nom anglais.

La page demande d'abord le code. Un code faux donne « That code did not work. Check the code on your device. »

Ensuite, vous voyez « My Stations » avec le nombre de stations, plus « Reload » et « Save ». La barre d'outils a un champ de filtre (par nom, adresse ou tag), « Add station », « Scan a website », « Import », « Export » et un bouton qui trie le tableau par nom. Les colonnes sont une étoile, Name, Stream URL, Logo URL, Country et Tags.

Chaque ligne a une poignée pour la déplacer, une étoile qui met la station en favori, « Logo » pour trouver un logo, « Test » pour demander à votre appareil si le flux se lit, et « ✕ » pour retirer la ligne. Sur un petit écran, des flèches haut et bas remplacent le glisser-déposer. Quand deux lignes utilisent la même adresse, la page les signale avec « Another row uses this same address ».

« Scan a website » utilise le même outil de recherche que l'app : il liste chaque canal du site d'une station avec un choix de qualité, et « Add selected » les ajoute au tableau.

L'ordre des lignes devient l'ordre de Mes stations dans l'app. Rien n'arrive sur votre appareil avant que vous cliquiez sur « Save », et l'état affiche alors « Saved to device ». À partir de là, les changements se synchronisent par iCloud avec vos autres appareils.

## Comment importer des stations en JSON, CSV ou M3U

« Import » prend du texte que vous collez :

- JSON : une liste de stations, chacune avec « name » et « streamURL », et en option « logoURL », « country » et « tags ».
- CSV : une ligne d'en-tête `name,stream,logo,country,tags,favorite`, puis une station par ligne.
- M3U : une ligne `#EXTINF:-1,` avec le nom de la station, suivie de l'adresse du flux.

Les boutons « Fill with a JSON example », « Fill with a CSV example » et « Fill with an M3U example » mettent un exemple qui fonctionne dans la zone de texte. Voici celui en M3U :

```
#EXTM3U
#EXTINF:-1,Radio Paradise
https://stream.radioparadise.com/aac-320
```

« Add to list » ajoute les lignes au tableau. Elles arrivent sur l'appareil quand vous cliquez sur « Save ».

## Comment exporter vos stations

« Export » affiche vos stations en JSON, CSV et M3U sur un même écran et propose « JSON file », « CSV file » et « M3U file ». Les téléchargements s'appellent macdio-stations.json, macdio-stations.csv et macdio-stations.m3u.

## Ce que Save fait à votre liste de stations

Save remplace votre liste de stations personnalisées par le tableau de la page. Votre appareil garde les lignes que vous voyez et supprime chacune de vos stations qui n'est pas dans le tableau, et iCloud porte cette suppression sur tous les appareils. Concrètement :

- Une ligne retirée avec « ✕ » est supprimée sur tous les appareils à l'enregistrement, et la page ne demande pas confirmation.
- Si vous avez ajouté ou modifié des stations sur un autre appareil après le chargement de cette page, cliquez sur « Reload » avant de modifier. Un enregistrement depuis une page ancienne remet l'ancien tableau.
- Gardez l'adresse de chaque ligne, qui doit commencer par http:// ou https://. Une ligne dont l'adresse est vide ou n'a pas ce début est écartée à l'enregistrement, et la station correspondante est supprimée. Le navigateur n'ajoute pas « https:// » pour vous comme le fait l'app.

## Quand l'éditeur s'arrête-t-il ?

Il ne tourne que tant que vous le gardez ouvert. Il s'arrête quand vous appuyez sur arrêter, quand vous quittez l'écran de l'éditeur, quand Macdio passe en arrière-plan ou quand vous fermez l'onglet du navigateur. Il s'arrête aussi quand le navigateur est resté silencieux 2 minutes, quand aucun navigateur ne se connecte dans les 5 minutes, et après 5 codes faux. L'écran du téléphone ou de la TV reste allumé pendant qu'il tourne.

## Limites à connaître

- Les deux appareils doivent être sur le même réseau.
- Le tableau contient jusqu'à 500 stations, et une seule analyse de site tourne à la fois.
- Les stations de l'annuaire et vos listes restent en dehors de l'éditeur. Changez-les dans l'app, voir [favoris, listes et synchronisation](/guides/favorites-lists-and-sync.html).
- Le JSON de cette page et le JSON de « Exporter les stations… » sur Mac sont des formats différents. Relisez chacun avec son propre import.

## Questions fréquentes

### Quels appareils ont Modifier sur l'ordinateur ?

L'iPhone, l'iPad et l'Apple TV. Le Mac a déjà un clavier et modifie les stations dans l'app. L'Apple Watch et CarPlay ne l'ont pas.

### Pourquoi mon ordinateur n'arrive-t-il pas à ouvrir l'adresse ?

Les deux appareils doivent être sur le même Wi-Fi, l'écran de l'éditeur doit rester ouvert, et sur iPhone et iPad Macdio a besoin de l'autorisation réseau local. L'adresse peut changer à chaque démarrage.

### L'éditeur modifie-t-il les stations de l'annuaire ?

Non. Seules les stations que vous avez ajoutées vous-même apparaissent dans le navigateur, et les stations de l'annuaire ne sont jamais modifiées.

### Puis-je importer une playlist M3U de stations ?

Oui. Collez le texte de la playlist dans « Import », cliquez sur « Add to list », puis sur « Save ». « Import » accepte aussi le JSON et le CSV.

### L'éditeur est-il sûr sur un Wi-Fi partagé ?

Il demande un code à 6 chiffres, nouveau à chaque démarrage, se ferme après 5 codes faux et ne tourne que tant que l'écran de l'éditeur est ouvert. La connexion est en http simple à l'intérieur de votre réseau.

### Que devient une station que je supprime dans le navigateur ?

Dès que vous cliquez sur « Save », elle est supprimée sur tous les appareils. Save remplace votre liste de stations personnalisées par le tableau de la page, donc rechargez d'abord la page si vous avez modifié des stations ailleurs.

## Essayez

Procurez-vous Macdio sur l'[App Store](https://apps.apple.com/app/macdio/id6761737888), ajoutez quelques stations, puis ouvrez Modifier sur l'ordinateur sur votre iPhone, iPad ou Apple TV. Un seul achat, tous les appareils Apple, sans abonnement.
