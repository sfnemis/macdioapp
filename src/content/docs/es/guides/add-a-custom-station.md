---
title: "Cómo añadir tu propia emisora a Macdio con la URL del stream"
description: "Añade cualquier stream de radio a Macdio por su dirección en iPhone, iPad o Mac, pruébalo, ponle logo y edítalo o bórralo. En el Apple TV, con un navegador."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "¿Qué direcciones de stream acepta Macdio?"
    a: "Cualquier stream de radio http o https: MP3, AAC, HLS (.m3u8), enlaces de listas que terminan en .pls, .m3u, .asx o .xspf, y servidores SHOUTcast antiguos. Un episodio de podcast no se acepta como emisora."
  - q: "¿Y si solo conozco la web de la emisora?"
    a: "Pega la web en el campo de la dirección y usa Analizar. Macdio muestra los streams que encuentra ahí, cada uno con un menú de calidad, y tú eliges uno."
  - q: "¿Por qué Macdio dice \"Toca Añadir otra vez para guardarla de todos modos\"?"
    a: "Macdio no pudo llegar al stream cuando comprobó la dirección. Un segundo toque guarda la emisora igualmente, lo que viene bien cuando una emisora solo está caída un rato."
  - q: "¿Mis emisoras personalizadas aparecen en mis otros dispositivos?"
    a: "Sí. Se sincronizan por iCloud con tu Mac, iPhone, iPad y Apple TV, y el Apple Watch las recibe del iPhone."
  - q: "¿Puedo ponerle un logo propio a una emisora personalizada?"
    a: "Sí. Elige Automático, Enlace (la dirección de una imagen), Mi imagen (una foto de Fotos o Archivos) o Ninguno. Tu propia imagen aparece en todos tus dispositivos."
---

Puedes añadir cualquier emisora de radio por internet a Macdio por la dirección de su stream en iPhone, iPad y Mac. Toca "+" en Biblioteca, elige "Añadir emisora personalizada" (en el Mac, "Añadir emisora…"), pega la URL, ponle nombre a la emisora y añádela. Macdio comprueba que la dirección envía audio de verdad antes de guardarla, y después la emisora se sincroniza por iCloud con tus otros dispositivos, el Apple TV incluido.

El directorio tiene más de 60.000 emisoras y aun así le faltan algunas, a menudo pequeñas y locales. Si todavía no tienes la dirección, [cómo encontrar la URL del stream de una emisora](/guides/find-radio-stream-url.html) te dice dónde buscar.

## Pasos rápidos

En el iPhone o el iPad:

1. Abre Biblioteca y toca "+".
2. Elige "Añadir emisora personalizada".
3. Pega la dirección en "Dirección del flujo o web de la emisora".
4. Toca "Analizar" para confirmar el stream y rellenar el nombre, o escribe tú un "Nombre de la emisora".
5. Toca "Añadir".

## ¿Dónde está el botón de añadir en cada dispositivo?

| Dispositivo | Dónde encontrarlo | Botón que guarda |
|---|---|---|
| iPhone y iPad | Biblioteca, "+", "Añadir emisora personalizada", o Ajustes, "Estaciones Personalizadas", "Añadir emisora personalizada" | "Añadir" |
| Mac | Biblioteca, "+", "Añadir emisora…" | "Añadir emisora" |
| Apple TV | Ajustes, "Editar en el ordenador", y después un navegador en la misma Wi-Fi | "Save" en el navegador |
| Apple Watch y CarPlay | Sin formulario para añadir. Reproducen las emisoras de tu biblioteca | |

En el iPhone, Ajustes está en Más salvo que lo hayas pasado a la barra de pestañas.

## Cómo añadir una emisora en el iPhone o el iPad

En la hoja "Emisora personalizada", "Analizar" (o Intro) comprueba lo que escribiste en "Dirección del flujo o web de la emisora". Un stream queda confirmado y un nombre vacío se rellena. Una web te da una lista de los streams que contiene, cada uno con un menú de calidad y un botón "Usar". "Logo", "País" y las "Etiquetas" separadas por comas son opcionales. "Probar URL del flujo" responde "¡El flujo es accesible!" cuando todo va bien. "Añadir" sigue en gris mientras el nombre o la dirección estén vacíos, o mientras corre una prueba o un análisis.

## Cómo añadir una emisora en el Mac

En Biblioteca, haz clic en "+" y elige "Añadir emisora…". La hoja "Añadir emisora personalizada" tiene "Nombre de la emisora", "URL del flujo" con un botón "Analizar", "Logo de la emisora", "País (opcional)" y "Etiquetas (separadas por comas, opcional)". En cuanto escribes una dirección aparece "Probar flujo", y un stream que funciona responde "El flujo es accesible" con su códec y su bitrate. Haz clic en "Añadir emisora" o pulsa Intro.

## ¿Qué URL de stream funcionan en Macdio?

- Direcciones que empiezan por http o https. Si dejas fuera el principio, Macdio prueba primero con "https://" y después con "http://" a secas.
- Streams MP3 y AAC directos.
- Streams HLS: una dirección que termina en .m3u8, o un servidor que responde con una lista HLS.
- Enlaces de listas que terminan en .pls, .m3u, .asx o .xspf. Macdio abre la lista y usa su primer stream.
- Servidores SHOUTcast, incluidos los antiguos que responden "ICY 200 OK".

Un archivo de duración fija, como un episodio de podcast o una sintonía, no se acepta como emisora.

## Qué comprueba Macdio cuando tocas Añadir

