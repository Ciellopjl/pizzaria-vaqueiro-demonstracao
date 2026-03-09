'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ClipboardList,
    UtensilsCrossed,
    ExternalLink,
    LogOut,
    Menu,
    X,
    TicketPercent
} from 'lucide-react';

const sidebarLinks = [
    { label: 'Início', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Pedidos', href: '/admin/pedidos', icon: ClipboardList },
    { label: 'Cardápio', href: '/admin/cardapio', icon: UtensilsCrossed },
    { label: 'Promoções', href: '/admin/promocoes', icon: TicketPercent },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex">
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-[#D4AF37]/15 flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                {/* Logo */}
                <div className="p-6 border-b border-[#D4AF37]/15">
                    <div className="flex items-center justify-center mb-3">
                        <Image
                            src="/logo.png"
                            alt="Pizzaria do Vaqueiro"
                            width={100}
                            height={100}
                            className="h-16 w-auto object-contain"
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-[#D4AF37] font-serif font-bold text-sm tracking-widest uppercase">Painel Admin</p>
                        <p className="text-gray-500 text-xs mt-0.5">Pizzaria do Vaqueiro</p>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-6 space-y-1.5">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-[#D4AF37] text-[#0A0A0A] shadow-lg shadow-[#D4AF37]/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <link.icon size={18} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Links */}
                <div className="px-4 py-5 border-t border-[#D4AF37]/15 space-y-1.5">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-[#D4AF37] transition-colors"
                    >
                        <ExternalLink size={18} />
                        Ver Vitrine
                    </Link>
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 transition-colors"
                    >
                        <LogOut size={18} />
                        Sair
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Header Superior Mobile */}
                <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between p-4 border-b border-[#D4AF37]/20 bg-[#0A0A0A]/80 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="Pizzaria do Vaqueiro"
                            width={80}
                            height={32}
                            className="h-8 w-auto object-contain"
                        />
                        <span className="text-[#D4AF37] font-serif font-bold text-xs tracking-widest uppercase">Admin</span>
                    </div>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all active:scale-90"
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-5 sm:p-6 lg:p-10 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
