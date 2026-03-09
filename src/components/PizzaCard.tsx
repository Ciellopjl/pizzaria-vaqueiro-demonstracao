'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Star, X, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { pizzas as allPizzas } from '@/data/pizzas';
import type { Pizza } from '@/data/pizzas';

interface PizzaCardProps {
    pizza: Pizza;
}

const sizes = [
    { key: 'P', label: 'Pequena', slices: '4 fatias', multiplier: 0.8 },
    { key: 'M', label: 'Média', slices: '6 fatias', multiplier: 1.0 },
    { key: 'G', label: 'Grande', slices: '8 fatias', multiplier: 1.3 },
];

const isPizzaCategory = (category: string) =>
    ['tradicionais', 'especiais', 'doces'].includes(category);

export default function PizzaCard({ pizza }: PizzaCardProps) {
    const { addItem, openCart } = useCartStore();
    const [showModal, setShowModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [selectedFlavors, setSelectedFlavors] = useState<string[]>([pizza.id]);
    const [stuffedCrust, setStuffedCrust] = useState(false);

    const isPizza = isPizzaCategory(pizza.category);

    // Max flavors based on size
    const maxFlavors = selectedSize === 'P' ? 1 : selectedSize === 'M' ? 2 : 3;

    // Available flavors: all pizzas from tradicionais, especiais, doces
    const availableFlavors = allPizzas.filter((p) => isPizzaCategory(p.category));

    const currentSizeData = sizes.find((s) => s.key === selectedSize)!;
    const finalPrice = (pizza.price * currentSizeData.multiplier) + (stuffedCrust ? 5 : 0);

    const handleAddClick = () => {
        if (isPizza) {
            setSelectedSize('M');
            setQuantity(1);
            setSelectedFlavors([pizza.id]);
            setStuffedCrust(false);
            setShowModal(true);
        } else {
            // Bebidas: add directly
            addItem({
                id: pizza.id,
                name: pizza.name,
                description: pizza.description,
                category: pizza.category,
                price: pizza.price,
                image: pizza.image,
            });
            openCart();
        }
    };

    const toggleFlavor = (id: string) => {
        if (selectedFlavors.includes(id)) {
            // Don't remove if it's the last one
            if (selectedFlavors.length > 1) {
                setSelectedFlavors(selectedFlavors.filter((f) => f !== id));
            }
        } else {
            if (selectedFlavors.length < maxFlavors) {
                setSelectedFlavors([...selectedFlavors, id]);
            }
        }
    };

    const handleConfirm = () => {
        const flavorNames = selectedFlavors
            .map((id) => allPizzas.find((p) => p.id === id)?.name || '')
            .filter(Boolean);

        const sizeSuffix = `(${currentSizeData.key})${stuffedCrust ? ' + Borda Recheada' : ''}`;
        const flavorLabel = selectedFlavors.length > 1
            ? `${flavorNames.join(' / ')} ${sizeSuffix}`
            : `${pizza.name} ${sizeSuffix}`;

        const cartId = `${selectedFlavors.sort().join('-')}-${selectedSize}-${stuffedCrust ? 'stuffed' : 'normal'}`;

        for (let i = 0; i < quantity; i++) {
            addItem({
                id: cartId,
                name: flavorLabel,
                description: pizza.description,
                category: pizza.category,
                price: finalPrice,
                image: pizza.image,
            });
        }

        setShowModal(false);
        openCart();
    };

    return (
        <>
            <div className="pizza-card gold-border bg-[#1A1A1A] rounded-2xl overflow-hidden group cursor-pointer flex flex-col">
                {/* Image Container */}
                <div className={`relative h-52 overflow-hidden ${pizza.category === 'bebidas' ? 'bg-[#141414] p-6' : ''}`}>
                    <Image
                        src={pizza.image}
                        alt={pizza.name}
                        fill
                        className={`transition-transform duration-500 group-hover:scale-105 ${pizza.category === 'bebidas' ? 'object-contain' : 'object-cover'
                            }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />

                    {pizza.badge && (
                        <div className="absolute top-3 left-3">
                            <span className="bg-[#D4AF37] text-[#0A0A0A] text-xs font-bold px-3 py-1.5 rounded-full">
                                {pizza.badge}
                            </span>
                        </div>
                    )}

                    <div className="absolute top-3 right-3 flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className="text-[#D4AF37] fill-[#D4AF37]" />
                        ))}
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-serif font-bold text-lg text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                        {pizza.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                        {pizza.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        <div>
                            <span className="text-[#D4AF37] font-bold text-xl font-serif">
                                R$ {pizza.price.toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                        <button
                            onClick={handleAddClick}
                            className="btn-gold flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shadow-md"
                        >
                            <Plus size={16} />
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>

            {/* Pizza Order Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                    <div
                        className="relative bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-[#1A1A1A] border-b border-[#D4AF37]/15 p-5 flex items-center justify-between z-10">
                            <div>
                                <h3 className="font-serif font-bold text-xl text-white">{pizza.name}</h3>
                                <p className="text-gray-400 text-sm mt-0.5">Personalize seu pedido</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-5 space-y-6">
                            {/* Size Selection */}
                            <div>
                                <h4 className="text-white font-semibold text-sm mb-3 tracking-wide uppercase">Escolha o tamanho</h4>
                                <div className="grid grid-cols-3 gap-3">
                                    {sizes.map((size) => {
                                        const isActive = selectedSize === size.key;
                                        const sizePrice = pizza.price * size.multiplier;
                                        return (
                                            <button
                                                key={size.key}
                                                onClick={() => {
                                                    setSelectedSize(size.key);
                                                    // Adjust flavors if over max
                                                    const newMax = size.key === 'P' ? 1 : size.key === 'M' ? 2 : 3;
                                                    if (selectedFlavors.length > newMax) {
                                                        setSelectedFlavors(selectedFlavors.slice(0, newMax));
                                                    }
                                                }}
                                                className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-center ${isActive
                                                    ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                                                    : 'border-[#D4AF37]/15 hover:border-[#D4AF37]/40 bg-[#0A0A0A]'
                                                    }`}
                                            >
                                                <span className={`block text-2xl font-bold font-serif ${isActive ? 'text-[#D4AF37]' : 'text-white'}`}>
                                                    {size.key}
                                                </span>
                                                <span className="block text-xs text-gray-400 mt-1">{size.label}</span>
                                                <span className="block text-xs text-gray-500 mt-0.5">{size.slices}</span>
                                                <span className={`block text-sm font-bold mt-2 ${isActive ? 'text-[#D4AF37]' : 'text-gray-300'}`}>
                                                    R$ {sizePrice.toFixed(2).replace('.', ',')}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Flavor Selection */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-white font-semibold text-sm tracking-wide uppercase">
                                        Sabores ({selectedFlavors.length}/{maxFlavors})
                                    </h4>
                                    <span className="text-gray-500 text-xs">
                                        {maxFlavors === 1 ? '1 sabor' : `Até ${maxFlavors} sabores`}
                                    </span>
                                </div>
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                    {availableFlavors.map((flavor) => {
                                        const isSelected = selectedFlavors.includes(flavor.id);
                                        const isDisabled = !isSelected && selectedFlavors.length >= maxFlavors;
                                        return (
                                            <button
                                                key={flavor.id}
                                                onClick={() => toggleFlavor(flavor.id)}
                                                disabled={isDisabled}
                                                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${isSelected
                                                    ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                                                    : isDisabled
                                                        ? 'border-[#D4AF37]/5 bg-[#0A0A0A] opacity-40 cursor-not-allowed'
                                                        : 'border-[#D4AF37]/15 bg-[#0A0A0A] hover:border-[#D4AF37]/30'
                                                    }`}
                                            >
                                                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                                    <Image
                                                        src={flavor.image}
                                                        alt={flavor.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="40px"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-medium truncate ${isSelected ? 'text-[#D4AF37]' : 'text-white'}`}>
                                                        {flavor.name}
                                                    </p>
                                                </div>
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected
                                                    ? 'border-[#D4AF37] bg-[#D4AF37]'
                                                    : 'border-gray-600'
                                                    }`}>
                                                    {isSelected && (
                                                        <svg className="w-3 h-3 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div>
                                    <h4 className="text-white font-semibold text-sm mb-3 tracking-wide uppercase">Borda Recheada</h4>
                                    <button
                                        onClick={() => setStuffedCrust(!stuffedCrust)}
                                        className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all duration-200 ${stuffedCrust
                                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                                            : 'border-[#D4AF37]/15 bg-[#0A0A0A] text-gray-400 hover:border-[#D4AF37]/40'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${stuffedCrust ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-600'}`}>
                                            {stuffedCrust && <Plus size={12} className="text-[#0A0A0A] stroke-[3]" />}
                                        </div>
                                        <span className="font-bold text-sm">Adicionar (+ R$ 5,00)</span>
                                    </button>
                                </div>

                                <div>
                                    <h4 className="text-white font-semibold text-sm mb-3 tracking-wide uppercase">Quantidade</h4>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="text-white font-bold text-xl w-8 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-[#1A1A1A] border-t border-[#D4AF37]/15 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-400 text-sm">Total</span>
                                <span className="gold-text font-bold text-2xl font-serif">
                                    R$ {(finalPrice * quantity).toFixed(2).replace('.', ',')}
                                </span>
                            </div>
                            <button
                                onClick={handleConfirm}
                                className="btn-gold w-full py-4 rounded-xl font-bold text-base"
                            >
                                Adicionar ao Pedido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
