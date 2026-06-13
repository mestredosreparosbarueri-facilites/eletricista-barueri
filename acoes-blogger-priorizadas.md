# Ações no Painel Blogger — Por Ordem de Prioridade
**Faça uma ação por vez. Aguarde 48h entre cada grupo antes de ir para o próximo.**

---

## GRUPO 1 — Fazer HOJE (sem risco, impacto imediato)

### Ação 1.1 — Despublicar posts de template (lixo no índice)

**Onde:** Blogger → Posts → localizar e despublicar

Estes posts foram publicados com nome de template como título. Estão consumindo crawl budget e não trazem cliques:

| URL (parte final) | Impressões | Cliques |
|-------------------|-----------|---------|
| `root-primary0b2a4a-accentffb400_8` | 88 | 15 |
| `root-primary0b2a4a-accentffb400` | 82 | 12 |
| `root-primary0b2a4a-accentff6a00_33` | 77 | 8 |
| `root-primary0b2a4a-accentff6a00_7` | 72 | 7 |
| `root-primary0b2a4a-accentff6a00` | 74 | 3 |
| `root-primary0b2a4a-accentff6a00_8` | 25 | 2 |
| `estilo-profissional-root-primary0b2a4a` | 64 | 3 |
| `blog-post.html` | 142 | 12 |
| `blog-post_5.html` | 89 | 9 |

**Como:** Abrir cada post → clicar nos três pontinhos → "Reverter para rascunho"
**Não deletar** — reverter para rascunho preserva o conteúdo.

---

### Ação 1.2 — Corrigir title tag da página "marido de aluguel"

**Onde:** Blogger → Páginas → "marido de aluguel" → Editar

**Problema:** 245 impressões, posição 12.8, apenas 1 clique = título fraco, ninguém clica.

**Title tag atual (provável):** `Marido de Aluguel`
**Title tag novo:**
```
Marido de Aluguel em Barueri — Pequenos Reparos, Montagem e Instalações | Mestre dos Reparos
```

**Meta description nova (Settings → Search Description):**
```
Serviço de marido de aluguel em Barueri e região. Montagem de móveis,
instalações, pequenos reparos residenciais. Atendimento rápido. (11) XXXXX-XXXX
```

---

## GRUPO 2 — Fazer em 48h (risco baixo, alto impacto)

### Ação 2.1 — Corrigir o typo "eletrecista" → "eletricista" nas páginas

**Problema:** 9 páginas têm erro ortográfico na URL. O Google não as rankeia para "eletricista".

**Processo para cada página (faça uma por dia):**

**Passo 1** — Criar a página nova com URL correta:
- Blogger → Páginas → Nova página
- Título: exatamente igual ao da página com typo
- Conteúdo: copiar e colar o conteúdo da página antiga
- Publicar com URL correta

**Passo 2** — Configurar redirecionamento 301:
- Blogger → Configurações → Erros e redirecionamentos → Redirecionamentos personalizados
- Adicionar:
  - **De:** `/p/eletrecista-em-barueri-cruz-preta.html`
  - **Para:** `/p/eletricista-em-barueri-cruz-preta.html`
  - Tipo: **Permanente (301)**

**Passo 3** — Despublicar a página antiga (não deletar ainda)

**Ordem de prioridade (comece por quem tem mais impressões):**

| Prioridade | URL com typo (slug atual) | URL correta (criar) | Impressões |
|------------|--------------------------|---------------------|-----------|
| 🔴 1ª | `eletrecista-em-santana-de-paranaiba` | `eletricista-em-santana-de-parnaiba` | 63 |
| 🔴 2ª | `eletrecista-em-itapevi-mestre-dos` | `eletricista-em-itapevi-mestre-dos` | 27 |
| 🟠 3ª | `eletrecista-em-barueri-cruz-preta` | `eletricista-em-barueri-cruz-preta` | 31 |
| 🟠 4ª | `eletrecista-em-barueri-18-do-forte` | `eletricista-em-barueri-18-do-forte` | 27 |
| 🟠 5ª | `eletrecista-em-barueri-engenho-novo` | `eletricista-em-barueri-engenho-novo` | 27 |
| 🟡 6ª | `eletrecista-em-barueri-boa-vista` | `eletricista-em-barueri-boa-vista` | 26 |
| 🟡 7ª | `eletrecista-em-barueri-jardim-paulista` | `eletricista-em-barueri-jardim-paulista` | 24 |

**IMPORTANTE:** Faça no máximo 2 correções por semana. Mudanças em massa de URL confundem o Google.

---

## GRUPO 3 — Fazer após estabilização (aguardar 2-3 semanas)

### Ação 3.1 — Solicitar reindexação no Search Console

Após cada correção de typo, acessar:
**Search Console → Inspeção de URL → colar a URL nova → "Solicitar indexação"**

Fazer isso para cada nova URL criada com typo corrigido.

---

### Ação 3.2 — Melhorar title tags das páginas "blog-page_XX"

Essas páginas já rankeiam bem (pos 6–12) mas sem keyword na URL. Melhorar apenas o **título e meta description** dentro da página — sem mudar a URL — pode aumentar o CTR sem risco de perder posição.

| Página | Impressões | Pos | O que deve ser (verificar conteúdo da página) |
|--------|-----------|-----|----------------------------------------------|
| `blog-page_3` | 193 | 11.7 | Verificar conteúdo e ajustar title tag |
| `blog-page_87` | 165 | 6.5 | Verificar conteúdo e ajustar title tag |
| `blog-page_83` | 150 | 8.1 | Verificar conteúdo e ajustar title tag |
| `blog-page_43` | 144 | 10.0 | Verificar conteúdo e ajustar title tag |
| `blog-page_29` | 138 | 11.1 | Verificar conteúdo e ajustar title tag |

**Como ajustar title tag no Blogger:**
Editar página → Configurações da página (ícone de engrenagem) → "Título da pesquisa personalizado"

---

## RESUMO EXECUTIVO

| Grupo | Ação | Quando | Impacto esperado |
|-------|------|--------|-----------------|
| 1.1 | Despublicar posts de template | Hoje | Libera crawl budget |
| 1.2 | Corrigir title "marido de aluguel" | Hoje | CTR de 0.4% → 3-5% |
| 2.1 | Corrigir typos "eletrecista" (7 páginas) | 48h após grupo 1 | Páginas zero-clique começam a rankear |
| 3.1 | Solicitar reindexação no Search Console | Após cada correção | Acelera reconhecimento das correções |
| 3.2 | Melhorar title tags blog-page_XX | 2-3 semanas | CTR aumenta sem risco de posição |

---

## O QUE NÃO MEXER AGORA

- ❌ URLs das páginas `blog-page_XX` — já rankeiam, risco de queda
- ❌ Qualquer coisa relacionada a `?m=1` — aguardar estabilização
- ❌ Estrutura de links internos — não é prioridade ainda
- ❌ Conteúdo dos posts que estão rankendo — se está funcionando, não toque

---

*Gerado em Junho 2026 com base nos dados reais do Google Search Console.*