Algo que no puede ser una dirección da "Formato de URL no válido. Revisa la URL." Una segunda emisora con el mismo nombre y la misma dirección da "Ya existe una emisora con este nombre y esta URL."

Después Macdio pregunta al servidor y espera hasta 6 segundos. Si la dirección es una web, no se guarda nada y se hace el análisis para que elijas uno de sus streams. Si no se puede llegar al servidor, ves el motivo y "Toca Añadir otra vez para guardarla de todos modos." (en el Mac, "Haz clic en Añadir otra vez para guardarla de todos modos."). Un segundo toque la guarda.

La emisora nueva aparece en "Mis emisoras". Solo se convierte en favorita cuando le pones la estrella (consulta [favoritos, listas y sincronización](/guides/favorites-lists-and-sync.html)).

## Cómo ponerle logo a una emisora personalizada

El control "Logo" (en el Mac, "Logo de la emisora") tiene cuatro opciones:

- "Automático" busca la emisora en Logo.dev por su nombre y su dirección.
- "Enlace" acepta un enlace directo a un archivo de imagen, el que te da Copiar dirección de la imagen, terminado en .png o .jpg. Si pegas una página que lleva el logo, Macdio pone la imagen en su lugar cuando la encuentra.
- "Mi imagen" usa una imagen tuya: "Fotos" o "Archivos" en iPhone y iPad (iCloud Drive funciona), "Elegir imagen…" en el Mac. Se guarda con la emisora, así que aparece en todos tus dispositivos.
- "Ninguno" dibuja la imagen propia de Macdio.

Para cambiarlo más adelante, mantén pulsada la emisora en el iPhone o el iPad, o haz clic derecho en ella en el Mac, y elige "Logo de la emisora…". Eso también funciona con las emisoras del directorio, con Automático, Mi imagen y Ninguno. Enlace es solo para las emisoras que añadiste tú.

## Cómo editar o borrar una emisora personalizada

En el iPhone y el iPad, mantén pulsada la emisora y elige "Editar emisora", o desliza a la derecha sobre su fila y toca "Editar". Cambia lo que necesites y toca "Guardar". Para borrarla, desliza a la izquierda sobre la fila en "Mis emisoras", toca "Eliminar" y confírmalo con "Eliminar". La confirmación avisa de que la emisora desaparece de todos los dispositivos y de todas las listas en las que esté.

En el Mac, haz clic derecho en la emisora y elige "Editar emisora" (y luego "Guardar cambios") o "Eliminar emisora", que también pregunta antes.

Guardar una edición no prueba una dirección cambiada, así que usa antes el botón de prueba. Las emisoras del directorio no se pueden editar, pero "Renombrar…" (iPhone y iPad) y "Renombrar emisora…" (Mac) les ponen un nombre tuyo, y "Restablecer nombre" recupera el original.

## Añadir una emisora en el Apple TV

La tele no tiene formulario para añadir. Inicia "Editar en el ordenador" en sus Ajustes y un navegador en un ordenador conectado a la misma Wi-Fi recibe una tabla con tus propias emisoras, URL del logo incluida ([paso a paso](/guides/edit-stations-on-computer.html)). Las emisoras añadidas en iPhone, iPad o Mac llegan igualmente a la tele por iCloud.

## Límites que conviene conocer

- Añadir una emisora necesita conexión, porque la comprobación, el análisis y la búsqueda del logo se hacen en línea.
- El análisis de una web puede tardar hasta un minuto, y algunas webs esconden tan bien su reproductor que no se encuentra ningún stream.
- iPhone y iPad no importan listas de emisoras desde archivo. Para muchas emisoras a la vez, usa Import en el [editor en el navegador](/guides/edit-stations-on-computer.html).
- CarPlay y [Siri](/guides/siri-radio.html) encuentran una emisora personalizada cuando es favorita o la has reproducido hace poco. CarPlay también la muestra dentro de tus listas.

## Preguntas frecuentes

### ¿Qué direcciones de stream acepta Macdio?

Cualquier stream de radio http o https: MP3, AAC, HLS (.m3u8), enlaces de listas que terminan en .pls, .m3u, .asx o .xspf, y servidores SHOUTcast antiguos. Un episodio de podcast no se acepta como emisora.

### ¿Y si solo conozco la web de la emisora?

Pega la web en el campo de la dirección y usa Analizar. Macdio muestra los streams que encuentra ahí, cada uno con un menú de calidad, y tú eliges uno.

### ¿Por qué Macdio dice "Toca Añadir otra vez para guardarla de todos modos"?

Macdio no pudo llegar al stream cuando comprobó la dirección. Un segundo toque guarda la emisora igualmente, lo que viene bien cuando una emisora solo está caída un rato.

### ¿Mis emisoras personalizadas aparecen en mis otros dispositivos?

Sí. Se sincronizan por iCloud con tu Mac, iPhone, iPad y Apple TV, y el Apple Watch las recibe del iPhone.

### ¿Puedo ponerle un logo propio a una emisora personalizada?

Sí. Elige Automático, Enlace (la dirección de una imagen), Mi imagen (una foto de Fotos o Archivos) o Ninguno. Tu propia imagen aparece en todos tus dispositivos.

## Pruébalo

Consigue Macdio en el [App Store](https://apps.apple.com/app/macdio/id6761737888) y añade esa emisora que el directorio no tiene. Una compra cubre iPhone, iPad, Mac, Apple TV y Apple Watch, sin suscripción.
