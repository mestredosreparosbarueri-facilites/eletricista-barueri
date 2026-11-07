# frontend-design — plano antes do código (correções da home, 07/11)
Escopo: só correções; layout, cores, fontes e H1 aprovados NÃO mudam.
1. Botão "Ligar" (tel:) sai; o botão do WhatsApp fica sozinho no mesmo lugar (sem buraco no layout).
2. 23 imagens ganham width/height reais do arquivo; CSS garante height:auto onde a altura não é fixa, para não deformar.
3. Alvos de toque < 24 px: aumentar a área clicável (padding/min-height) sem mudar o tamanho da letra.
4. calha.jpg (230 KB) vira WebP no <img>; o .jpg continua para o schema.
5. Title sem "Eletricista" na frente: a home vira a página da marca e dos serviços gerais; "eletricista em barueri" fica só com /p/eletricista-em-barueri.html.
Revisão anti-genérico: nenhuma peça nova de visual; nada de cartão, ícone ou animação a mais.
