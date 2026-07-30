# Contexto do projeto

Quiz de vendas do Guia de Pré-Preparo e Praticidade (Chef Gui). Arquivo único: `index.html`.

Antes de mexer, leia nesta ordem:

1. `README.md` — como rodar, o que trocar, estrutura do código
2. `docs/arquitetura-do-quiz.md` — por que cada tela existe e o que ela alimenta no resultado
3. `docs/product-marketing.md` — persona, dores, objeções, voz da marca
4. `docs/design-system.md` — cores, tipografia, sombras, raios

## Regras não negociáveis

- **Nunca usar travessão.** A marca usa vírgula.
- **Sem eyebrow** (rótulo pequeno em caixa alta acima do título).
- **Linguagem sem gênero** nas alternativas e no resultado.
- **Sem jargão de nutrição** (sódio, macros, teoria).
- **Um acento só**: `--primary`. Cores de categoria não viram CTA.
- **Números em fonte mono.**
- Não inventar número. Se aparecer valor em reais ou em minutos na tela, a premissa tem que aparecer junto.

## Antes de alterar o fluxo

Toda pergunta alimenta um bloco específico do resultado. Confira o mapa de personalização em `docs/arquitetura-do-quiz.md` antes de remover ou reordenar qualquer tela, senão a personalização quebra em silêncio.

## Verificação

Testar sempre em 390px de largura, percorrendo pelo menos 3 caminhos de resposta diferentes até o resultado. Conferir: sem scroll horizontal, sem alvo de toque abaixo de 44px, CTA sem quebra de linha, botão voltar preservando a seleção.
