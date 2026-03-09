'use client';

import { useState, useEffect } from 'react';
import { UtensilsCrossed, Truck, Star, Gift, Percent, Timer } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';

const iconMap = {
    UtensilsCrossed: <UtensilsCrossed size={40} className="text-[#D4AF37]" />,
    Truck: <Truck size={40} className="text-[#D4AF37]" />,
    Star: <Star size={40} className="text-[#D4AF37]" />,
    Gift: <Gift size={40} className="text-[#D4AF37]" />,
    Percent: <Percent size={40} className="text-[#D4AF37]" />,
    Timer: <Timer size={40} className="text-[#D4AF37]" />,
};

export default function PromotionsSection() {
    const { promotions } = useAdminStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <section id="promocoes" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-5 py-2 mb-5">
                        <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Promoções Imperdíveis</span>
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
                        Ofertas de <span className="gold-text">Hoje</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Economize mais e coma muito melhor!
                    </p>
                    <div className="gold-separator w-24 mx-auto mt-6" />
                </div>

                {/* Promotion Cards */}
                {promotions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {promotions.map((promo) => (
                            <div
                                key={promo.id}
                                className={`bg-gradient-to-br ${promo.color} border ${promo.borderColor} rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300`}
                            >
                                <div className="mb-5">{iconMap[promo.icon as keyof typeof iconMap] || iconMap.Star}</div>
                                <span className="inline-block text-[#D4AF37] text-xs font-bold tracking-widest uppercase bg-[#D4AF37]/15 px-3 py-1 rounded-full mb-4">
                                    {promo.tag}
                                </span>
                                <h3 className="font-serif font-bold text-xl text-white mb-3">{promo.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{promo.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-[#0A0A0A]/30 rounded-3xl border border-dashed border-[#D4AF37]/10 mb-16">
                        <p className="text-gray-500 italic">Nenhuma promoção ativa no momento. Fique atento!</p>
                    </div>
                )}

                {/* About Banner */}
                <div id="sobre" className="mt-14 rounded-3xl p-10 md:p-14 border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-transparent text-center">
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                        A Nossa <span className="gold-text">História</span>
                    </h3>
                    <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg">
                        Nascida em Batalha, Alagoas, a <strong className="text-[#D4AF37]">Pizzaria do Vaqueiro</strong> une o melhor da culinária italiana com os sabores mais autênticos do Nordeste brasileiro. Utilizamos ingredientes regionais de primeira qualidade — como carne de sol, queijo coalho e manteiga de garrafa — para criar pizzas verdadeiramente únicas.
                    </p>
                </div>
            </div>
        </section>
    );
}
