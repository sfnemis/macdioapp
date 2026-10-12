---
title: "Macdio dans Raccourcis : actions et automatisations radio"
description: "Les neuf actions de Macdio dans l'app Raccourcis, ce que fait chacune, et des automatisations qui lancent une station à 7 h ou le dernier épisode d'un podcast."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Quelles actions Macdio se trouvent dans l'app Raccourcis ?"
    a: "Neuf : Lire une station, Lire les favoris, Reprendre la radio, Arrêter la radio, Ouvrir le podcast, Lire le dernier épisode, Reprendre le podcast, Lire « À suivre » et Marquer ce moment. Elles sont là sur iPhone, iPad et Mac."
  - q: "Macdio peut-il lancer une station de radio automatiquement chaque matin ?"
    a: "Oui. Créez une automatisation à heure fixe dans l'app Raccourcis, ajoutez l'action Lire une station de Macdio et choisissez la station. Elle s'exécute à l'heure que vous avez réglée."
  - q: "Un raccourci peut-il arrêter Macdio à une heure précise ?"
    a: "Oui. Utilisez l'action Arrêter la radio dans une automatisation à heure fixe. Elle s'exécute sans ouvrir l'app. Une station s'arrête, et un épisode se met en pause en gardant sa position."
  - q: "Pourquoi ma station manque-t-elle dans le sélecteur de stations de Raccourcis ?"
    a: "Le sélecteur ne connaît que les stations enregistrées dans votre bibliothèque Macdio : les favoris, les stations que vous avez ajoutées vous-même et celles que vous avez écoutées. Écoutez la station une fois ou mettez-la en favori, puis tapez son nom dans le sélecteur."
  - q: "Pourquoi le sélecteur liste-t-il la même station plusieurs fois ?"
    a: "Chaque nom court prononcé a sa propre ligne, donc BBC Radio 1 peut aussi apparaître comme BBC 1 et BBC One. Toutes ces lignes lancent la même station."
  - q: "Les raccourcis Macdio fonctionnent-ils sur Apple TV ou Apple Watch ?"
    a: "Non. Les actions existent sur iPhone, iPad et Mac. L'Apple TV et l'Apple Watch n'ont pas d'actions Macdio."
---

Macdio ajoute neuf actions à l'app Raccourcis d'Apple sur iPhone, iPad et Mac. Avec elles, vous pouvez lancer une station, lire vos favoris, arrêter la radio ou lire un podcast depuis vos propres raccourcis et automatisations, par exemple une station qui démarre toute seule à 7 h en semaine. L'Apple TV et l'Apple Watch n'ont pas d'actions Macdio.

## Étapes rapides

Pour lancer une station à heure fixe chaque matin sur iPhone ou iPad :

1. Ouvrez l'app Raccourcis et allez dans Automatisation.
2. Créez une nouvelle automatisation personnelle et choisissez le déclencheur Heure de la journée.
3. Réglez l'heure et les jours, et laissez-la s'exécuter immédiatement.
4. Ajoutez une action, cherchez Macdio et choisissez « Lire une station ».
5. Touchez « Station », choisissez votre station et enregistrez.

Les écrans d'automatisation appartiennent à l'app Raccourcis d'Apple, pas à Macdio, donc leurs libellés peuvent varier un peu selon la version d'iOS. Les éléments de Macdio (« Lire une station » et son champ « Station ») portent toujours les noms ci-dessus.

## Toutes les actions Macdio de l'app Raccourcis

