# Design System — Guia de Pré-Preparo & Praticidade (Chef Gui)

Extraído direto do código-fonte do webapp (`praticidade-na-cozinha`, Next.js + Tailwind). Use isso como base pra manter a página de vendas visualmente consistente com o produto.

---

## Cores

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#FFF8F1` | Fundo geral da página (creme quente, nunca branco puro) |
| `surface` | `#FFFFFF` | Fundo de cards e superfícies elevadas |
| `ink` | `#2B2118` | Texto principal (marrom escuro quente, nunca preto puro) |
| `ink-soft` | `#6B5D52` | Texto secundário, legendas, metadados |
| `line` | `#EFE2D4` | Bordas e divisores |
| `primary` | `#E63946` | Cor de marca (vermelho), CTAs, destaques |
| `primary-dark` | `#C22733` | Hover/active do primary |
| `warn` | `#9C2A16` | Alertas de segurança |

**Cores de categoria** (cada seção do conteúdo tem uma cor própria):

| Token | Hex | Categoria |
|---|---|---|
| `veg` (`cat-veg`) | `#3F8F52` | Vegetais (verde) |
| `prot` (`cat-prot`) | `#C1502E` | Proteínas (terracota) |
| `acmp` (`cat-acmp`) | `#B9852B` | Acompanhamentos (dourado) |
| `frio` (`cat-frio`) | `#3E6F8E` | Descongelamento (azul frio) |

**Regra de ouro da paleta**: tudo é "quente". Sem cinza frio, sem preto/branco puro. Sombras também usam tom marrom (`rgba(120, 72, 40, ...)`), nunca cinza neutro.

---

## Tipografia

| Família | Fonte (Google Fonts) | Uso | Variável CSS |
|---|---|---|---|
| Display | **Baloo 2** (500, 600, 700, 800) | Títulos, headlines, números de destaque | `--font-display` |
| Body | **Inter** | Texto corrido, parágrafos, UI | `--font-body` |
| Mono | **JetBrains Mono** (500, 700) | Números tabulares (timers, preços, contadores) | `--font-mono` |

Baloo 2 é uma fonte arredondada e amigável, é o que dá a cara "acolhedora, não corporativa" pro produto. Títulos grandes usam `font-extrabold` (800).

---

## Cantos e formas

| Token | Valor | Uso |
|---|---|---|
| `rounded-card` | `18px` | Cards, imagens, blocos de conteúdo |
| `rounded-pill` | `999px` | Botões, badges, chips, tags |

Nada de cantos quadrados ou levemente arredondados (`rounded-md`/`rounded-lg` padrão). É ou bem arredondado (`card`) ou totalmente em pílula (`pill`).

---

## Sombras (sempre em tom quente, nunca cinza)

| Token | Valor | Uso |
|---|---|---|
| `shadow-soft` | `0 2px 8px rgba(120,72,40,.08), 0 1px 2px rgba(120,72,40,.06)` | Estado padrão de cards |
| `shadow-card` | `0 6px 20px rgba(120,72,40,.10), 0 2px 6px rgba(120,72,40,.06)` | Cards em destaque / hover |
| `shadow-lift` | `0 14px 40px rgba(120,72,40,.18), 0 4px 12px rgba(120,72,40,.10)` | Elementos flutuantes (FAB, modais) |
| `shadow-primary` | `0 8px 22px rgba(230,57,70,.30)` | Botões primários (CTA) |

---

## Movimento

| Nome | Duração / easing | Uso |
|---|---|---|
| `fade-in` | 0.2s ease-out | Conteúdo aparecendo (accordions, painéis) |
| `slide-up` | 0.28s ease-out | Elementos entrando de baixo pra cima |
| `sheet-in` | 0.3s cubic-bezier(0.16,1,0.3,1) | Modais/sheets subindo da base da tela |
| `pop` | 0.3s ease-out, scale 0.9→1.04→1 | Confirmação (ex.: check de "concluído") |

Todas as animações respeitam `prefers-reduced-motion`.

---

## Padrões de componente (observados no código)

**Botão primário (CTA)**
Fundo `primary`, texto branco, `rounded-pill`, `shadow-primary`, `font-bold`, leve `active:scale-95` ao tocar.

**Card padrão**
Fundo `surface`, borda `1px solid line`, `rounded-card`, `shadow-soft`, padding generoso (`p-4` a `p-6`).

**Badge/tag de categoria**
`rounded-pill`, fundo na cor da categoria a 10% de opacidade (`bg-veg/10` etc.), texto na cor sólida da categoria.

**Inputs**
Altura grande (`h-14` na busca principal, pensado pra "mãos ocupadas na cozinha"), `rounded-card`, borda que vira `primary` no focus.

**Botão flutuante (FAB)**
`rounded-pill`, `shadow-lift`, cor `primary`, fica sobre o conteúdo, usado pra ação de destaque persistente.

---

## Tom de voz (aplicado ao produto, vale pra copy também)

- Sempre voz imperativa nas instruções: "Descasque", "Guarde" (nunca "Você deve descascar")
- Nunca usar travessão (—), sempre vírgula
- Direto, sem enrolação, mas nunca frio, o acolhimento vem da paleta quente + Baloo 2, não de gentilezas no texto
- Números sempre em fonte mono (`tnum`), pra não "pular" visualmente

---

## Fontes de referência no código

- `tailwind.config.ts` — cores, radius, sombras, animações
- `app/globals.css` — variáveis CSS, tipografia base
- `app/layout.tsx` — carregamento das fontes (Baloo 2 / Inter / JetBrains Mono)
