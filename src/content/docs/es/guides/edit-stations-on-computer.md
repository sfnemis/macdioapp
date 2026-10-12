---
title: "Edita tus emisoras de Macdio desde un navegador por Wi-Fi"
description: "Abre tus emisoras de Macdio en un navegador de la misma Wi-Fi desde iPhone, iPad o Apple TV. Añádelas, edítalas, impórtalas y expórtalas en JSON, CSV o M3U."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "¿Qué dispositivos tienen Editar en el ordenador?"
    a: "iPhone, iPad y Apple TV. El Mac ya tiene teclado y edita las emisoras en la app. El Apple Watch y CarPlay no lo tienen."
  - q: "¿Por qué mi ordenador no puede abrir la dirección?"
    a: "Los dos dispositivos tienen que estar en la misma Wi-Fi, la pantalla del editor tiene que seguir abierta y, en iPhone y iPad, Macdio necesita permiso de red local. La dirección puede cambiar cada vez que lo inicias."
  - q: "¿El editor cambia las emisoras del directorio?"
    a: "No. En el navegador solo aparecen las emisoras que añadiste tú, y las del directorio no se cambian nunca."
  - q: "¿Puedo importar una lista M3U de emisoras?"
    a: "Sí. Pega el texto de la lista en Import, haz clic en Add to list y después en Save. Import también acepta JSON y CSV."
  - q: "¿Es seguro el editor en una Wi-Fi compartida?"
    a: "Pide un código de 6 cifras que es nuevo cada vez que lo inicias, se cierra tras 5 códigos erróneos y solo funciona mientras la pantalla del editor está abierta. La conexión es http simple dentro de tu red."
  - q: "¿Qué pasa con una emisora que quito en el navegador?"
    a: "En cuanto haces clic en Save, se borra en todos los dispositivos. Save sustituye tu lista de emisoras personalizadas por la tabla de la página, así que recarga antes la página si cambiaste emisoras en otro sitio."
---

Editar en el ordenador te deja gestionar las emisoras que añadiste tú desde un navegador en cualquier ordenador de la misma Wi-Fi, con un teclado de verdad. Lo inicias en los Ajustes de Macdio en iPhone, iPad o Apple TV, abres la dirección que muestra, escribes el código de 6 cifras y te aparece una tabla donde puedes añadir, editar, reordenar, importar y exportar tus emisoras. Nada pasa por un servidor. El navegador habla solo con tu dispositivo. La página del navegador está en inglés, así que sus botones aparecen abajo con su nombre en inglés.

El Mac no lo tiene. Ahí añades emisoras con "Añadir emisora…" y las editas con un clic derecho; consulta [añadir una emisora personalizada](/guides/add-a-custom-station.html).

## Pasos rápidos

1. En el iPhone o el iPad, abre Ajustes, "Estaciones Personalizadas", "Editar en el ordenador". En el Apple TV, abre Ajustes, ve a la tarjeta "Editar en el ordenador" y elige "Abrir".
2. Inicia el editor con "Iniciar el editor", que se llama igual en iPhone, iPad y Apple TV.
3. Escribe en un navegador de tu ordenador la dirección que aparece en el dispositivo.
4. Introduce el código de 6 cifras.
5. Haz tus cambios y haz clic en "Save".

## Cómo iniciar el editor en el iPhone o el iPad

Ve a Ajustes, "Estaciones Personalizadas", "Editar en el ordenador" (en el iPhone, Ajustes está en Más salvo que lo hayas pasado a la barra de pestañas) y toca "Iniciar el editor". La primera vez, iOS pregunta si Macdio puede buscar dispositivos en tu red local. Permítelo, o el navegador no podrá llegar al iPhone o al iPad.

Cuando está en marcha, la sección "Listo" muestra "En tu ordenador, abre" con la dirección, y "Después escribe este código" con el código oculto tras puntos hasta que tocas "Mostrar". "Detener el editor" lo termina.

## Cómo iniciar el editor en el Apple TV

Abre Ajustes, ve a la tarjeta "Editar en el ordenador" ("Editor de mis emisoras") y elige "Abrir". En la pantalla "Editar en el ordenador", pulsa "Iniciar el editor".

La tele muestra "Abrir esta dirección" con la dirección en letra grande y "Luego introduce este código" con las 6 cifras, siempre visibles. "Detener el editor", "OK" o el botón Menú lo cierran. Si no puede arrancar, ofrece "Reintentar".

## ¿Qué puedes hacer en el navegador?

La dirección es una dirección http simple formada por la dirección Wi-Fi del dispositivo y un número de puerto. El puerto se elige de nuevo cada vez que lo inicias, así que la dirección puede ser distinta de la última vez, y el código también es nuevo cada vez.

La página pide primero el código. Uno erróneo da "That code did not work. Check the code on your device." (ese código no ha funcionado; revisa el código en tu dispositivo).

Después ves "My Stations" con un recuento, más "Reload" (recargar) y "Save" (guardar). La barra de herramientas tiene un campo de filtro (por nombre, dirección o etiqueta), "Add station" (añadir emisora), "Scan a website" (analizar una web), "Import", "Export" y un botón que ordena la tabla por nombre. Las columnas son una estrella, Name, Stream URL, Logo URL, Country y Tags.

