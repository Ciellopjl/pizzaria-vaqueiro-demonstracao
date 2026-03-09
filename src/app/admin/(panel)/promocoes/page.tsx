'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Star, Truck, UtensilsCrossed, Gift, Percent, Timer } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';
import type { Promotion } from '@/data/promotions';

const iconMap = {
    UtensilsCrossed,
    Truck,
    Star,
    Gift,
    Percent,
    Timer
};

export default function PromocoesPage() {
    const { promotions, addPromotion, updatePromotion, deletePromotion } = useAdminStore();
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState<Promotion | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    const [form, setForm] = useState({
        title: '',
        description: '',
        tag: '',
        icon: 'Star' as Promotion['icon'],
        color: 'from-[#D4AF37]/15 to-[#D4AF37]/5',
        borderColor: 'border-[#D4AF37]/30',
    });

    // Hydration fix
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleOpenNew = () => {
        setEditItem(null);
        setForm({
            title: '',
            description: '',
            tag: '',
            icon: 'Star',
            color: 'from-[#D4AF37]/15 to-[#D4AF37]/5',
            borderColor: 'border-[#D4AF37]/30',
        });
        setShowModal(true);
    };

    const handleEdit = (promo: Promotion) => {
        setEditItem(promo);
        setForm({
            title: promo.title,
            description: promo.description,
            tag: promo.tag,
            icon: promo.icon,
            color: promo.color,
            borderColor: promo.borderColor,
        });
        setShowModal(true);
    };

    const handleDelete = (id: string, title: string) => {
        if (confirm(`Excluir promoção "${title}"?`)) {
            deletePromotion(id);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const promoData: Promotion = {
            id: editItem ? editItem.id : Date.now().toString(),
            title: form.title,
            description: form.description,
            tag: form.tag,
            icon: form.icon,
            color: form.color,
            borderColor: form.borderColor,
        };

        if (editItem) {
            updatePromotion(promoData);
        } else {
            addPromotion(promoData);
        }
        setShowModal(false);
    };

    if (!isMounted) return null;

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        Promoções
                    </h1>
                    <p className="text-gray-400 mt-1">Gerencie as ofertas em destaque no site principal.</p>
                </div>
                <button
                    onClick={handleOpenNew}
                    className="btn-gold flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#D4AF37]/20 w-full sm:w-auto justify-center transition-transform active:scale-95"
                >
                    <Plus size={18} />
                    Nova Promoção
                </button>
            </div>

            {/* List */}
            {promotions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promotions.map((promo) => {
                        const IconComp = iconMap[promo.icon] || Star;
                        return (
                            <div
                                key={promo.id}
                                className={`relative group bg-gradient-to-br ${promo.color} border ${promo.borderColor} rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:border-[#D4AF37]/50`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-[#0A0A0A]/40 rounded-xl border border-[#D4AF37]/10">
                                        <IconComp size={24} className="text-[#D4AF37]" />
                                    </div>
                                    <div className="flex gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(promo)}
                                            className="p-2 rounded-lg bg-[#0A0A0A]/60 text-gray-400 hover:text-[#D4AF37] transition-colors"
                                            title="Editar"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(promo.id, promo.title)}
                                            className="p-2 rounded-lg bg-[#0A0A0A]/60 text-gray-400 hover:text-red-400 transition-colors"
                                            title="Excluir"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                <span className="inline-block text-[#D4AF37] text-[10px] font-black tracking-widest uppercase bg-[#D4AF37]/10 px-2.5 py-1 rounded-md mb-3 border border-[#D4AF37]/20">
                                    {promo.tag}
                                </span>
                                <h3 className="font-serif font-bold text-lg text-white mb-2">{promo.title}</h3>
                                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{promo.description}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="py-20 text-center bg-[#1A1A1A] rounded-3xl border border-dashed border-[#D4AF37]/20">
                    <div className="bg-[#D4AF37]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Gift size={24} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="text-white font-serif text-xl font-bold mb-2">Nenhuma promoção ativa</h3>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto">Crie ofertas especiais para atrair mais clientes.</p>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowModal(false)} />
                    <div className="relative bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-serif font-bold text-2xl text-white">
                                    {editItem ? 'Editar Promoção' : 'Nova Promoção'}
                                </h3>
                                <p className="text-gray-400 text-xs mt-1">Configure os detalhes da oferta pública.</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-5">
                            <div>
                                <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Título da Oferta</label>
                                <input
                                    required
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-xl px-4 py-3.5 text-white placeholder-gray-700 outline-none transition-all text-sm"
                                    placeholder="Ex: Combo Família"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Tag / Etiqueta</label>
                                <input
                                    required
                                    value={form.tag}
                                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                                    className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-xl px-4 py-3.5 text-white placeholder-gray-700 outline-none transition-all text-sm"
                                    placeholder="Ex: Só aos Domingos"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Descrição Curta</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-xl px-4 py-3.5 text-white placeholder-gray-700 outline-none transition-all text-sm resize-none"
                                    placeholder="Ex: 2 Pizzas + Bebida por R$ 79,90"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Ícone Representativo</label>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                    {Object.entries(iconMap).map(([name, Icon]) => (
                                        <button
                                            key={name}
                                            type="button"
                                            onClick={() => setForm({ ...form, icon: name as Promotion['icon'] })}
                                            className={`p-3 rounded-xl border transition-all flex items-center justify-center ${form.icon === name
                                                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0A0A0A]'
                                                : 'bg-[#0A0A0A] border-[#D4AF37]/20 text-[#D4AF37] hover:border-[#D4AF37]/50'}`}
                                            title={name}
                                        >
                                            <Icon size={20} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-gold w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#D4AF37]/10 mt-4 transition-transform active:scale-[0.98]"
                            >
                                {editItem ? 'Salvar Alterações' : 'Publicar Promoção'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
