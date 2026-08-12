# Arquitetura do quiz

Documento de decisão. Explica **por que cada tela existe**, para que ninguém remova uma pergunta sem perceber que ela alimenta um bloco do resultado.

---

## O problema que a estrutura resolve

O público do guia tem consciência baixa. Ele sabe que come mal e gasta demais, mas não sabe que isso é resolvível por técnica. Ele acredita em duas coisas erradas:

1. "não tenho tempo"
2. "não levo jeito pra cozinha"

Um quiz que só pergunta e entrega uma oferta no fim não desmonta nenhuma das duas. Por isso o fluxo alterna **pergunta** e **interstício**, e os interstícios sobem o nível de consciência nesta ordem:

| Degrau | Onde acontece |
|---|---|
| "o custo é maior do que eu achava" | interstício 1, a conta do delivery |
| "não é talento, é técnica" | interstício 2, quebra de crença |
| "existe método por trás disso" | interstício 3, zona de perigo |
| "esse método é esse produto" | interstício 4, a conta de tempo + roteiro real |

---

## Fluxo completo

| # | Tela | id | Função |
|---|---|---|---|
| 0 | Abertura | | Promessa + tempo estimado (1 min) |
| 1 | Jantar num dia comum | `rotina` | **Espelho.** Primeira tela precisa ser reconhecimento imediato. Define o perfil do resultado |
| 2 | Quantas vezes vem comida de fora | `fora` | Alimenta o cálculo de custo (vezes por semana) |
| 3 | Em quantas semanas do mês isso se repete | `semanas` | Alimenta o cálculo de custo (semanas por mês, substitui a média fixa) |
| 4 | **Interstício: a conta** | `conta` | Mostra o valor calculado das duas respostas anteriores. Imagem: gasto no app de entrega |
| 5 | Desperdício | `lixo` | Dor secundária, específica do produto. Alimenta linha do resultado |
| 6 | A crença | `crenca` | **Pergunta-chave.** 4 frases entre aspas, na voz do cliente. Define o bloco "o que te trava" |
| 7 | **Interstício: é técnica** | `tecnica` | Título muda conforme a crença marcada. Imagem: Chef Gui cozinhando |
| 8 | Bloco de gelo | `gelo` | Cena assinatura da persona. A opção "deixo na pia" prepara o interstício seguinte |
| 9 | **Interstício: zona de perigo** | `pia` | Autoridade técnica com dado real do guia (4°C a 60°C, 3 métodos com tempos) |
| 10 | Qual dia sobra | `dia` | Define o formato do roteiro no resultado |
| 11 | O que tem em casa | `casa` | Múltipla escolha. Baixa a barreira de entrada |
| 12 | **Interstício: conta de tempo** | `tempo` | Comparação animada 3h45 (sem organização) vs 2h00 (com o método), contadores simultâneos, revela "1h45 economizada por semana". Não usa mais o `ROTEIRO` de 12 etapas, essas continuam só no resultado final |
| 13 | Já tentou antes | `tentou` | Todas as opções absolvem. Prepara o "não foi você, foi a falta de sistema" |
| 14 | O que faria com o tempo | `tempoLivre` | Aspiração. Fecha o resultado |
| 15 | Carregando | | 2,3s, monta o plano |
| 16 | Resultado | | Diagnóstico + roteiro + oferta |

10 perguntas ao todo. As perguntas `nome` e `pessoas` existiram antes e foram removidas (a primeira em commit anterior a este documento, a segunda a pedido explícito). Sem barra de progresso nem contador na interface: nenhuma tela mostra "X de 10" pra quem responde.

---

## Mapa de personalização

**Qualquer pergunta removida daqui quebra um bloco do resultado.**

| Resposta | O que ela controla |
|---|---|
| `rotina` | O perfil nomeado no topo do resultado (4 variações) |
| `fora` | O valor em reais, mostrado 3 vezes (interstício, resultado, oferta) |
| `semanas` | O mesmo valor em reais (multiplicador de semanas/mês) e a frase da premissa no interstício da conta |
| `lixo` | A linha embaixo do custo (4 variações) |
| `crenca` | O título do interstício 2 **e** o bloco "o que te trava" (4 variações cada) |
| `gelo` | O título do interstício 3 e o bullet de descongelamento |
| `dia` | O chip do dia **e** a instrução do roteiro (dia livre, noite de semana ou nenhum) |
| `casa` | O bullet "funciona com o que você já tem" |
| `tentou` | Os bullets "não é marmita congelada" e "Meu Domingo" |
| `tempoLivre` | O título da última seção |

---

## Regras que valem pra qualquer pergunta nova

- **Alternativas na voz do cliente.** Use os verbatim do `product-marketing.md`. "Fui tirar a carne do congelador e tinha um bloco enorme igual concreto" vira alternativa quase literal.
- **Nenhuma alternativa pode culpar o cliente.** Todas as opções de "já tentou antes" absolvem. Se uma opção faz a pessoa se sentir preguiçosa, ela abandona.
- **Máximo 4 alternativas.** Acima disso, a tela rola no celular e a taxa de conclusão cai.
- **Pergunta de dor só depois de 5 ou 6 cliques.** Antes disso a pessoa ainda não investiu o suficiente pra ser sincera.
- **Toda pergunta precisa aparecer no resultado.** Se você não consegue dizer qual bloco ela alimenta, ela não deveria existir.

---

## Decisões de UX

- **Múltipla escolha avança sozinha** (240ms de delay pra pessoa ver a seleção). Botão Continuar só em texto, múltipla seleção e interstícios. Isso corta metade dos cliques.
- **Sem indicador de progresso.** Decisão explícita: nem barra, nem contador "X de 10". O topbar só tem o botão de voltar.
- **Contato não é pedido.** O quiz vai direto pro checkout. Para tráfego frio de R$47, pedir e-mail antes do resultado derruba a conversão imediata. Se um dia virar captura, o lugar é dentro do loader, como faz a referência.
- **Respostas ficam em `sessionStorage`.** Recarregar não perde o que foi respondido, mas o quiz recomeça do início com as opções já marcadas.
- **Loader por relógio, não por contador.** Navegador estrangula timers em aba em segundo plano. Um `setInterval` travaria na metade se a pessoa trocasse de app. Tem um `setTimeout` de garantia que força a saída.

---

## Referência que originou a estrutura

O quiz da Dieta das Canetinhas (`inlead.digital/ddc`) foi dissecado antes da construção. O que foi aproveitado:

- alternativas em primeira pessoa, entre aspas, na pergunta de dor
- interstício de mecanismo com número (lá era 5,7% vs 16%, aqui é 3h45 vs 2h30)
- par "atual → desejado" pra materializar o gap
- pergunta de "já tentou e falhou" que absolve
- auto-advance e promessa de tempo curto na abertura

O que foi deliberadamente **não** aproveitado:

- **duas perguntas duplicadas** (a referência pergunta falta de fome e nível de atividade física duas vezes cada). Repetir pergunta quebra a ilusão de personalização na hora
- **placeholder em produção** ("Exemplo de descrição" numa tela de prova social)
- **promessa de tempo que não bate**: a referência diz "38 segundos" e tem 15 perguntas. Aqui são 10 perguntas e a promessa é "cerca de 1 minuto"
- **captura de WhatsApp no fim**: decisão de ir direto ao checkout
