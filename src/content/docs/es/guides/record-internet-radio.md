---
title: "Cómo grabar radio por internet en un Mac (paso a paso)"
description: "Tres formas de grabar radio por internet en un Mac, y qué funciona en iPhone: un reproductor que graba, una captura del audio del sistema o Audacity."
datePublished: 2026-08-09
lastUpdated: 2026-10-12
faq:
  - q: "¿Qué calidad tienen las grabaciones?"
    a: "Idéntica a la del stream. El audio entrante se escribe tal como llega, sin recodificar, así que una emisora a 128 kbps da un archivo a 128 kbps y una a 320 kbps da un archivo a 320 kbps."
  - q: "¿Puedo exportar una grabación al Finder o a la app Archivos?"
    a: "No. Las grabaciones se quedan dentro de la app en tu dispositivo, donde puedes reproducirlas o borrarlas. No hay compartir, exportar ni sincronización de archivos por iCloud para ellas."
  - q: "¿Puedo grabar mientras uso otras apps?"
    a: "Sí. La grabación captura el stream y no los altavoces, así que continúa en segundo plano en Mac e iPhone mientras haces otra cosa, y con la pantalla apagada."
  - q: "¿Puedo grabar en el Apple Watch o el Apple TV?"
    a: "No. Grabar es una función de Mac, iPhone e iPad. Las apps del reloj y de la tele reproducen emisoras y controlan la reproducción."
  - q: "¿Cómo grabo un programa de radio que se emite de noche?"
    a: "Empieza la grabación antes de irte a dormir y deja que el límite de tres horas la termine, o sube ese límite en los ajustes si el programa es más largo. No hay programador que inicie una grabación por su cuenta."
---

Tres formas de hacerlo, lo que te cuesta cada una y dónde acaban los archivos.

**La forma más fácil de grabar radio por internet en un Mac es un reproductor de radio con grabación integrada, porque guarda el propio stream y no necesita enrutar el audio. Grabar todo el sistema con una herramienta de captura también funciona, y es la única opción cuando el audio viene de una web o de una app que no puede grabar. En un iPhone solo existe el camino integrado.**

## Para qué grabar radio por internet

La mayoría de las peticiones se reducen a una de tres cosas: un programa que se emite mientras duermes o trabajas, una sesión de DJ que quieres conservar porque no se publicará nunca en ningún sitio, o un único tema que oíste una vez y quieres volver a encontrar. Los streams son en directo y no se almacena nada para ti, así que si lo quieres para después, tienes que cazarlo cuando pasa.

## Método 1: grabar con un reproductor que lo trae integrado

Un reproductor que graba escribe el stream entrante en el disco. No se recodifica nada, no se cuelan sonidos del sistema, y una notificación durante la grabación no acaba en el archivo. [Macdio](/mac.html) lo hace en el Mac y en el [iPhone](/iphone.html) con el mismo botón.

Reproduce una emisora y pulsa grabar. Elige Continuo para un archivo por sesión, o Dividir por pista para que la sesión se corte en cada cambio de canción. Déjalo en marcha, usa otras apps y pulsa detener cuando termines. La sesión aparece de inmediato en la pestaña Grabaciones.

Dividir por pista es la parte que merece la pena conocer. Vigila la información de canción que llega dentro del stream y corta en cada cambio, así que un programa de dos horas se convierte en una lista de pistas con nombre y carátula en lugar de un archivo largo por el que tienes que avanzar a ciegas. Cuando una emisora no envía nada útil, y muchas no lo hacen, Macdio deduce la canción a partir del audio que ya tiene en la mano, así que los nombres siguen llegando con la pantalla apagada y sin pedir nunca permiso de micrófono. La [guía de identificación de canciones](/guides/identify-song-on-radio.html) explica cómo funciona esa parte.

La contrapartida es que un grabador integrado solo graba lo que el reproductor puede reproducir. Captura radio por internet y nada más, así que una videollamada o una pestaña del navegador quedan fuera.

## Método 2: capturar todo el sistema con Audio Hijack

Audio Hijack, de Rogue Amoeba, graba el audio de cualquier aplicación en un Mac, o todo el audio del sistema a la vez, así que cubre los streams que viven en una pestaña del navegador o en un reproductor sin grabador. La versión 4.6.0 funciona de macOS 14.4 a macOS 27 y se puede descargar gratis, con limitaciones hasta que compras una licencia, según la página de producto de Rogue Amoeba (consultada el 14 de septiembre de 2026).

Eliges la aplicación de origen, añades un bloque de grabación y pulsas el botón de ejecutar. Es más configuración que un botón de grabar, y hay una pega que conviene prever: todo lo que suene en el Mac acaba en el archivo. Una notificación de Slack en el minuto cuarenta se queda en la grabación para siempre. También te da un único archivo largo sin ninguna idea de dónde empieza o termina una canción, así que el trabajo de la lista de temas te toca a ti después.

## Método 3: Audacity más un dispositivo de audio virtual

Audacity es gratuito y de código abierto, lo que lo convierte en la respuesta habitual en los foros, pero macOS no deja que una app grabe el audio del sistema por sí sola. Primero tienes que instalar un dispositivo de audio virtual, como BlackHole, gratuito y de código abierto, enrutar la salida del Mac a través de él y después configurar Audacity para grabar desde ese dispositivo. También querrás oír lo que grabas, lo que significa un dispositivo de salida múltiple en Configuración de Audio MIDI para que el sonido llegue tanto a tus altavoces como al grabador.

Funciona, no cuesta nada y es el más enrevesado de los tres. La ventaja es que Audacity es un editor, así que recortar, hacer fundidos y exportar en un formato concreto están ahí mismo en cuanto termina la captura.

