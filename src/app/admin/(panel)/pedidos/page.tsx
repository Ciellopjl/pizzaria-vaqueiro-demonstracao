'use client';

import { useState, useEffect } from 'react';
import { Eye, Search, Clock, CheckCircle, Truck, Package, X, Phone, MapPin, Receipt } from 'lucide-react';
import { useAdminStore, Order } from '@/store/adminStore';

export default function PedidosPage() {
    const { orders, updateOrderStatus, deleteOrder } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const filteredOrders = orders.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.includes(searchTerm)
    );

    const getStatusInfo = (status: Order['status']) => {
        switch (status) {
            case 'pending': return { label: 'Pendente', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: Clock };
            case 'preparing': return { label: 'Preparando', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: Package };
            case 'on_way': return { label: 'Em Entrega', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20', icon: Truck };
            case 'delivered': return { label: 'Entregue', color: 'bg-green-500/10 text-green-500 border-green-500/20', icon: CheckCircle };
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Pedidos</h1>
                    <p className="text-gray-400 mt-1">Gerencie e acompanhe a logística em tempo real.</p>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-8 group">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#D4AF37] transition-colors" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por cliente ou ID do pedido..."
                    className="w-full bg-[#1A1A1A] border border-[#D4AF37]/10 focus:border-[#D4AF37] rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-700 outline-none transition-all shadow-xl"
                />
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-[#1A1A1A] border border-[#D4AF37]/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full">
                        <thead className="bg-[#0A0A0A]/40">
                            <tr>
                                <th className="text-left px-6 py-5 text-[10px] font-black text-gray-500 tracking-widest uppercase">ID</th>
                                <th className="text-left px-6 py-5 text-[10px] font-black text-gray-500 tracking-widest uppercase">Cliente</th>
                                <th className="text-left px-6 py-5 text-[10px] font-black text-gray-500 tracking-widest uppercase">Status</th>
                                <th className="text-left px-6 py-5 text-[10px] font-black text-gray-500 tracking-widest uppercase">Pagamento</th>
                                <th className="text-left px-6 py-5 text-[10px] font-black text-gray-500 tracking-widest uppercase">Total</th>
                                <th className="text-center px-6 py-5 text-[10px] font-black text-gray-500 tracking-widest uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D4AF37]/5">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="p-4 bg-white/5 rounded-full">
                                                <Search size={32} className="text-gray-600" />
                                            </div>
                                            <p className="text-gray-500 font-medium">Nenhum pedido encontrado para sua busca.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => {
                                    const status = getStatusInfo(order.status);
                                    return (
                                        <tr key={order.id} className="hover:bg-white/[0.01] transition-colors">
                                            <td className="px-6 py-5 text-white font-bold text-sm">#{order.id}</td>
                                            <td className="px-6 py-5">
                                                <p className="text-gray-300 font-bold text-sm">{order.customerName}</p>
                                                <p className="text-gray-500 text-[10px]">{order.customerPhone}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase ${status.color}`}>
                                                    <status.icon size={12} />
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-gray-400 text-xs font-bold">{order.paymentMethod}</td>
                                            <td className="px-6 py-5 text-[#D4AF37] font-black font-serif">R$ {order.total.toFixed(2).replace('.', ',')}</td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                                                        title="Ver Detalhes"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                                        className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-lg px-2 py-1.5 text-[10px] font-bold text-[#D4AF37] outline-none cursor-pointer"
                                                    >
                                                        <option value="pending">Pendente</option>
                                                        <option value="preparing">Preparando</option>
                                                        <option value="on_way">Em Entrega</option>
                                                        <option value="delivered">Entregue</option>
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile/Card List */}
            <div className="lg:hidden space-y-4">
                {filteredOrders.length === 0 ? (
                    <div className="bg-[#1A1A1A] border border-dashed border-[#D4AF37]/20 rounded-3xl p-16 text-center text-gray-500">
                        Nenhum pedido encontrado.
                    </div>
                ) : (
                    filteredOrders.map((order) => {
                        const status = getStatusInfo(order.status);
                        return (
                            <div key={order.id} className="bg-[#1A1A1A] border border-[#D4AF37]/10 rounded-2xl p-5 shadow-lg">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-white font-black">Pedido #{order.id}</p>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-0.5">
                                            {new Date(order.createdAt).toLocaleDateString()} às {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[9px] font-black uppercase ${status.color}`}>
                                        {status.label}
                                    </span>
                                </div>

                                <div className="space-y-4 mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white/5 p-2 rounded-lg text-[#D4AF37]">
                                            <Receipt size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white text-sm font-bold">{order.customerName}</p>
                                            <p className="text-gray-400 text-xs">{order.paymentMethod}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[#D4AF37] font-serif font-black">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 text-gray-400 font-bold text-xs"
                                    >
                                        <Eye size={16} />
                                        Detalhes
                                    </button>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                                        className="bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-xs font-bold text-[#D4AF37] outline-none"
                                    >
                                        <option value="pending">Pendente</option>
                                        <option value="preparing">Preparando</option>
                                        <option value="on_way">Entrega</option>
                                        <option value="delivered">Entregue</option>
                                    </select>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedOrder(null)} />
                    <div className="relative bg-[#111111] border border-[#D4AF37]/20 rounded-3xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-[#D4AF37]/10 flex items-center justify-between bg-[#1A1A1A]">
                            <div>
                                <h2 className="text-white font-serif font-bold text-2xl">Detalhes do Pedido <span className="text-[#D4AF37]">#{selectedOrder.id}</span></h2>
                                <p className="text-gray-500 text-xs mt-1">Status: <span className="text-[#D4AF37] font-bold">{getStatusInfo(selectedOrder.status).label}</span></p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-2.5 bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            {/* Customer Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Informações do Cliente</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Receipt size={18} className="text-gray-600" />
                                            <span className="text-sm font-bold">{selectedOrder.customerName}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <Phone size={18} className="text-gray-600" />
                                            <span className="text-sm">{selectedOrder.customerPhone}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-300">
                                            <MapPin size={18} className="text-gray-600" />
                                            <span className="text-sm leading-relaxed">{selectedOrder.address}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Pagamento</h4>
                                    <div className="bg-[#0A0A0A] p-4 rounded-2xl border border-white/5">
                                        <p className="text-white font-bold">{selectedOrder.paymentMethod}</p>
                                        {selectedOrder.changeFor && (
                                            <p className="text-gray-500 text-xs mt-1">Troco para: <span className="text-white">R$ {selectedOrder.changeFor}</span></p>
                                        )}
                                        {selectedOrder.observations && (
                                            <div className="mt-4 pt-4 border-t border-white/5">
                                                <p className="text-[10px] uppercase font-bold text-gray-600 mb-1">Observações</p>
                                                <p className="text-gray-400 text-xs italic">"{selectedOrder.observations}"</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Itens do Pedido</h4>
                                <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="p-4 flex justify-between items-center">
                                            <div className="flex gap-4 items-center">
                                                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-black text-xs">
                                                    {item.quantity}x
                                                </div>
                                                <span className="text-white font-bold text-sm">{item.name}</span>
                                            </div>
                                            <span className="text-gray-400 text-sm font-serif">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                                        </div>
                                    ))}
                                    <div className="p-4 bg-white/5 flex justify-between items-center">
                                        <span className="text-white font-black uppercase tracking-[0.2em] text-xs">Total</span>
                                        <span className="text-[#D4AF37] font-serif font-black text-xl">R$ {selectedOrder.total.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-[#1A1A1A] border-t border-[#D4AF37]/10 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => {
                                    if (confirm('Deseja realmente excluir este pedido do sistema?')) {
                                        deleteOrder(selectedOrder.id);
                                        setSelectedOrder(null);
                                    }
                                }}
                                className="px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-sm hover:bg-red-500 hover:text-white transition-all order-2 sm:order-1"
                            >
                                Excluir Registro
                            </button>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="flex-1 px-6 py-4 rounded-2xl bg-[#D4AF37] text-[#0A0A0A] font-black text-sm uppercase tracking-widest shadow-xl shadow-[#D4AF37]/20 order-1 sm:order-2"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