Cada fila tiene un tirador para arrastrar, una estrella que hace favorita la emisora, "Logo" para buscar un logo, "Test" para preguntar a tu dispositivo si el stream suena, y "✕" para quitar la fila. En una pantalla pequeña, unas flechas arriba y abajo sustituyen al arrastre. Cuando dos filas usan la misma dirección, la página las marca con "Another row uses this same address" (otra fila usa esta misma dirección).

"Scan a website" usa el mismo buscador que la app: muestra todos los canales de la web de una emisora con un selector de calidad, y "Add selected" (añadir los seleccionados) los mete en la tabla.

El orden de las filas pasa a ser el orden de Mis emisoras en la app. Nada llega a tu dispositivo hasta que haces clic en "Save", y entonces el estado dice "Saved to device" (guardado en el dispositivo). Desde ahí los cambios se sincronizan por iCloud con tus otros dispositivos.

## Cómo importar emisoras desde JSON, CSV o M3U

"Import" acepta texto que pegas:

- JSON: una lista de emisoras, cada una con "name" y "streamURL", y opcionalmente "logoURL", "country" y "tags".
- CSV: una línea de cabecera `name,stream,logo,country,tags,favorite` y después una emisora por línea.
- M3U: una línea `#EXTINF:-1,` con el nombre de la emisora, seguida de la dirección del stream.

Los botones "Fill with a JSON example", "Fill with a CSV example" y "Fill with an M3U example" ponen en el cuadro un ejemplo que funciona. Este es el de M3U:

```
#EXTM3U
#EXTINF:-1,Radio Paradise
https://stream.radioparadise.com/aac-320
```

"Add to list" (añadir a la lista) añade las filas a la tabla. Llegan al dispositivo cuando haces clic en "Save".

## Cómo exportar tus emisoras

"Export" muestra tus emisoras como JSON, CSV y M3U en una sola pantalla y ofrece "JSON file", "CSV file" y "M3U file". Las descargas se llaman macdio-stations.json, macdio-stations.csv y macdio-stations.m3u.

## Qué hace Save con tu lista de emisoras

Save sustituye tu lista de emisoras personalizadas por la tabla de la página. Tu dispositivo se queda con las filas que ves y borra cada emisora tuya que no esté en la tabla, e iCloud lleva ese borrado a todos los dispositivos. En la práctica:

- Una fila que quitas con "✕" se borra en todos los dispositivos al guardar, y la página no pregunta antes.
- Si añadiste o cambiaste emisoras en otro dispositivo después de cargar esta página, haz clic en "Reload" antes de editar. Guardar desde una página antigua vuelve a poner la tabla antigua.
- Conserva la dirección de cada fila, empezando por http:// o https://. Una fila cuya dirección está vacía o no tiene ese principio se descarta al pulsar Save, y la emisora a la que pertenecía se borra. El navegador no te añade "https://" como hace la app.

## ¿Cuándo se detiene el editor?

Solo funciona mientras lo mantienes abierto. Se detiene cuando pulsas detener, cuando sales de la pantalla del editor, cuando Macdio pasa a segundo plano o cuando cierras la pestaña del navegador. También se detiene cuando el navegador lleva 2 minutos sin dar señales, cuando ningún navegador se conecta en 5 minutos y tras 5 códigos erróneos. La pantalla del teléfono o de la tele sigue encendida mientras funciona.

## Límites que conviene conocer

- Los dos dispositivos tienen que estar en la misma red.
- La tabla admite hasta 500 emisoras, y solo se analiza una web cada vez.
- Las emisoras del directorio y tus listas se quedan fuera del editor. Cámbialas en la app; consulta [favoritos, listas y sincronización](/guides/favorites-lists-and-sync.html).
- El JSON de esta página y el JSON de "Exportar emisoras…" en el Mac son formatos distintos. Vuelve a leer cada uno con su propia importación.

## Preguntas frecuentes

### ¿Qué dispositivos tienen Editar en el ordenador?

iPhone, iPad y Apple TV. El Mac ya tiene teclado y edita las emisoras en la app. El Apple Watch y CarPlay no lo tienen.

### ¿Por qué mi ordenador no puede abrir la dirección?

Los dos dispositivos tienen que estar en la misma Wi-Fi, la pantalla del editor tiene que seguir abierta y, en iPhone y iPad, Macdio necesita permiso de red local. La dirección puede cambiar cada vez que lo inicias.

### ¿El editor cambia las emisoras del directorio?

No. En el navegador solo aparecen las emisoras que añadiste tú, y las del directorio no se cambian nunca.

### ¿Puedo importar una lista M3U de emisoras?

Sí. Pega el texto de la lista en Import, haz clic en Add to list y después en Save. Import también acepta JSON y CSV.

### ¿Es seguro el editor en una Wi-Fi compartida?

Pide un código de 6 cifras que es nuevo cada vez que lo inicias, se cierra tras 5 códigos erróneos y solo funciona mientras la pantalla del editor está abierta. La conexión es http simple dentro de tu red.

### ¿Qué pasa con una emisora que quito en el navegador?

En cuanto haces clic en Save, se borra en todos los dispositivos. Save sustituye tu lista de emisoras personalizadas por la tabla de la página, así que recarga antes la página si cambiaste emisoras en otro sitio.

## Pruébalo

Consigue Macdio en el [App Store](https://apps.apple.com/app/macdio/id6761737888), añade unas cuantas emisoras y abre Editar en el ordenador en tu iPhone, iPad o Apple TV. Una compra, todos los dispositivos Apple, sin suscripción.