## Qué método usar

Si la emisora está en una app de radio, usa el grabador de la propia app. Es el único camino que te da audio limpio y división por pista sin software extra. Si el audio está en otro sitio, o estás grabando una entrevista de podcast y una base musical a la vez, Audio Hijack es la herramienta hecha para ese trabajo. Audacity es la elección cuando el presupuesto es cero y una tarde de configuración es aceptable.

## Cómo grabar la radio en un iPhone

Aquí solo existe el primer método. iOS no da a ninguna app acceso a la captura de audio del sistema, así que no hay equivalente de Audio Hijack para iPhone, y la grabación de pantalla tampoco guardará un stream limpio. Un reproductor con grabación integrada es toda la lista.

En Macdio es el mismo botón que en el Mac. Toca grabar mientras suena una emisora, y la grabación continúa mientras usas otras apps, porque lo que se escribe es el stream y no un micrófono escuchando. Las grabaciones aparecen en la pestaña Grabaciones en cuanto detienes.

## ¿Se puede programar una grabación?

En Macdio no. No hay un temporizador que ponga una emisora a las 21:00 del jueves, y está en la lista de peticiones y no en la app. En un Mac, Audio Hijack es lo más parecido que existe hoy, o una automatización de Atajos puede abrir una emisora a una hora fija mientras tú pulsas grabar.

Lo que Macdio sí tiene es la protección contraria: una sesión se detiene sola a las tres horas, así que una grabación de la que te olvidaste no se come el disco durante la noche. El límite se puede ajustar en los ajustes cuando grabas un programa largo, y el tiempo restante se muestra mientras la grabación está en marcha.

## Qué detiene una grabación antes de tiempo

Dos cosas terminan una sesión antes que tú, y ambas guardan el archivo en lugar de perderlo. La primera es el límite de tres horas de arriba. La segunda es el disco. Macdio no empieza una grabación con menos de 500 MB libres, vigila el espacio libre mientras escribe, te avisa cada cinco minutos cuando la unidad baja de 500 MB y detiene la grabación con una notificación si el espacio se vuelve crítico, así que el peor caso es un archivo más corto y no un disco lleno con un archivo corrupto. Una sesión larga de noche en un portátil casi lleno es el caso a vigilar, porque una emisora a 320 kbps escribe unos 144 MB por hora.

## ¿Cuánto ocupan los archivos?

Una grabación pesa lo mismo que el stream, ya que no se añade ni se comprime nada más. A 128 kbps, el bitrate más común, son aproximadamente 58 MB por hora, así que una tarde entera de radio son unos 350 MB. Una emisora a 320 kbps son unos 2,4 MB por minuto, y una emisora de tertulia con bitrate bajo puede ser la cuarta parte. Dividir por pista hace la aritmética más amable en la práctica, porque te quedas las tres canciones que querías y borras el resto.

## En qué formato están los archivos

Una grabación conserva lo que envíe la emisora. Una emisora MP3 te da un .mp3 y una emisora AAC te da un .aac, sin recodificar nada de camino al disco, así que el archivo suena exactamente como sonaba el stream. Cuando Song ID ha puesto nombre a una canción en una grabación AAC, su título, su artista y su carátula se escriben en el archivo, que pasa a ser un .m4a. Aquí no hay ningún ajuste de calidad que puedas equivocar, porque el audio nunca se codifica una segunda vez.

## Dónde viven las grabaciones

Dentro de la app, en tu propio dispositivo, en la pestaña Grabaciones, donde cada sesión y cada pista dividida se puede reproducir o borrar. No se copian a tu biblioteca de música, no aparecen en la app Archivos ni en el Finder, y no hay botón de compartir ni de exportar. Es un límite deliberado para una función de grabación personal, no algo pendiente de terminar, y mantiene personal lo que es personal. No se sube nada a ningún sitio.

## ¿Es legal grabar radio por internet?

Grabar una emisión para tu propia escucha privada es una práctica de larga tradición en la mayoría de los países, la misma que grabar la FM en una casete. Lo que se queda en lo personal se queda en lo sencillo: no redistribuyas ni vuelvas a publicar las grabaciones, y consulta las normas de tu propio país si tienes dudas. Esto es información general y no asesoramiento legal.

## Preguntas frecuentes

### ¿Qué calidad tienen las grabaciones?

Idéntica a la del stream. El audio entrante se escribe tal como llega, sin recodificar, así que una emisora a 128 kbps da un archivo a 128 kbps y una a 320 kbps da un archivo a 320 kbps.

### ¿Puedo exportar una grabación al Finder o a la app Archivos?

No. Las grabaciones se quedan dentro de la app en tu dispositivo, donde puedes reproducirlas o borrarlas. No hay compartir, exportar ni sincronización de archivos por iCloud para ellas.

### ¿Puedo grabar mientras uso otras apps?

Sí. La grabación captura el stream y no los altavoces, así que continúa en segundo plano en Mac e iPhone mientras haces otra cosa, y con la pantalla apagada.

### ¿Puedo grabar en el Apple Watch o el Apple TV?

No. Grabar es una función de Mac, iPhone e iPad. Las apps del reloj y de la tele reproducen emisoras y controlan la reproducción.

### ¿Cómo grabo un programa de radio que se emite de noche?

Empieza la grabación antes de irte a dormir y deja que el límite de tres horas la termine, o sube ese límite en los ajustes si el programa es más largo. No hay programador que inicie una grabación por su cuenta.

## ¿Listo para probarlo?

Consigue Macdio en el [App Store](https://apps.apple.com/app/macdio/id6761737888). Una compra, todos los dispositivos Apple, sin suscripción.
