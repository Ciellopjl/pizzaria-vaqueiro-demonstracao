export interface Promotion {
    id: string;
    title: string;
    description: string;
    tag: string;
    icon: 'UtensilsCrossed' | 'Truck' | 'Star' | 'Gift' | 'Percent' | 'Timer';
    color: string;
    borderColor: string;
}

export const initialPromotions: Promotion[] = [
    {
        id: '1',
        icon: 'UtensilsCrossed',
        title: 'Leve 2, Pague 1',
        description: 'Todos os domingos, compre 2 pizzas tradicionais e ganhe a terceira de graça!',
        tag: 'Toda Domingo',
        color: 'from-[#D4AF37]/20 to-[#D4AF37]/5',
        borderColor: 'border-[#D4AF37]/40',
    },
    {
        id: '2',
        icon: 'Truck',
        title: 'Frete Grátis',
        description: 'Entrega gratuita para pedidos acima de R$ 60,00 dentro do raio de 5km.',
        tag: 'Acima de R$60',
        color: 'from-white/5 to-transparent',
        borderColor: 'border-white/10',
    },
    {
        id: '3',
        icon: 'Star',
        title: 'Combo Vaqueiro',
        description: '1 Pizza Grande + 2 Refrigerantes + Sobremesa por apenas R$ 89,90!',
        tag: 'Oferta Especial',
        color: 'from-[#D4AF37]/15 to-[#D4AF37]/5',
        borderColor: 'border-[#D4AF37]/30',
    },
];