| Action | Ce que vous choisissez | Ce qu'elle fait | Ouvre Macdio |
|---|---|---|---|
| « Lire une station » | « Station » | Lit cette station. | Oui |
| « Lire les favoris » | Rien | Lance la première station dans l'ordre de vos favoris. Vos autres favoris forment la liste que suivant et précédent parcourent. | Oui |
| « Reprendre la radio » | Rien | Reprend une station ou un épisode en pause. Si rien n'est en pause, elle lit ce que vous avez entendu le plus récemment, la dernière station ou le dernier épisode en cours. Si vous n'avez jamais rien écouté, elle lance votre premier favori par ordre alphabétique. | Oui |
| « Arrêter la radio » | Rien | Arrête une station. Un épisode se met en pause et garde sa position. | Non |
| « Ouvrir le podcast » | « Podcast » | Ouvre la page de cette émission dans Macdio. | Oui |
| « Lire le dernier épisode » | « Podcast » | Lit le dernier épisode de cette émission. | Non |
| « Reprendre le podcast » | Rien | Reprend l'épisode que vous avez écouté en dernier. | Non |
| « Lire « À suivre » » | Rien | Lit le premier élément d'À suivre. | Non |
| « Marquer ce moment » | Rien | Enregistre la seconde en cours de l'épisode comme surlignage, avec la phrase tirée de sa transcription. | Non |

Les actions marquées Non s'exécutent en arrière-plan. « Lire le dernier épisode », « Reprendre le podcast » et « Lire « À suivre » » lancent le son sans mettre Macdio au premier plan, donc elles conviennent aux automatisations qui ne doivent pas prendre l'écran. Plus de détails sur les surlignages dans [transcriptions et surlignages](/guides/podcast-transcripts-and-highlights.html).

## Comment le sélecteur trouve vos stations

Quand vous touchez « Station » dans « Lire une station », Macdio propose jusqu'à 20 stations : vos favoris d'abord, de A à Z, puis les stations écoutées le plus récemment. Chaque station affiche aussi ses noms courts prononcés sur des lignes séparées, avec le nom complet en dessous, donc « BBC Radio 1 », « BBC 1 » et « BBC One » peuvent toutes apparaître. Elles lancent toutes la même station.

Taper dans le sélecteur cherche par nom parmi toutes les stations de votre bibliothèque Macdio et affiche jusqu'à 20 résultats. Votre bibliothèque, ce sont vos favoris, les stations que vous avez ajoutées vous-même et celles que vous avez écoutées. Une station de l'annuaire que vous n'avez jamais ouverte n'y est pas encore, alors écoutez-la une fois ou mettez-la d'abord en favori. S'il vous faut un flux absent de l'annuaire, voir [comment ajouter une station personnalisée](/guides/add-a-custom-station.html).

Le sélecteur « Podcast » de « Ouvrir le podcast » et « Lire le dernier épisode » liste les émissions auxquelles vous êtes abonné, là aussi avec les noms courts en lignes supplémentaires.

## Trois automatisations qui valent le coup

### Lancer votre station du matin

Suivez les étapes rapides ci-dessus. Si vous utilisez « Lire les favoris » au lieu de « Lire une station », vos autres favoris se rangent derrière le premier, et un double appui sur vos AirPods passe au favori suivant. Le [guide AirPods et commandes des écouteurs](/guides/airpods-and-headphone-controls.html) explique le fonctionnement de cette liste.

Pour la fin de la journée, une seconde automatisation à heure fixe avec « Arrêter la radio » coupe la radio à minuit sans ouvrir l'app. Le minuteur de sommeil de Macdio fait le même travail depuis le lecteur, voir [minuteur de sommeil et mode horloge](/guides/sleep-timer-and-clock-mode.html).

### Lancer une station quand un mode de concentration s'active

L'app Raccourcis peut exécuter une automatisation quand un mode de concentration s'active ou se désactive. Ce déclencheur appartient à Apple, cherchez-le donc dans la liste des déclencheurs d'automatisation personnelle. Choisissez votre mode Travail, réglez l'exécution à l'activation, et ajoutez « Lire une station » avec la station sur laquelle vous aimez travailler. Une seconde automatisation, à la désactivation, avec « Arrêter la radio », y met fin.

### Écouter le dernier épisode d'une émission chaque matin

