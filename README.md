# Praticidade Quiz

Quiz de vendas do **Guia de Pré-Preparo e Praticidade** (Chef Gui). Tráfego frio de anúncio no Instagram entra aqui, responde 10 perguntas, recebe um diagnóstico personalizado e cai no checkout de R$47.

O quiz em si é **um arquivo só**: [`public/index.html`](public/index.html). HTML, CSS e JS inline, sem build, sem dependência, sem framework. A pasta `public/` é o que fica público de fato (é o que o Worker serve); `worker/portal.js` e `wrangler.dominio.jsonc` existem só pra publicar em `chefgui.com.br/quizprepreparo`, sem tirar do ar a versão atual no GitHub Pages (`chef-gui.github.io/praticidade-quiz`).

Sem barra de progresso ou contador de pergunta na interface, decisão deliberada. Ver `docs/arquitetura-do-quiz.md`.

---

## Rodar localmente

```bash
npx -y http-server public -p 8815 -c-1
```

Depois abre `http://localhost:8815`. Só abrir o arquivo com duplo clique também funciona, mas servir por http evita qualquer surpresa com `sessionStorage`.

---

## A única coisa que precisa ser trocada

No topo do `<script>` em `public/index.html`:

```js
var CHECKOUT_URL = "https://falling-rain-23dc.guilhy-gm.workers.dev/#comprar";
```

Troque pelo link do checkout da Hotmart. Os dois botões de compra (o do bloco de oferta e o da barra fixa) usam essa constante.

Outras constantes no mesmo bloco:

| Constante | O que é | Cuidado |
|---|---|---|
| `SITE` | origem das imagens, hoje apontando pra página de vendas publicada | se a página de vendas mudar de domínio, as imagens do quiz quebram |
| `TICKET` | R$35, o preço médio estimado de 1 pedido com taxa | esse número aparece na tela pro usuário e no rodapé do resultado. Se mudar aqui, muda em todo lugar |
| `SEMANAS_MES` | 4.3, fallback | só usado se a pergunta `semanas` não vier respondida. Na conta normal, quem decide quantas semanas do mês é a resposta da pessoa |

---

## Como o quiz é construído

O público tem **consciência baixa**: acha que o problema é falta de tempo ou de talento, não sabe que existe técnica pra isso. Por isso o quiz não é só um formulário. Entre as perguntas existem **interstícios**, telas de conteúdo que sobem o nível de consciência antes da oferta.

O caminho é esse:

> "eu não tenho tempo" → "o custo é maior do que eu achava" → "não é talento, é técnica" → "existe método por trás disso" → "esse método é esse produto"

Detalhe de cada pergunta e de cada interstício em [`docs/arquitetura-do-quiz.md`](docs/arquitetura-do-quiz.md). **Leia esse arquivo antes de mexer na ordem das telas.** Várias perguntas existem só pra alimentar um bloco específico do resultado, e tirar uma delas quebra a personalização em silêncio.

---

## Estrutura do código

Tudo dentro de `public/index.html`, nessa ordem:

1. **CSS** com o design system do produto em CSS custom properties (`:root`). As cores, sombras e raios vieram do webapp do guia, não invente valores novos.
2. **`FLOW`**: array que descreve todas as telas na ordem. É a única fonte da verdade do fluxo. Adicionar pergunta é adicionar objeto nesse array.
3. **`INTER`**: os 4 interstícios, cada um uma função que monta a tela.
4. **`PERFIL` / `TRAVA` / `DIA` / `SONHO`**: mapas de resposta para texto do resultado.
5. **`fits()`**: monta a lista "o que o guia resolve no seu caso". Cada bullet só entra se a resposta justificar.
6. **`renderResult()`**: monta a tela final, incluindo o card de oferta (estruturado com o framework de página de vendas: âncora de valor real, empilhamento do que vem no guia, preço, garantia).

### Adicionar uma pergunta

```js
{ type:"q", id:"idUnico", kind:"single",   // "single" | "multi" | "text"
  title:"Pergunta aqui, pode usar {nome}",
  help:"linha de apoio opcional",
  opts:[ {v:"valor", t:"Texto da alternativa"} ] }
```

`single` avança sozinho ao clicar. `multi` e `text` mostram botão Continuar.

### Adicionar um interstício

Objeto `{ type:"i", id:"algo", render:"nomeDaFuncao" }` no `FLOW`, e a função correspondente em `INTER`.

---

## Regras da marca que o código respeita

Estão em [`docs/product-marketing.md`](docs/product-marketing.md) e [`docs/design-system.md`](docs/design-system.md), mas as que mais pegam no dia a dia:

- **Nunca usar travessão.** A marca usa vírgula. Vale pra qualquer texto novo.
- **Sem eyebrow**, aquele rótulo pequeno em caixa alta acima do título. Deixa cara de página gerada por IA.
- **Voz imperativa** nas instruções: "Descasque", "Guarde".
- **Sem jargão de nutrição.** Nada de sódio, macros, teoria.
- **Linguagem sem gênero** nas alternativas. O público não é definido por gênero, é por comportamento. A página de vendas atual usa feminino em alguns pontos, o quiz não usa.
- **Números em fonte mono** (`.mono` ou `--font-mono`), pra não pular visualmente.
- **Um acento só**: o vermelho `--primary`. As cores de categoria (verde, terracota, dourado, azul) só codificam conteúdo, nunca viram CTA.

---

## Honestidade dos números

O quiz mostra um valor em reais calculado a partir das respostas. Duas decisões deliberadas:

1. **A premissa aparece na tela.** "Contei R$35 por pedido, que é mais ou menos o que dá um prato com a taxa de entrega." E o rodapé do resultado repete que é estimativa.
2. **O valor é arredondado na dezena.** R$530, não R$526,75. Número exato demais numa estimativa cheira a invenção e derruba a confiança.

O roteiro de domingo soma 185 minutos nas 12 etapas, mas o produto comunica 2h30 porque várias etapas rodam em paralelo. O quiz explica isso na tela em vez de esconder: *"várias rodam ao mesmo tempo, por isso o total fecha em cerca de 2h30"*.

---

## Verificado

Testado em 390px de largura, 4 caminhos diferentes de resposta:

- zero erro de console
- zero scroll horizontal
- nenhum alvo de toque abaixo de 44px
- CTA sem quebra de linha
- botão voltar preserva a seleção
- loader é por relógio, não por contador de ticks, então não trava se a pessoa trocar de app no meio

---

## O que ainda falta

- [x] Trocar `CHECKOUT_URL` pelo link real da Hotmart
- [x] Pixel de conversão (Meta) e eventos de funil (`QuizIniciado`, `QuizProgresso`, `QuizConcluido`, `InitiateCheckout`)
- [x] Publicar via Cloudflare Workers, em `chefgui.com.br/quizprepreparo`, sem derrubar o GitHub Pages atual
- [ ] Validar o Worker do domínio próprio em produção e decidir se ele substitui o GitHub Pages ou os dois ficam no ar
- [ ] Decidir se as imagens continuam sendo servidas pela página de vendas ou se vão pra dentro deste repositório
