'use client';

import { useState, useEffect } from 'react';
import PizzaCard from './PizzaCard';
import { categories } from '@/data/pizzas';
import { useAdminStore } from '@/store/adminStore';

export default function MenuSection() {
    const { pizzas } = useAdminStore();
    const [activeCategory, setActiveCategory] = useState<string>('tradicionais');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const filtered = pizzas.filter((p) => p.category === activeCategory);

    return (
        <section id="cardapio" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-5 py-2 mb-5">
                        <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Nosso Cardápio</span>
                    </div>
                    <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
                        Sabores do <span className="gold-text">Sertão</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Pizzas feitas com amor, ingredientes frescos e a tradição nordestina
                    </p>
                    <div className="gold-separator w-24 mx-auto mt-6" />
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    {/* Sidebar Categories */}
                    <div className="md:w-64 shrink-0">
                        <div className="sticky top-28 flex flex-row md:flex-col gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide snap-x">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap md:whitespace-normal text-left border snap-start ${activeCategory === cat.id
                                        ? 'category-tab-active shadow-lg shadow-[#D4AF37]/20 border-transparent'
                                        : 'border-[#D4AF37]/20 text-gray-400 hover:border-[#D4AF37]/60 hover:text-[#D4AF37] bg-[#1A1A1A]/50'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pizza Grid */}
                    <div className="flex-1">
                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filtered.map((pizza) => (
                                    <PizzaCard key={pizza.id} pizza={pizza} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-600 bg-[#1A1A1A]/30 rounded-3xl border border-dashed border-[#D4AF37]/10">
                                <p className="text-5xl mb-4">🍕</p>
                                <p className="text-xl font-serif text-white mb-2">Em breve!</p>
                                <p className="text-sm">Esta categoria ainda não possui itens cadastrados.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
