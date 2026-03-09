'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { removeBackground } from '@imgly/background-removal';
import { categories } from '@/data/pizzas';
import type { Pizza } from '@/data/pizzas';
import { useAdminStore } from '@/store/adminStore';

export default function CardapioPage() {
    const { pizzas, addPizza, updatePizza, deletePizza } = useAdminStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('tradicionais');
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState<Pizza | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isProcessingImage, setIsProcessingImage] = useState(false);

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        category: 'tradicionais' as Pizza['category'],
        image: '/pizza-vaqueiro.png',
        badge: '',
    });

    // Hydration fix for persistent store
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const filteredItems = pizzas.filter((p) => p.category === selectedCategory);

    const handleOpenNew = () => {
        setEditItem(null);
        const defaultImage = (selectedCategory === 'bebidas') ? '/hero-bg.png' : '/pizza-vaqueiro.png';
        setForm({
            name: '',
            description: '',
            price: '',
            category: selectedCategory as Pizza['category'],
            image: defaultImage,
            badge: '',
        });
        setShowModal(true);
    };

    const handleEdit = (pizza: Pizza) => {
        setEditItem(pizza);
        setForm({
            name: pizza.name,
            description: pizza.description,
            price: pizza.price.toString(),
            category: pizza.category,
            image: pizza.image,
            badge: pizza.badge || '',
        });
        setShowModal(true);
    };

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Tem certeza que deseja excluir "${name}"?`)) {
            deletePizza(id);
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const pizzaData: Pizza = {
            id: editItem ? editItem.id : Date.now().toString(),
            name: form.name,
            description: form.description,
            price: parseFloat(form.price),
            category: form.category,
            image: form.image || '/pizza-vaqueiro.png',
            badge: form.badge || undefined,
        };

        if (editItem) {
            updatePizza(pizzaData);
        } else {
            addPizza(pizzaData);
        }
        setShowModal(false);
    };

    if (!isMounted) return null;

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Cardápio</h1>
                    <p className="text-gray-400 mt-1">Gerencie os itens do seu cardápio em tempo real.</p>
                </div>
                <button
                    onClick={handleOpenNew}
                    className="btn-gold flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#D4AF37]/20 w-full sm:w-auto justify-center transition-transform active:scale-95"
                >
                    <Plus size={18} />
                    Adicionar Item
                </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-4 no-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-6 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat.id
                            ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-lg shadow-[#D4AF37]/20'
                            : 'bg-[#1A1A1A] text-gray-400 border border-[#D4AF37]/15 hover:border-[#D4AF37]/30'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Items Grid */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((pizza) => (
                        <div
                            key={pizza.id}
                            className="group bg-[#1A1A1A] border border-[#D4AF37]/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/5"
                        >
                            <div className={`relative h-44 ${pizza.category === 'bebidas' ? 'bg-[#0A0A0A] p-4' : ''}`}>
                                <Image
                                    src={pizza.image}
                                    alt={pizza.name}
                                    fill
                                    className={`transition-transform duration-500 group-hover:scale-110 ${pizza.category === 'bebidas' ? 'object-contain' : 'object-cover'
                                        }`}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-60" />
                                {pizza.badge && (
                                    <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#0A0A0A] text-[10px] uppercase tracking-tighter font-black px-2.5 py-1 rounded-md shadow-lg">
                                        {pizza.badge}
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">{pizza.name}</h3>
                                    <span className="text-[#D4AF37] font-bold font-serif">
                                        R$ {pizza.price.toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-xs mb-5 line-clamp-2 leading-relaxed">{pizza.description}</p>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(pizza)}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-all"
                                    >
                                        <Pencil size={14} />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pizza.id, pizza.name)}
                                        className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                                        aria-label="Excluir"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-[#1A1A1A] rounded-3xl border border-dashed border-[#D4AF37]/20">
                    <div className="bg-[#D4AF37]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UtensilsCrossed size={24} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="text-white font-serif text-xl font-bold mb-2">Nenhum item encontrado</h3>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto">Esta categoria ainda não possui itens cadastrados.</p>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowModal(false)} />
                    <div className="relative bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="font-serif font-bold text-2xl text-white">
                                    {editItem ? 'Editar Item' : 'Novo Item'}
                                </h3>
                                <p className="text-gray-400 text-xs mt-1">Preencha as informações abaixo.</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="sm:col-span-2">
                                    <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Nome do Produto</label>
                                    <input
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-xl px-4 py-3.5 text-white placeholder-gray-700 outline-none transition-all text-sm"
                                        placeholder="Ex: Pizza do Vaqueiro"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Descrição Detalhada</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-xl px-4 py-3.5 text-white placeholder-gray-700 outline-none transition-all text-sm resize-none"
                                        placeholder="Descreva os ingredientes..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Preço Base (R$)</label>
                                    <input
                                        required
                                        type="number"
                                        step="0.01"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-xl px-4 py-3.5 text-white placeholder-gray-700 outline-none transition-all text-sm font-mono"
                                        placeholder="0,00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Categoria</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value as Pizza['category'] })}
                                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-xl px-4 py-3.5 text-white outline-none transition-all text-sm appearance-none"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Selo (Opcional)</label>
                                    <input
                                        value={form.badge}
                                        onChange={(e) => setForm({ ...form, badge: e.target.value })}
                                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 focus:border-[#D4AF37] rounded-xl px-4 py-3.5 text-white placeholder-gray-700 outline-none transition-all text-sm"
                                        placeholder="Ex: Mais Pedida"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-2">Imagem do Produto</label>
                                    <div className="flex flex-col gap-4">
                                        {form.image && (
                                            <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[#D4AF37]/20 bg-[#0A0A0A]">
                                                <Image
                                                    src={form.image}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setForm({ ...form, image: '' })}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600 transition-colors"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        )}
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="image-upload"
                                                className="hidden"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        try {
                                                            setIsProcessingImage(true);

                                                            // AI Background Removal
                                                            const blob = await removeBackground(file, {
                                                                progress: (item, progress) => {
                                                                    // console.log(`Processing ${item}: ${Math.round(progress * 100)}%`);
                                                                }
                                                            });

                                                            // Convert result to Base64
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setForm({ ...form, image: reader.result as string });
                                                                setIsProcessingImage(false);
                                                            };
                                                            reader.readAsDataURL(blob);
                                                        } catch (error) {
                                                            console.error("Failed to remove background:", error);
                                                            // Fallback to original image if AI fails
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setForm({ ...form, image: reader.result as string });
                                                                setIsProcessingImage(false);
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }
                                                }}
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className={`flex items-center justify-center gap-2 w-full bg-[#0A0A0A] border border-dashed border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-xl px-4 py-4 text-gray-400 hover:text-[#D4AF37] cursor-pointer transition-all text-xs font-bold uppercase tracking-widest ${isProcessingImage ? 'opacity-50 pointer-events-none' : ''}`}
                                            >
                                                {isProcessingImage ? (
                                                    <>
                                                        <Loader2 size={18} className="animate-spin" />
                                                        IA Removendo fundo...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ImageIcon size={18} />
                                                        {form.image ? 'Alterar Imagem' : 'Selecionar Imagem'}
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                        <p className="text-[10px] text-gray-500 italic text-center">Tamanho recomendado: 800x600px (JPG/PNG)</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-gold w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#D4AF37]/10 mt-4 transition-transform active:scale-[0.98]"
                            >
                                {editItem ? 'Salvar Alterações' : 'Adicionar ao Cardápio'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Custom hook logic for lucide icons if needed in future
function UtensilsCrossed(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 21 2-2m4-4 8-8a2 2 0 1 1 3 3L11 18l-2 2z" />
            <path d="m13 3.5 3 3" />
            <path d="M9 15 6.5 17.5" />
            <path d="M11.5 12.5 17 7" />
        </svg>
    )
}
