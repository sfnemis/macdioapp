---
title: "Como gravar rádio pela internet no Mac (passo a passo)"
description: "Três formas de gravar rádio pela internet no Mac, e o que funciona no iPhone: um player que grava, uma captura do áudio do sistema ou o Audacity."
datePublished: 2026-08-09
lastUpdated: 2026-10-12
faq:
  - q: "Qual é a qualidade das gravações?"
    a: "Idêntica ao stream. O áudio que chega é gravado como vem, sem recodificação, então uma estação a 128 kbps gera um arquivo a 128 kbps e uma estação a 320 kbps gera um arquivo a 320 kbps."
  - q: "Posso exportar uma gravação para o Finder ou para o app Arquivos?"
    a: "Não. As gravações ficam dentro do app, no seu aparelho, onde você pode tocá-las ou apagá-las. Não há compartilhamento, exportação nem sincronização de arquivos pelo iCloud para elas."
  - q: "Posso gravar enquanto uso outros apps?"
    a: "Sim. A gravação captura o stream e não os alto-falantes, então continua em segundo plano no Mac e no iPhone enquanto você faz outra coisa, e com a tela apagada."
  - q: "Posso gravar no Apple Watch ou na Apple TV?"
    a: "Não. Gravação é um recurso do Mac, do iPhone e do iPad. Os apps do relógio e da TV tocam estações e controlam a reprodução."
  - q: "Como gravo um programa de rádio que vai ao ar de noite?"
    a: "Comece a gravação antes de dormir e deixe o limite de três horas encerrá-la, ou aumente esse limite nas configurações se o programa for mais longo. Não existe agendador que inicie uma gravação sozinho."
---

Três formas de fazer isso, o que cada uma te custa e onde os arquivos vão parar.

**A forma mais fácil de gravar rádio pela internet no Mac é um player de rádio com gravação embutida, porque ele salva o próprio stream e não precisa de roteamento de áudio. Gravar o sistema inteiro com uma ferramenta de captura também funciona, e é a única opção quando o áudio vem de um site ou de um app que não grava. No iPhone, só existe o caminho embutido.**

## Por que gravar rádio pela internet, afinal

A maioria dos pedidos se resume a uma de três coisas: um programa que vai ao ar enquanto você dorme ou trabalha, um set de DJ que você quer guardar porque nunca vai ser publicado em lugar nenhum, ou uma única faixa que você ouviu uma vez e quer encontrar de novo. Streams são ao vivo e nada fica guardado para você, então se quiser depois, tem que pegar enquanto passa.

## Método 1: gravar com um player que tem isso embutido

Um player que grava escreve o stream que chega no disco. Nada é recodificado, nenhum som do sistema vaza para dentro, e uma notificação durante a gravação não vai parar no arquivo. O [Macdio](/mac.html) faz isso no Mac e no [iPhone](/iphone.html) com o mesmo botão.

Toque uma estação e aperte gravar. Escolha Contínuo para um arquivo por sessão, ou Dividir por faixa para que a sessão seja cortada a cada troca de música. Deixe rodando, use outros apps e aperte parar quando terminar. A sessão aparece na aba Gravações na mesma hora.

Dividir por faixa é a parte que vale conhecer. Ele observa a informação da música que chega dentro do stream e corta a cada mudança, então um programa de duas horas vira uma lista de faixas com nome e capa em vez de um arquivo longo que você precisa percorrer. Quando uma estação não envia nada útil, e muitas não enviam, o Macdio descobre a música a partir do áudio que já tem em mãos, então a nomeação continua com a tela apagada e sem nunca pedir permissão de microfone. O [guia de identificação de músicas](/guides/identify-song-on-radio.html) explica como essa parte funciona.

A troca é que um gravador embutido só grava o que o player consegue tocar. Ele captura rádio pela internet e nada mais, então uma chamada de vídeo ou uma aba do navegador ficam de fora.

## Método 2: capturar o sistema inteiro com o Audio Hijack

O Audio Hijack, da Rogue Amoeba, grava áudio de qualquer aplicativo no Mac, ou todo o áudio do sistema de uma vez, então cobre streams que vivem numa aba do navegador ou num player sem gravador. A versão 4.6.0 roda do macOS 14.4 ao macOS 27 e pode ser baixada de graça, com limitações aplicadas até você comprar uma licença, segundo a página do produto da Rogue Amoeba (verificado em 14 de setembro de 2026).

Você escolhe o aplicativo de origem, adiciona um bloco de gravador e aperta o botão de executar. É mais configuração do que um botão de gravar, e há um detalhe que vale planejar: tudo o que o Mac tocar vai para o arquivo. Uma notificação do Slack no minuto quarenta fica na gravação para sempre. Ele também entrega um arquivo longo sem a menor ideia de onde uma música começa ou termina, então o trabalho da lista de faixas fica para você depois.

## Método 3: Audacity mais um dispositivo de áudio virtual

O Audacity é gratuito e de código aberto, o que o torna a resposta habitual nos fóruns, mas o macOS não deixa um app gravar o áudio do sistema sozinho. Você precisa instalar um dispositivo de áudio virtual primeiro, como o BlackHole, gratuito e de código aberto, rotear a saída do Mac por ele e então configurar o Audacity para gravar a partir desse dispositivo. Você também vai querer ouvir o que está gravando, o que significa um dispositivo de saída múltipla no Configuração Áudio e MIDI para que o som chegue tanto aos seus alto-falantes quanto ao gravador.

Funciona, não custa nada e é o mais trabalhoso dos três. O lado bom é que o Audacity é um editor, então cortar, aplicar fade e exportar num formato específico já estão ali assim que a captura termina.

