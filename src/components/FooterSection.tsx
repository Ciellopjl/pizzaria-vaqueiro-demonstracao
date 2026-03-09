'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Instagram, MessageCircle, Lock } from 'lucide-react';

const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Cardápio', href: '#cardapio' },
    { label: 'Promoções', href: '#promocoes' },
    { label: 'Sobre', href: '#sobre' },
];

export default function FooterSection() {
    const handleNavClick = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer id="contato" className="bg-[#0A0A0A] border-t border-[#D4AF37]/20 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <Image
                                src="/logo.png"
                                alt="Pizzaria do Vaqueiro"
                                width={200}
                                height={80}
                                className="h-20 w-auto object-contain"
                            />
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-4 max-w-sm">
                            A pizza mais lendária de Batalha, Alagoas. Feita com amor, ingredientes frescos e a tradição que só o Nordeste tem.
                        </p>
                        <div className="text-sm text-[#D4AF37]/80 font-medium mb-6">
                            <p>Av. Paulo Dantas, 298</p>
                            <p>Batalha, Alagoas - 57420-000</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif font-bold text-white text-lg mb-5">Links Rápidos</h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <button
                                        onClick={() => handleNavClick(link.href)}
                                        className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm"
                                    >
                                        → {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-serif font-bold text-white text-lg mb-5">Redes Sociais</h4>
                        <div className="flex gap-3">
                            {[
                                { icon: <Instagram size={18} />, label: 'Instagram', href: 'https://www.instagram.com/pizzariadovaqueiroo/?hl=pt-br' },
                                { icon: <MessageCircle size={18} />, label: 'WhatsApp', href: 'https://wa.me/5582988652775' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="gold-separator mb-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} Pizzaria do Vaqueiro. Todos os direitos reservados.</p>
                    <div className="flex items-center gap-6">
                        <p className="text-[#D4AF37]/60">Feito com amor em Batalha, Alagoas</p>
                        <Link
                            href="/admin"
                            className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#D4AF37]/60 transition-colors text-xs"
                        >
                            <Lock size={12} />
                            Admin
                        </Link>
                    </div>
                </div>
            </div>


        </footer>
    );
}
