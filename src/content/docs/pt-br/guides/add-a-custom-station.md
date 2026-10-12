---
title: "Como adicionar sua rádio ao Macdio pela URL do stream"
description: "Adicione qualquer stream de rádio ao Macdio pelo endereço no iPhone, iPad ou Mac, teste, dê um logo e depois edite ou apague. Na Apple TV, use um navegador."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Quais endereços de stream o Macdio aceita?"
    a: "Qualquer stream de rádio http ou https: MP3, AAC, HLS (.m3u8), links de playlist terminados em .pls, .m3u, .asx ou .xspf, e servidores SHOUTcast antigos. Um episódio de podcast não é aceito como estação."
  - q: "E se eu só souber o site da estação?"
    a: "Cole o site no campo do endereço e use Escanear. O Macdio lista os streams que encontra ali, cada um com um menu de qualidade, e você escolhe um."
  - q: "Por que o Macdio diz \"Toque em Adicionar de novo para salvar mesmo assim\"?"
    a: "O Macdio não conseguiu alcançar o stream quando verificou o endereço. Um segundo toque salva a estação mesmo assim, o que ajuda quando uma estação está fora do ar só por um tempo."
  - q: "Minhas estações personalizadas aparecem nos meus outros aparelhos?"
    a: "Sim. Elas sincronizam pelo iCloud com o Mac, iPhone, iPad e Apple TV, e o Apple Watch as recebe do iPhone."
  - q: "Posso dar um logo próprio a uma estação personalizada?"
    a: "Sim. Escolha Automático, Link (o endereço de uma imagem), Minha Imagem (uma foto de Fotos ou Arquivos) ou Nenhum. Sua própria imagem aparece em todos os seus aparelhos."
---

Você pode adicionar qualquer rádio da internet ao Macdio pelo endereço do stream no iPhone, no iPad e no Mac. Toque em "+" na Biblioteca, escolha "Adicionar Estação Personalizada" (no Mac, "Adicionar Estação…"), cole a URL, dê um nome à estação e adicione. O Macdio confere se o endereço realmente manda áudio antes de salvar, e a estação depois sincroniza pelo iCloud com seus outros aparelhos, Apple TV inclusive.

O diretório tem mais de 60.000 estações e mesmo assim deixa algumas de fora, muitas vezes as pequenas e locais. Se você ainda não tem o endereço, [como encontrar a URL do stream de uma estação](/guides/find-radio-stream-url.html) mostra onde procurar.

## Passos rápidos

No iPhone ou no iPad:

1. Abra a Biblioteca e toque em "+".
2. Escolha "Adicionar Estação Personalizada".
3. Cole o endereço em "Endereço da transmissão ou site da estação".
4. Toque em "Escanear" para confirmar o stream e preencher o nome, ou digite você mesmo um "Nome da Estação".
5. Toque em "Adicionar".

## Onde fica o botão de adicionar em cada aparelho?

| Aparelho | Onde encontrar | Botão que salva |
|---|---|---|
| iPhone e iPad | Biblioteca, "+", "Adicionar Estação Personalizada", ou Configurações, "Estações personalizadas", "Adicionar Estação Personalizada" | "Adicionar" |
| Mac | Biblioteca, "+", "Adicionar Estação…" | "Adicionar estação" |
| Apple TV | Configurações, "Editar no computador", depois um navegador na mesma rede Wi-Fi | "Save" no navegador (a página é em inglês) |
| Apple Watch e CarPlay | Sem formulário para adicionar. Eles tocam as estações da sua biblioteca | |

No iPhone, as Configurações ficam em Mais, a não ser que você as tenha levado para a barra de abas.

## Como adicionar uma estação no iPhone ou no iPad

Na folha "Estação Personalizada", "Escanear" (ou Return) verifica o que você digitou em "Endereço da transmissão ou site da estação". Um stream é confirmado e um nome vazio é preenchido. Um site gera a lista dos streams que há nele, cada um com um menu de qualidade e um botão "Usar". "Logo", "País" e "Tags" separadas por vírgula são opcionais. "Testar URL do Stream" responde "Stream acessível!" quando está tudo certo. "Adicionar" fica cinza enquanto o nome ou o endereço está vazio, ou enquanto um teste ou uma varredura está rodando.

## Como adicionar uma estação no Mac

Na Biblioteca, clique em "+" e escolha "Adicionar Estação…". A folha "Adicionar Estação Personalizada" tem "Nome da Estação", "URL do Stream" com um botão "Escanear", "Logo da Estação", "País (opcional)" e "Tags (separadas por vírgula, opcional)". Assim que você digita um endereço, aparece "Testar stream", e um stream bom responde "Stream acessível" com o codec e o bitrate. Clique em "Adicionar estação" ou pressione Return.

## Quais URLs de stream funcionam no Macdio?

- Endereços que começam com http ou https. Se você deixar o começo de fora, o Macdio tenta primeiro "https://" e depois o "http://" simples.
- Streams MP3 e AAC diretos.
- Streams HLS: um endereço terminado em .m3u8, ou um servidor que responde com uma playlist HLS.
- Links de playlist terminados em .pls, .m3u, .asx ou .xspf. O Macdio abre a playlist e usa o primeiro stream dela.
- Servidores SHOUTcast, inclusive os antigos que respondem "ICY 200 OK".

