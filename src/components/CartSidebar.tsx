'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAdminStore } from '@/store/adminStore';

interface CheckoutData {
    nome: string;
    telefone: string;
    endereco: string;
    observacoes: string;
    pagamento: 'Pix' | 'Cartão' | 'Dinheiro';
    troco: string;
}

export default function CartSidebar() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, total, addItem } = useCartStore();
    const { addOrder, pizzas } = useAdminStore();
    const [showCheckout, setShowCheckout] = useState(false);
    const [form, setForm] = useState<CheckoutData>({
        nome: '',
        telefone: '',
        endereco: '',
        observacoes: '',
        pagamento: 'Pix',
        troco: '',
    });

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();

        const orderLines = items
            .map((item) => `- ${item.quantity}x ${item.name} — R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`)
            .join('\n');

        const totalFormatted = `R$ ${total().toFixed(2).replace('.', ',')}`;

        const orderId = Math.floor(1000 + Math.random() * 9000);

        // Record order in Admin Store
        const newOrder = {
            id: orderId.toString(),
            customerName: form.nome,
            customerPhone: form.telefone,
            address: form.endereco,
            items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
            total: total(),
            paymentMethod: form.pagamento,
            changeFor: form.troco || undefined,
            observations: form.observacoes || undefined,
            status: 'pending' as const,
            createdAt: new Date().toISOString(),
        };
        addOrder(newOrder);

        const paymentLine = form.pagamento === 'Dinheiro' && form.troco
            ? `*Pagamento:* Dinheiro (Troco para R$ ${form.troco})`
            : `*Pagamento:* ${form.pagamento}`;

        const message = encodeURIComponent(
            `*DOM PEDIDO #${orderId} - Pizzaria do Vaqueiro*\n\n` +
            `*Cliente:* ${form.nome}\n` +
            `*Telefone:* ${form.telefone}\n\n` +
            `*Pedido:*\n${orderLines}\n\n` +
            `*Total: ${totalFormatted}*\n` +
            `${paymentLine}\n\n` +
            `*Endereço:* ${form.endereco}\n` +
            (form.observacoes ? `*Observações:* ${form.observacoes}` : '')
        );

        const phone = '5582988652775';
        const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

        // Clear state before redirect so it's clean when user returns
        clearCart();
        setShowCheckout(false);
        closeCart();
        setForm({ nome: '', telefone: '', endereco: '', observacoes: '', pagamento: 'Pix', troco: '' });

        // On mobile, window.location.href is more reliable than window.open
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            window.location.href = whatsappUrl;
        } else {
            window.open(whatsappUrl, '_blank');
        }
    };

    const totalValue = total();

    // Suggest drinks that are NOT in the cart
    const suggestedDrinks = pizzas
        .filter(p => p.category === 'bebidas')
        .filter(p => !items.find(item => item.name.includes(p.name)))
        .slice(0, 4);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 cart-overlay z-40"
                    onClick={closeCart}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#1A1A1A] border-l border-[#D4AF37]/20 z-50 flex flex-col transition-transform duration-400 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-[#D4AF37]/20">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="text-[#D4AF37]" size={22} />
                        <h2 className="font-serif font-bold text-lg text-white">Meu Pedido</h2>
                        {items.length > 0 && (
                            <span className="bg-[#D4AF37] text-[#0A0A0A] text-xs font-bold px-2 py-0.5 rounded-full">
                                {items.reduce((s, i) => s + i.quantity, 0)}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                            <ShoppingBag size={64} className="mb-4 stroke-1" />
                            <p className="font-serif text-lg">Sua sacola está vazia</p>
                            <p className="text-sm">Que tal escolher uma pizza deliciosa?</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/5 ${item.category === 'bebidas' ? 'bg-[#141414] p-3' : ''}`}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className={`transition-transform duration-500 group-hover:scale-110 ${item.category === 'bebidas' ? 'object-contain' : 'object-cover'
                                                }`}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-white font-bold text-sm truncate pr-2">{item.name}</h3>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-600 hover:text-red-500 transition-colors shrink-0"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p className="text-gray-500 text-xs mb-3 line-clamp-1">{item.description}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 bg-[#0A0A0A] rounded-lg p-1 border border-white/5">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/5 text-gray-400"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-white text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/5 text-gray-400"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <p className="text-[#D4AF37] font-bold text-sm">
                                                R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Suggestions Section */}
                            {suggestedDrinks.length > 0 && !showCheckout && (
                                <div className="mt-10 pt-8 border-t border-white/5">
                                    <h4 className="text-white font-serif font-bold text-sm mb-4 flex items-center gap-2">
                                        <span className="w-1 h-4 bg-[#D4AF37] rounded-full" />
                                        Para Acompanhar?
                                    </h4>
                                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
                                        {suggestedDrinks.map((drink) => (
                                            <div
                                                key={drink.id}
                                                className="shrink-0 w-32 bg-[#0A0A0A] border border-white/5 rounded-xl p-3 flex flex-col gap-2 hover:border-[#D4AF37]/30 transition-colors"
                                            >
                                                <div className="relative w-full h-20 rounded-lg overflow-hidden flex items-center justify-center bg-[#141414] border border-white/5 p-2">
                                                    <Image
                                                        src={drink.image}
                                                        alt={drink.name}
                                                        fill
                                                        className="object-contain opacity-80"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-white text-[10px] font-bold truncate line-clamp-1">{drink.name}</p>
                                                    <p className="text-[#D4AF37] text-[10px] font-bold">R$ {drink.price.toFixed(2).replace('.', ',')}</p>
                                                </div>
                                                <button
                                                    onClick={() => addItem({
                                                        id: drink.id,
                                                        name: drink.name,
                                                        description: drink.description,
                                                        category: 'bebidas',
                                                        price: drink.price,
                                                        image: drink.image
                                                    })}
                                                    className="w-full py-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-5 border-t border-[#D4AF37]/20 bg-[#141414]">
                        {!showCheckout ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-400 text-sm">Total do pedido</span>
                                    <span className="text-white font-serif font-black text-2xl">
                                        R$ {totalValue.toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowCheckout(true)}
                                    className="w-full btn-gold py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-[#D4AF37]/10 transition-transform active:scale-[0.98]"
                                >
                                    Finalizar Pedido
                                </button>
                            </>
                        ) : (
                            <form onSubmit={handleCheckout} className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest">Seus Dados</h3>
                                    <button
                                        type="button"
                                        onClick={() => setShowCheckout(false)}
                                        className="text-gray-500 text-[10px] font-bold hover:text-white uppercase"
                                    >
                                        Voltar
                                    </button>
                                </div>
                                <input
                                    required
                                    placeholder="Nome completo"
                                    value={form.nome}
                                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37] transition-colors"
                                />
                                <input
                                    required
                                    placeholder="WhatsApp (ex: 82 98865-2775)"
                                    value={form.telefone}
                                    onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37] transition-colors"
                                />
                                <div className="space-y-2">
                                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest px-1">Forma de Pagamento</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {(['Pix', 'Cartão', 'Dinheiro'] as const).map((method) => (
                                            <button
                                                key={method}
                                                type="button"
                                                onClick={() => setForm({ ...form, pagamento: method })}
                                                className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${form.pagamento === method
                                                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0A0A0A]'
                                                    : 'bg-[#0A0A0A] border-white/10 text-gray-500'
                                                    }`}
                                            >
                                                {method}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {form.pagamento === 'Dinheiro' && (
                                    <input
                                        placeholder="Troco para quanto?"
                                        value={form.troco}
                                        onChange={(e) => setForm({ ...form, troco: e.target.value })}
                                        className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37] transition-colors animate-in fade-in duration-300"
                                    />
                                )}

                                <textarea
                                    placeholder="Endereço de entrega (Rua, Nº, Bairro, Ref)"
                                    required
                                    rows={2}
                                    value={form.endereco}
                                    onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37] transition-colors resize-none"
                                />

                                <textarea
                                    placeholder="Observações (opcional)"
                                    rows={1}
                                    value={form.observacoes}
                                    onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
                                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37] transition-colors resize-none"
                                />

                                <button
                                    type="submit"
                                    className="w-full btn-gold py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-[#D4AF37]/10"
                                >
                                    Enviar pelo WhatsApp — R$ {totalValue.toFixed(2).replace('.', ',')}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
