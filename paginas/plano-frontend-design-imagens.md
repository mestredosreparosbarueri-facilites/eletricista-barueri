# frontend-design — plano (07/11, correção desktop) ANTES do código
Problema medido (Playwright 1903px): tema Blogger empurra o conteúdo — .page_body margin-left 284px, #page_body margin-left 259,5px; .mdr3 começa em x=142, sobra faixa à esquerda; .bg-photo (faixa azul 1903x480) do tema aparece atrás.
Tokens de imagem (sistema único):
- Fotos de conteúdo: proporção 4:3, largura da coluna (760px), object-fit:cover, raio 4px.
- Ponto focal por tipo: pessoa = 50% 12% (cabeça visível); quadro/instalação = 50% 40%.
- Hero: 560px de altura no desktop, foco 50% 45%; celular 4:3.
- Legenda sempre abaixo, 15px cinza.
Revisão anti-genérico: sem moldura, sem sombra, sem cantos grandes, sem filtro; foto real em destaque é o ponto forte da página.
Layout: zerar margens/paddings do tema SÓ nesta página e esconder .bg-photo*, para a página ocupar 100% da largura.
