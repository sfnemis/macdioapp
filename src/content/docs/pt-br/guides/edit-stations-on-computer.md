---
title: "Edite suas estações do Macdio no navegador do computador"
description: "Editar no Computador abre suas estações num navegador na mesma rede Wi-Fi, pelo iPhone, iPad ou Apple TV. Adicione, edite, importe e exporte JSON, CSV ou M3U."
datePublished: 2026-10-13
lastUpdated: 2026-10-13
faq:
  - q: "Quais aparelhos têm Editar no Computador?"
    a: "iPhone, iPad e Apple TV. O Mac já tem teclado e edita as estações no próprio app. Apple Watch e CarPlay não têm."
  - q: "Por que meu computador não abre o endereço?"
    a: "Os dois aparelhos precisam estar na mesma rede Wi-Fi, a tela do editor precisa ficar aberta e, no iPhone e no iPad, o Macdio precisa de permissão de rede local. O endereço pode mudar a cada início."
  - q: "O editor altera estações do diretório?"
    a: "Não. Só as estações que você mesmo adicionou aparecem no navegador, e as estações do diretório nunca são alteradas."
  - q: "Posso importar uma playlist M3U de estações?"
    a: "Sim. Cole o texto da playlist em Import, clique em Add to list e depois em Save. O Import também aceita JSON e CSV."
  - q: "O editor é seguro numa rede Wi-Fi compartilhada?"
    a: "Ele pede um código de 6 dígitos que muda a cada início, fecha depois de 5 códigos errados e só funciona enquanto a tela do editor está aberta. A conexão é http simples dentro da sua rede."
  - q: "O que acontece com uma estação que eu removo no navegador?"
    a: "Assim que você clica em Save, ela é apagada em todos os aparelhos. O Save substitui sua lista de estações personalizadas pela tabela da página, então recarregue a página antes se você mudou estações em outro lugar."
---

Editar no Computador permite cuidar das estações que você mesmo adicionou a partir do navegador de qualquer computador na mesma rede Wi-Fi, com um teclado de verdade. Você inicia o editor nas Configurações do Macdio no iPhone, iPad ou Apple TV, abre o endereço que aparece, digita o código de 6 dígitos e recebe uma tabela onde dá para adicionar, editar, reordenar, importar e exportar suas estações. Nada passa por um servidor. O navegador conversa só com o seu aparelho. A página no navegador é em inglês, então os botões dela aparecem abaixo com o nome original.

O Mac não tem esse editor. Lá você adiciona estações com "Adicionar Estação…" e edita com o botão direito, veja [adicionar uma estação personalizada](/guides/add-a-custom-station.html).

## Passos rápidos

1. No iPhone ou no iPad, abra Configurações, "Estações personalizadas", "Editar no Computador". Na Apple TV, abra Configurações, vá até o cartão "Editar no computador" e escolha "Abrir".
2. Inicie o editor com "Iniciar o editor", que tem o mesmo nome no iPhone, no iPad e na Apple TV.
3. Digite o endereço que aparece no aparelho num navegador do seu computador.
4. Digite o código de 6 dígitos.
5. Faça as mudanças e clique em "Save" (salvar).

## Como iniciar o editor no iPhone ou no iPad

Vá em Configurações, "Estações personalizadas", "Editar no Computador" (no iPhone, as Configurações ficam em Mais, a não ser que você as tenha levado para a barra de abas) e toque em "Iniciar o editor". Na primeira vez, o iOS pergunta se o Macdio pode encontrar aparelhos na sua rede local. Permita, senão o navegador não alcança o iPhone ou o iPad.

Com o editor rodando, a seção "Pronto" mostra "No seu computador, abra" com o endereço, e "Depois digite este código" com o código escondido em pontinhos até você tocar em "Mostrar". "Parar o editor" encerra tudo.

## Como iniciar o editor na Apple TV

Abra Configurações, vá até o cartão "Editar no computador" ("Editor de minhas estações") e escolha "Abrir". Na tela "Editar no computador", pressione "Iniciar o editor".

A TV mostra "Abrir este endereço" com o endereço em letras grandes e "Depois digite este código" com os 6 dígitos, sempre visíveis. "Parar o editor", "OK" ou o botão Menu fecham o editor. Se ele não conseguir iniciar, aparece "Tentar de novo".

## O que dá para fazer no navegador?

O endereço é um endereço http simples, formado pelo endereço Wi-Fi do aparelho e um número de porta. A porta é escolhida de novo a cada início, então o endereço pode ser diferente da última vez, e o código também muda a cada início.

A página primeiro pede o código. Um código errado mostra "That code did not work. Check the code on your device." (o código não funcionou, confira o código no seu aparelho).

Depois disso você vê "My Stations" (minhas estações) com a contagem, mais "Reload" (recarregar) e "Save" (salvar). A barra de ferramentas tem um campo de filtro (por nome, endereço ou tag), "Add station" (adicionar estação), "Scan a website" (escanear um site), "Import" (importar), "Export" (exportar) e um botão que ordena a tabela por nome. As colunas são uma estrela, Name, Stream URL, Logo URL, Country e Tags.

