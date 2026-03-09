'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Clock, Star, Plus, Eye, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { useAdminStore } from '@/store/adminStore';

export default function DashboardPage() {
    const { orders, pizzas } = useAdminStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    // Calculate stats
    const today = new Date().toLocaleDateString();
    const todayOrders = orders.filter(o => new Date(o.createdAt).toLocaleDateString() === today);
    const totalRevenue = todayOrders.reduce((acc, o) => acc + o.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const averageTicket = orders.length > 0 ? (orders.reduce((acc, o) => acc + o.total, 0) / orders.length) : 0;

    const stats = [
        {
            label: 'Faturamento Hoje',
            value: `R$ ${totalRevenue.toFixed(2).replace('.', ',')}`,
            change: todayOrders.length > 0 ? `+${todayOrders.length} ped.` : 'Nenhum',
            positive: true,
            icon: TrendingUp,
        },
        {
            label: 'Pedidos Pendentes',
            value: pendingOrders.toString(),
            subtitle: pendingOrders > 0 ? 'Ação necessária' : 'Tudo em dia',
            icon: Clock,
        },
        {
            label: 'Ticket Médio',
            value: `R$ ${averageTicket.toFixed(2).replace('.', ',')}`,
            icon: Star,
        },
    ];

    const recentOrders = orders.slice(0, 5);

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                        Bem-vindo, <span className="text-[#D4AF37]">Admin</span>
                    </h1>
                    <p className="text-gray-400 mt-1">Status geral da Pizzaria do Vaqueiro.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <Link
                        href="/admin/cardapio"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] font-bold text-sm bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 transition-all"
                    >
                        <UtensilsCrossed size={18} />
                        Cardápio
                    </Link>
                    <Link
                        href="/admin/pedidos"
                        className="flex-1 sm:flex-none btn-gold flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#D4AF37]/20"
                    >
                        <Plus size={18} />
                        Ver Pedidos
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-[#1A1A1A] border border-[#D4AF37]/15 rounded-2xl p-6 flex items-center justify-between hover:border-[#D4AF37]/30 transition-all group"
                    >
                        <div>
                            <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase mb-2">
                                {stat.label}
                            </p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-white font-serif font-bold text-3xl group-hover:text-[#D4AF37] transition-colors">{stat.value}</span>
                                {stat.change && (
                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${stat.positive ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                            {stat.subtitle && (
                                <p className={`text-xs font-bold mt-2 ${stat.value !== '0' ? 'text-[#D4AF37]' : 'text-gray-500'}`}>{stat.subtitle}</p>
                            )}
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors">
                            <stat.icon size={24} className="text-[#D4AF37]" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Table Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#D4AF37]/10 bg-[#222222]/30">
                    <h2 className="font-serif font-bold text-xl text-white">Pedidos Recentes</h2>
                    <Link
                        href="/admin/pedidos"
                        className="group text-[#D4AF37] text-xs font-black tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2"
                    >
                        Ver todos
                        <Plus size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Table for Desktop */}
                <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-[#0A0A0A]/40">
                                <th className="text-left px-6 py-4 text-[10px] font-black text-gray-500 tracking-widest uppercase">ID</th>
                                <th className="text-left px-6 py-4 text-[10px] font-black text-gray-500 tracking-widest uppercase">Cliente</th>
                                <th className="text-left px-6 py-4 text-[10px] font-black text-gray-500 tracking-widest uppercase">Status</th>
                                <th className="text-left px-6 py-4 text-[10px] font-black text-gray-500 tracking-widest uppercase">Total</th>
                                <th className="text-left px-6 py-4 text-[10px] font-black text-gray-500 tracking-widest uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D4AF37]/5">
                            {recentOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <div className="text-gray-600 italic flex flex-col items-center gap-3">
                                            <Clock size={32} strokeWidth={1} />
                                            <span>Nenhum pedido registrado hoje.</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 text-white text-sm font-bold">#{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-gray-300 text-sm font-medium">{order.customerName}</div>
                                            <div className="text-gray-500 text-[10px] tracking-tight">{order.customerPhone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block text-[10px] font-black uppercase px-2.5 py-1 rounded-md border ${order.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    order.status === 'preparing' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                        'bg-green-500/10 text-green-500 border-green-500/20'
                                                }`}>
                                                {order.status === 'pending' ? 'Pendente' : order.status === 'preparing' ? 'Preparando' : 'Finalizado'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#D4AF37] text-sm font-black font-serif">R$ {order.total.toFixed(2).replace('.', ',')}</td>
                                        <td className="px-6 py-4">
                                            <Link href={`/admin/pedidos?id=${order.id}`} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-[#D4AF37] hover:bg-white/10 transition-all flex items-center justify-center w-fit">
                                                <Eye size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Cards for Mobile */}
                <div className="sm:hidden divide-y divide-[#D4AF37]/5">
                    {recentOrders.length === 0 ? (
                        <div className="px-6 py-16 text-center text-gray-600 italic text-sm">
                            Nenhum pedido registrado hoje.
                        </div>
                    ) : (
                        recentOrders.map((order) => (
                            <div key={order.id} className="p-5 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-white font-bold">#{order.id}</p>
                                        <p className="text-gray-400 text-xs font-semibold">{order.customerName}</p>
                                    </div>
                                    <span className={`inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${order.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                            'bg-green-500/10 text-green-500 border-green-500/20'
                                        }`}>
                                        {order.status === 'pending' ? 'Pendente' : 'Finalizado'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center bg-[#0A0A0A]/40 p-3 rounded-xl border border-white/5">
                                    <p className="text-[#D4AF37] font-black text-lg">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                                    <Link href={`/admin/pedidos?id=${order.id}`} className="text-gray-400 p-2 border border-white/10 rounded-lg active:scale-90 transition-transform">
                                        <Eye size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
