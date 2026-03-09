// Dados do cardápio - Pizzaria do Vaqueiro

export interface Pizza {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'tradicionais' | 'especiais' | 'doces' | 'bebidas';
    image: string;
    badge?: string;
}

export const pizzas: Pizza[] = [
    // TRADICIONAIS
    {
        id: 'vaqueiro',
        name: 'Pizza Vaqueiro',
        description: 'Molho de tomate, mussarela, carne de sol, cebola roxa e queijo coalho.',
        price: 52.90,
        category: 'tradicionais',
        image: '/pizza-vaqueiro.png',
        badge: 'Mais Pedida',
    },
    {
        id: 'sertaneja',
        name: 'Pizza Sertaneja',
        description: 'Frango desfiado, milho, bacon crocante e catupiry cremoso.',
        price: 48.90,
        category: 'tradicionais',
        image: '/pizza-sertaneja.png',
    },
    {
        id: 'calabresa',
        name: 'Pizza Calabresa',
        description: 'Molho de tomate, mussarela e calabresa especial de fogão.',
        price: 42.90,
        category: 'tradicionais',
        image: '/pizza-chapeu-ouro.png',
    },
    {
        id: 'portuguesa',
        name: 'Pizza Portuguesa',
        description: 'Presunto, ovo, cebola, azeitona e mussarela derretida.',
        price: 45.90,
        category: 'tradicionais',
        image: '/pizza-sertaneja.png',
    },

    // ESPECIAIS
    {
        id: 'chapeu-ouro',
        name: 'Pizza Chapéu de Ouro',
        description: 'Carne de sol, queijo coalho e tomate seco ao molho especial da casa.',
        price: 62.90,
        category: 'especiais',
        image: '/pizza-chapeu-ouro.png',
        badge: 'Chef',
    },
    {
        id: 'nordestina',
        name: 'Pizza Nordestina',
        description: 'Carne de sol, manteiga de garrafa, cebola caramelizada e queijo coalho.',
        price: 59.90,
        category: 'especiais',
        image: '/pizza-vaqueiro.png',
        badge: 'Nova',
    },
    {
        id: 'tropeira',
        name: 'Pizza Tropeira',
        description: 'Feijão tropeiro, bacon, torresmo e couve refogada na manteiga.',
        price: 57.90,
        category: 'especiais',
        image: '/pizza-sertaneja.png',
    },

    // DOCES
    {
        id: 'doce-sertao',
        name: 'Pizza Doce do Sertão',
        description: 'Chocolate meio amargo, morango fresco e leite condensado.',
        price: 44.90,
        category: 'doces',
        image: '/pizza-chapeu-ouro.png',
        badge: 'Favorita',
    },
    {
        id: 'romeu-julieta',
        name: 'Pizza Romeu e Julieta',
        description: 'Goiabada cremosa com queijo coalho gratinado.',
        price: 38.90,
        category: 'doces',
        image: '/pizza-vaqueiro.png',
    },

    // BEBIDAS
    {
        id: 'coca-2l',
        name: 'Coca-Cola 2 Litros',
        description: 'Ideal para compartilhar com a família.',
        price: 14.00,
        category: 'bebidas',
        image: '/hero-bg.png',
    },
    {
        id: 'coca-lata',
        name: 'Coca-Cola Lata 350ml',
        description: 'Gelada e refrescante.',
        price: 6.00,
        category: 'bebidas',
        image: '/hero-bg.png',
    },
    {
        id: 'guarana-2l',
        name: 'Guaraná Antárctica 2L',
        description: 'O sabor do Brasil em 2 litros.',
        price: 12.00,
        category: 'bebidas',
        image: '/hero-bg.png',
    },
    {
        id: 'suco-maracuja',
        name: 'Suco de Maracujá 500ml',
        description: 'Natural, feito na hora.',
        price: 10.00,
        category: 'bebidas',
        image: '/hero-bg.png',
    },
    {
        id: 'agua-mineral',
        name: 'Água Mineral 500ml',
        description: 'Sem gás ou com gás.',
        price: 4.00,
        category: 'bebidas',
        image: '/hero-bg.png',
    },
];

export const categories = [
    { id: 'tradicionais', label: 'Tradicionais' },
    { id: 'especiais', label: 'Especiais' },
    { id: 'doces', label: 'Doces' },
    { id: 'bebidas', label: 'Bebidas' },
] as const;