Cada linha tem uma alça para arrastar, uma estrela que torna a estação favorita, "Logo" para encontrar um logo, "Test" para perguntar ao seu aparelho se o stream toca, e "✕" para remover a linha. Numa tela pequena, setas para cima e para baixo substituem o arrastar. Quando duas linhas usam o mesmo endereço, a página marca as duas com "Another row uses this same address" (outra linha usa este mesmo endereço).

"Scan a website" usa o mesmo localizador do app: lista todos os canais do site de uma estação com um seletor de qualidade, e "Add selected" (adicionar selecionados) coloca os canais na tabela.

A ordem das linhas vira a ordem de Minhas Estações no app. Nada chega ao seu aparelho até você clicar em "Save", e então o status mostra "Saved to device" (salvo no aparelho). A partir daí as mudanças sincronizam pelo iCloud com seus outros aparelhos.

## Como importar estações de JSON, CSV ou M3U

"Import" aceita texto que você cola:

- JSON: uma lista de estações, cada uma com "name" e "streamURL" e, se quiser, "logoURL", "country" e "tags".
- CSV: uma linha de cabeçalho `name,stream,logo,country,tags,favorite` e depois uma estação por linha.
- M3U: uma linha `#EXTINF:-1,` com o nome da estação, seguida do endereço do stream.

Os botões "Fill with a JSON example", "Fill with a CSV example" e "Fill with an M3U example" colocam um exemplo que funciona na caixa. Este é o de M3U:

```
#EXTM3U
#EXTINF:-1,Radio Paradise
https://stream.radioparadise.com/aac-320
```

"Add to list" (adicionar à lista) acrescenta as linhas à tabela. Elas chegam ao aparelho quando você clica em "Save".

## Como exportar suas estações

"Export" mostra suas estações em JSON, CSV e M3U numa tela só e oferece "JSON file", "CSV file" e "M3U file". Os downloads se chamam macdio-stations.json, macdio-stations.csv e macdio-stations.m3u.

## O que o Save faz com a sua lista de estações

O Save substitui sua lista de estações personalizadas pela tabela da página. Seu aparelho fica com as linhas que você vê e apaga todas as suas estações que não estão na tabela, e o iCloud leva essa exclusão para todos os aparelhos. Na prática:

- Uma linha que você remove com "✕" é apagada em todos os aparelhos quando você salva, e a página não pergunta antes.
- Se você adicionou ou mudou estações em outro aparelho depois que esta página carregou, clique em "Reload" antes de editar. Salvar a partir de uma página antiga traz a tabela antiga de volta.
- Mantenha o endereço de todas as linhas, começando com http:// ou https://. Uma linha com endereço vazio ou sem esse começo é descartada no Save, e a estação a que ela pertencia é apagada. O navegador não acrescenta "https://" por você como o app faz.

## Quando o editor para?

Ele só funciona enquanto você o mantém aberto. Ele para quando você pressiona parar, quando sai da tela do editor, quando o Macdio vai para segundo plano ou quando você fecha a aba do navegador. Também para quando o navegador fica 2 minutos em silêncio, quando nenhum navegador se conecta em 5 minutos, e depois de 5 códigos errados. A tela do celular ou da TV fica acesa enquanto ele roda.

## Limites que vale conhecer

- Os dois aparelhos precisam estar na mesma rede.
- A tabela comporta até 500 estações, e roda uma varredura de site por vez.
- As estações do diretório e suas listas ficam fora do editor. Mude essas no app, veja [favoritos, listas e sincronização](/guides/favorites-lists-and-sync.html).
- O JSON desta página e o JSON do "Exportar estações…" do Mac são formatos diferentes. Leia cada um de volta com a importação dele.

## Perguntas frequentes

### Quais aparelhos têm Editar no Computador?

iPhone, iPad e Apple TV. O Mac já tem teclado e edita as estações no próprio app. Apple Watch e CarPlay não têm.

### Por que meu computador não abre o endereço?

Os dois aparelhos precisam estar na mesma rede Wi-Fi, a tela do editor precisa ficar aberta e, no iPhone e no iPad, o Macdio precisa de permissão de rede local. O endereço pode mudar a cada início.

### O editor altera estações do diretório?

Não. Só as estações que você mesmo adicionou aparecem no navegador, e as estações do diretório nunca são alteradas.

### Posso importar uma playlist M3U de estações?

Sim. Cole o texto da playlist em "Import", clique em "Add to list" e depois em "Save". O Import também aceita JSON e CSV.

### O editor é seguro numa rede Wi-Fi compartilhada?

Ele pede um código de 6 dígitos que muda a cada início, fecha depois de 5 códigos errados e só funciona enquanto a tela do editor está aberta. A conexão é http simples dentro da sua rede.

### O que acontece com uma estação que eu removo no navegador?

Assim que você clica em "Save", ela é apagada em todos os aparelhos. O Save substitui sua lista de estações personalizadas pela tabela da página, então recarregue a página antes se você mudou estações em outro lugar.

## Experimente

Baixe o Macdio na [App Store](https://apps.apple.com/app/macdio/id6761737888), adicione algumas estações e abra Editar no Computador no seu iPhone, iPad ou Apple TV. Uma compra, todos os aparelhos Apple, sem assinatura.
