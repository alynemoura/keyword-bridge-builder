# ATS Resume Match

Aplicação web que compara um currículo com uma descrição de vaga e devolve uma versão ATS-friendly do currículo, com score de compatibilidade, palavras-chave encontradas e faltantes.

**Aplicação publicada:** https://keyword-bridge-builder.lovable.app/

---

## Qual problema a aplicação resolve

Currículos bons frequentemente são descartados antes de qualquer pessoa do RH ler, porque o ATS (Application Tracking System) não encontra as palavras-chave da vaga no documento. O ATS Resume Match dá visibilidade a esse processo: mostra o que o sistema encontrou, o que faltou e gera uma versão ajustada do currículo — sempre sob a regra de que a ferramenta melhora como a pessoa se apresenta e **nunca inventa experiência que a pessoa não tem**.

---

## Mega prompt utilizado

O prompt foi escrito em Markdown e colado no Lovable. Versão final:

```markdown
# ATS Resume Match

## 1. Objetivo
Criar uma aplicação web single-page que compara um currículo com uma descrição de vaga e gera uma versão ATS-friendly do currículo, sem inventar experiências. O foco é funcionalidade impecável com visual profissional em dark mode.

## 2. Regra de Ouro (exibir na interface)
"Esta ferramenta melhora como você se apresenta. Ela nunca inventa experiência que você não tem."

## 3. Design System & Identidade Visual
- Biblioteca de componentes: shadcn/ui (obrigatório para todos os componentes).
- Tema: Dark mode fixo (sem toggle). A aplicação nasce escura.
- Paleta de Cores (usar tokens semânticos no index.css):
  - Background: hsl(220, 15%, 8%)
  - Foreground: hsl(210, 20%, 92%)
  - Primary: hsl(160, 84%, 45%)
  - Muted: hsl(220, 12%, 16%)
  - Border: hsl(220, 12%, 22%)
  - Accent (faltantes/alertas): hsl(0, 72%, 56%)
  - Success (encontrados): usar o Primary.
- Tipografia: Inter (Google Fonts), títulos com font-semibold e tracking-tight.
- Estilo: minimalista, "developer tool", denso mas respirável.

## 4. Fluxo da Aplicação (uma única página, scroll vertical)
Layout de duas colunas em desktop, empilhado no mobile.

### Etapa 1: Entrada
- Textarea "Descrição da Vaga".
- Textarea "Seu Currículo".
- Button primário "Analisar Compatibilidade", desabilitado se qualquer campo estiver vazio.

### Etapa 2: Resultado
Card com três seções:
- Score de Match: badge com percentual e Progress na cor Primary.
- Análise de Palavras-chave: Badge default (verde) para encontradas, Badge destructive (vermelho) para faltantes.
- Currículo Ajustado: preview com scroll, botão "Copiar Currículo Ajustado".

## 5. Lógica de Análise (simulação no frontend)
1. Extrair palavras-chave da vaga (remover stopwords, filtrar termos relevantes).
2. Comparar com o currículo (case-insensitive).
3. Score = (encontradas / total) * 100.
4. Gerar currículo ajustado: inserir seção "Competências Relevantes" ao final com os termos faltantes, sem alterar o corpo do texto original.

## 6. Componentes shadcn/ui
Card, CardHeader, CardContent, CardTitle, Textarea, Button, Badge, Progress, Separator, Label.

## 7. Restrições Técnicas
- Sem login, sem dashboard, sem backend.
- Ícones apenas lucide-react.
- Layout responsivo (md: duas colunas).
- Cores via tokens semânticos (bg-background, text-foreground).


```
## Como rodar localmente:

- git clone <link-do-repositorio>
- cd <nome-do-repositorio>
- npm install
- npm run dev