Um arquivo com duração fixa, como um episódio de podcast ou uma vinheta, não é aceito como estação.

## O que o Macdio verifica quando você toca em Adicionar

Algo que não pode ser um endereço gera "Formato de URL inválido. Verifique a URL." Uma segunda estação com o mesmo nome e o mesmo endereço gera "Já existe uma estação com este nome e esta URL."

Depois o Macdio consulta o servidor, esperando até 6 segundos. Se o endereço for um site, nada é salvo e a varredura roda para você escolher um dos streams dele. Se o servidor não responder, você vê o motivo e "Toque em Adicionar de novo para salvar mesmo assim." (no Mac, "Clique em Adicionar de novo para salvar mesmo assim."). Um segundo toque salva.

A estação nova aparece em "Minhas Estações". Ela só vira favorita quando você marca a estrela (veja [favoritos, listas e sincronização](/guides/favorites-lists-and-sync.html)).

## Como dar um logo a uma estação personalizada

O controle "Logo" (no Mac, "Logo da Estação") tem quatro opções:

- "Automático" procura a estação no Logo.dev pelo nome e pelo endereço.
- "Link" aceita um link direto para um arquivo de imagem, do tipo que você pega com Copiar Endereço da Imagem, terminado em .png ou .jpg. Se você colar uma página que traz o logo, o Macdio troca pela imagem quando consegue encontrá-la.
- "Minha Imagem" usa uma imagem sua: "Fotos" ou "Arquivos" no iPhone e no iPad (o iCloud Drive funciona), "Escolher Imagem…" no Mac. Ela fica guardada com a estação, então aparece em todos os seus aparelhos.
- "Nenhum" desenha a arte própria do Macdio.

Para mudar depois, toque e segure a estação no iPhone ou no iPad, ou clique com o botão direito nela no Mac, e escolha "Logo da Estação…". Isso funciona também com estações do diretório, com Automático, Minha Imagem e Nenhum. Link é só para estações que você mesmo adicionou.

## Como editar ou apagar uma estação personalizada

No iPhone e no iPad, toque e segure a estação e escolha "Editar Estação", ou deslize para a direita na linha dela e toque em "Editar". Mude o que precisar e toque em "Salvar". Para apagar, deslize para a esquerda na linha em "Minhas Estações", toque em "Remover" e confirme com "Excluir". A confirmação avisa que a estação sai de todos os aparelhos e de todas as listas em que está.

No Mac, clique com o botão direito na estação e escolha "Editar Estação" (depois "Salvar Alterações") ou "Excluir Estação", que também pergunta antes.

Salvar uma edição não testa um endereço alterado, então use o botão de teste antes. Estações do diretório não podem ser editadas, mas "Renomear…" (iPhone e iPad) e "Renomear estação…" (Mac) dão a elas um nome seu, e "Redefinir nome" traz o original de volta.

## Adicionar uma estação na Apple TV

A TV não tem formulário para adicionar. Inicie "Editar no computador" nas Configurações dela e um navegador num computador na mesma rede Wi-Fi recebe uma tabela com as suas estações, com a URL do logo inclusive ([passo a passo](/guides/edit-stations-on-computer.html)). As estações adicionadas no iPhone, iPad ou Mac chegam à TV pelo iCloud de qualquer forma.

## Limites que vale conhecer

- Adicionar uma estação precisa de conexão, porque a verificação, a varredura e a busca do logo acontecem online.
- A varredura de um site pode levar até um minuto, e alguns sites escondem tão bem o player que nenhum stream é encontrado.
- iPhone e iPad não importam listas de estações de um arquivo. Para muitas estações de uma vez, use "Import" no [editor no navegador](/guides/edit-stations-on-computer.html).
- O CarPlay e a [Siri](/guides/siri-radio.html) acham uma estação personalizada quando ela é favorita ou foi tocada recentemente. O CarPlay também a mostra dentro das suas listas.

## Perguntas frequentes

### Quais endereços de stream o Macdio aceita?

Qualquer stream de rádio http ou https: MP3, AAC, HLS (.m3u8), links de playlist terminados em .pls, .m3u, .asx ou .xspf, e servidores SHOUTcast antigos. Um episódio de podcast não é aceito como estação.

### E se eu só souber o site da estação?

Cole o site no campo do endereço e use Escanear. O Macdio lista os streams que encontra ali, cada um com um menu de qualidade, e você escolhe um.

### Por que o Macdio diz "Toque em Adicionar de novo para salvar mesmo assim"?

O Macdio não conseguiu alcançar o stream quando verificou o endereço. Um segundo toque salva a estação mesmo assim, o que ajuda quando uma estação está fora do ar só por um tempo.

### Minhas estações personalizadas aparecem nos meus outros aparelhos?

Sim. Elas sincronizam pelo iCloud com o Mac, iPhone, iPad e Apple TV, e o Apple Watch as recebe do iPhone.

### Posso dar um logo próprio a uma estação personalizada?

Sim. Escolha Automático, Link (o endereço de uma imagem), Minha Imagem (uma foto de Fotos ou Arquivos) ou Nenhum. Sua própria imagem aparece em todos os seus aparelhos.

## Experimente

Baixe o Macdio na [App Store](https://apps.apple.com/app/macdio/id6761737888) e adicione aquela estação que falta no diretório. Uma compra cobre iPhone, iPad, Mac, Apple TV e Apple Watch, sem assinatura.