Créez une automatisation à heure fixe, ajoutez « Lire le dernier épisode », puis choisissez l'émission. Elle lit le dernier épisode complet de l'émission sans ouvrir Macdio. Si le flux a été vérifié il y a plus d'une heure, Macdio l'actualise d'abord, mais n'attend qu'environ 6 secondes. Si l'actualisation prend plus de temps, il lit le dernier épisode qu'il connaît déjà. Seules les émissions auxquelles vous êtes abonné peuvent être choisies ; [les podcasts dans Macdio](/guides/podcasts-in-macdio.html) explique comment s'abonner.

## Est-ce que ça marche sur Mac ?

Oui. Les neuf mêmes actions apparaissent dans l'app Raccourcis du Mac, et elles pilotent le lecteur du Mac. Vous pouvez les placer dans n'importe quel raccourci que vous y créez.

## Où sont les phrases Siri ?

Chaque action ci-dessus répond aussi à des phrases parlées, comme « Lire [station] sur Macdio » ou « Arrêter Macdio ». La liste complète, avec les langues où elles fonctionnent, se trouve dans le [guide Siri](/guides/siri-radio.html).

## Limites à connaître

- Il n'y a pas d'actions Macdio sur Apple TV ni sur Apple Watch.
- Seules les stations de votre bibliothèque peuvent être choisies. Si vous supprimez plus tard une station, un raccourci enregistré qui la lit ne la retrouve plus, alors choisissez de nouveau la station.
- « Marquer ce moment » demande un épisode en cours de lecture qui a une transcription. Sinon, l'action répond « Aucun épisode en cours de lecture. » ou « Cet épisode n'a pas encore de transcription, il n'y a donc aucune phrase à marquer. »
- Juste après le démarrage de l'app, une action peut répondre « Macdio est encore en train de démarrer. Réessayez dans un instant. »
- Quand et comment une automatisation s'exécute, par exemple iPhone verrouillé, c'est iOS qui le décide. Essayez une nouvelle automatisation une fois à un moment où vous regardez, pour savoir qu'elle démarre comme prévu.

## Questions fréquentes

### Quelles actions Macdio se trouvent dans l'app Raccourcis ?

Neuf : « Lire une station », « Lire les favoris », « Reprendre la radio », « Arrêter la radio », « Ouvrir le podcast », « Lire le dernier épisode », « Reprendre le podcast », « Lire « À suivre » » et « Marquer ce moment ». Elles sont là sur iPhone, iPad et Mac.

### Macdio peut-il lancer une station de radio automatiquement chaque matin ?

Oui. Créez une automatisation à heure fixe dans l'app Raccourcis, ajoutez l'action « Lire une station » de Macdio et choisissez la station. Elle s'exécute à l'heure que vous avez réglée.

### Un raccourci peut-il arrêter Macdio à une heure précise ?

Oui. Utilisez l'action « Arrêter la radio » dans une automatisation à heure fixe. Elle s'exécute sans ouvrir l'app. Une station s'arrête, et un épisode se met en pause en gardant sa position.

### Pourquoi ma station manque-t-elle dans le sélecteur de stations de Raccourcis ?

Le sélecteur ne connaît que les stations enregistrées dans votre bibliothèque Macdio : les favoris, les stations que vous avez ajoutées vous-même et celles que vous avez écoutées. Écoutez la station une fois ou mettez-la en favori, puis tapez son nom dans le sélecteur.

### Pourquoi le sélecteur liste-t-il la même station plusieurs fois ?

Chaque nom court prononcé a sa propre ligne, donc BBC Radio 1 peut aussi apparaître comme BBC 1 et BBC One. Toutes ces lignes lancent la même station.

### Les raccourcis Macdio fonctionnent-ils sur Apple TV ou Apple Watch ?

Non. Les actions existent sur iPhone, iPad et Mac. L'Apple TV et l'Apple Watch n'ont pas d'actions Macdio.

## Essayez

Procurez-vous Macdio sur l'[App Store](https://apps.apple.com/app/macdio/id6761737888), écoutez une station une fois, puis construisez votre première automatisation autour d'elle. Un seul achat couvre tous les appareils Apple, sans abonnement.
