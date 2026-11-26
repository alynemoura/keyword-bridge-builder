# ATS Resume Match

Página única em dark mode que compara currículo x vaga e gera uma versão ATS-friendly, sem inventar experiência.

## O que será construído
- Cabeçalho com nome do app e a Regra de Ouro em destaque.
- Duas caixas de texto lado a lado (empilhadas no celular): "Descrição da Vaga" e "Seu Currículo".
- Botão "Analisar Compatibilidade", desativado se algum campo estiver vazio.
- Card de resultado:
  - Percentual grande de match + barra de progresso verde.
  - Palavras-chave encontradas (verde) e faltantes (vermelho).
  - Currículo ajustado: texto original intacto + bloco final "Competências Relevantes — Familiaridade com: ...", com botão "Copiar Currículo Ajustado".

## Visual
Dark fixo com a paleta do documento (fundo quase preto, verde esmeralda, vermelho suave), fonte Inter, estilo minimalista de ferramenta.

## Detalhes técnicos
- Cores convertidas para oklch em `src/styles.css`; classe `dark` fixa no `<html>`; Inter via `<link>` no root.
- Componentes shadcn: Card, Textarea, Button, Badge, Progress, Separator, Label; ícones lucide; toast (sonner) ao copiar.
- Lógica em `src/lib/ats.ts` (pura, determinística): tokeniza vaga, remove stopwords PT/EN, mantém termos >3 letras em maiúscula ou de uma lista de skills comuns (React, Python, Excel, SQL...), compara case-insensitive, score = encontradas/total*100, gera currículo ajustado só anexando o bloco.
- Testes vitest para score, detecção de faltantes e garantia de que o texto original não é alterado.
- Título/descrição/OG da página atualizados.