## Qual método usar

Se a estação está num app de rádio, use o gravador do próprio app. É o único caminho que te dá áudio limpo e divisão por faixa sem software extra. Se o áudio está em outro lugar, ou você está gravando a entrevista de um podcast e uma trilha musical ao mesmo tempo, o Audio Hijack é a ferramenta feita para esse trabalho. O Audacity é a escolha quando o orçamento é zero e uma tarde de configuração é aceitável.

## Como gravar rádio no iPhone

Aqui só existe o primeiro método. O iOS não dá a nenhum app acesso à captura de áudio do sistema, então não há equivalente do Audio Hijack no iPhone, e a gravação de tela também não salva um stream limpo. Um player com gravação embutida é a lista inteira.

No Macdio é o mesmo botão do Mac. Toque em gravar enquanto uma estação toca, e a gravação continua enquanto você usa outros apps, porque é o stream sendo gravado e não um microfone escutando. As gravações aparecem na aba Gravações assim que você para.

## Dá para agendar uma gravação?

No Macdio, não. Não existe um timer que inicie uma estação às 21:00 de quinta, e isso está na lista de pedidos e não no app. No Mac, o Audio Hijack é a coisa mais próxima disponível hoje, ou uma automação dos Atalhos pode abrir uma estação num horário definido enquanto você mesmo aperta gravar.

O que o Macdio tem é a proteção oposta: uma sessão para sozinha depois de três horas, para que uma gravação esquecida não devore o disco durante a noite. O limite é ajustável nas configurações quando você está gravando um programa longo, e o tempo restante aparece enquanto a gravação roda.

## O que encerra uma gravação antes da hora

Duas coisas encerram uma sessão antes de você, e as duas salvam o arquivo em vez de perdê-lo. A primeira é o limite de três horas acima. A segunda é o disco. O Macdio não começa uma gravação com menos de 500 MB livres, observa o espaço livre enquanto grava, avisa a cada cinco minutos quando o disco cai abaixo de 500 MB e para a gravação com uma notificação se o espaço ficar crítico, então o pior caso é um arquivo mais curto e não um disco cheio com um arquivo corrompido. Uma sessão longa de madrugada num laptop quase cheio é o caso para ficar de olho, porque uma estação a 320 kbps grava cerca de 144 MB por hora.

## Qual o tamanho dos arquivos?

Uma gravação pesa o mesmo que o stream, já que nada é acrescentado nem comprimido de novo. A 128 kbps, o bitrate mais comum, isso dá cerca de 58 MB por hora, então uma noite inteira de rádio fica em uns 350 MB. Uma estação a 320 kbps fica em torno de 2,4 MB por minuto, e uma estação falada de bitrate baixo pode ser um quarto disso. Dividir por faixa deixa a conta mais amigável na prática, porque você fica com as três músicas que queria e apaga o resto.

## Em que formato ficam os arquivos

Uma gravação mantém o que a estação envia. Uma estação MP3 te dá um .mp3 e uma estação AAC te dá um .aac, sem nada recodificado no caminho até o disco, então o arquivo soa exatamente como o stream soava. Quando o Song ID deu nome a uma música numa gravação AAC, o título, o artista e a capa são gravados no arquivo, que vira um .m4a. Não há configuração de qualidade para errar aqui, porque o áudio nunca é codificado uma segunda vez.

## Onde as gravações ficam

Dentro do app, no seu próprio aparelho, na aba Gravações, onde cada sessão e cada faixa dividida pode ser tocada ou apagada. Elas não são copiadas para a sua biblioteca de músicas, não aparecem no app Arquivos nem no Finder, e não há botão de compartilhar ou exportar. Esse é um limite deliberado de um recurso de gravação pessoal, não algo esperando para ser terminado, e ele mantém uma gravação pessoal pessoal. Nada é enviado para lugar nenhum.

## Gravar rádio pela internet é legal?

Gravar uma transmissão para a sua própria escuta privada é uma prática antiga na maioria dos países, a mesma tradição de gravar a FM numa fita cassete. O que fica pessoal fica simples: não redistribua nem republique as gravações, e verifique as regras do seu país se tiver dúvida. Isto é informação geral, não aconselhamento jurídico.

## Perguntas frequentes

### Qual é a qualidade das gravações?

Idêntica ao stream. O áudio que chega é gravado como vem, sem recodificação, então uma estação a 128 kbps gera um arquivo a 128 kbps e uma estação a 320 kbps gera um arquivo a 320 kbps.

### Posso exportar uma gravação para o Finder ou para o app Arquivos?

Não. As gravações ficam dentro do app, no seu aparelho, onde você pode tocá-las ou apagá-las. Não há compartilhamento, exportação nem sincronização de arquivos pelo iCloud para elas.

### Posso gravar enquanto uso outros apps?

Sim. A gravação captura o stream e não os alto-falantes, então continua em segundo plano no Mac e no iPhone enquanto você faz outra coisa, e com a tela apagada.

### Posso gravar no Apple Watch ou na Apple TV?

Não. Gravação é um recurso do Mac, do iPhone e do iPad. Os apps do relógio e da TV tocam estações e controlam a reprodução.

### Como gravo um programa de rádio que vai ao ar de noite?

Comece a gravação antes de dormir e deixe o limite de três horas encerrá-la, ou aumente esse limite nas configurações se o programa for mais longo. Não existe agendador que inicie uma gravação sozinho.

## Pronto para experimentar?

Baixe o Macdio na [App Store](https://apps.apple.com/app/macdio/id6761737888). Uma compra, todos os aparelhos Apple, sem assinatura.
