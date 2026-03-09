'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Promoções', href: '#promocoes' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { toggleCart, totalItems } = useCartStore();
    const itemCount = totalItems();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg shadow-black/50 border-b border-[#D4AF37]/20'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <div className="flex items-center cursor-pointer shrink-0" onClick={() => handleNavClick('#inicio')}>
                            <Image
                                src="/logo.png"
                                alt="Pizzaria do Vaqueiro"
                                width={140}
                                height={56}
                                className="h-12 md:h-14 w-auto object-contain"
                                priority
                            />
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-200 text-sm font-medium tracking-wide"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </nav>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            {/* Cart Button */}
                            <button
                                onClick={toggleCart}
                                className="relative p-2.5 rounded-full border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-200"
                                aria-label="Carrinho"
                            >
                                <ShoppingCart className="text-[#D4AF37]" size={20} />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#0A0A0A] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            {/* CTA Button - Desktop */}
                            <button
                                onClick={() => handleNavClick('#cardapio')}
                                className="hidden md:block btn-gold px-5 py-2.5 rounded-full text-sm font-bold tracking-wide"
                            >
                                PEDIR AGORA
                            </button>

                            {/* Hamburger - Mobile */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="md:hidden p-2 text-white hover:text-[#D4AF37] transition-colors"
                                aria-label="Menu"
                            >
                                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-lg flex flex-col pt-24 px-8">
                    <nav className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className="text-left text-2xl font-serif font-semibold text-white hover:text-[#D4AF37] transition-colors border-b border-[#1A1A1A] pb-4"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>
                    <button
                        onClick={() => { handleNavClick('#cardapio'); }}
                        className="btn-gold mt-10 py-4 rounded-2xl text-lg font-bold tracking-wide w-full"
                    >
                        PEDIR AGORA
                    </button>
                </div>
            )}
        </>
    );
}
