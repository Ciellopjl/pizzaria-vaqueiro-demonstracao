'use client';

import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.classList.add('fade-in-up');
        }
    }, []);

    const scrollToMenu = () => {
        document.querySelector('#cardapio')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="inicio"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/hero-bg.png')" }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/50 to-[#0A0A0A]" />

            {/* Vignette sides */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/80" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mx-auto pt-24 md:pt-0">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-full px-5 py-2.5 mb-8 backdrop-blur-sm">
                    <span className="text-lg text-[#D4AF37]">★</span>
                    <span className="text-[#D4AF37] text-sm font-semibold tracking-widest uppercase">
                        Desde 2022 • Batalha, Alagoas
                    </span>
                </div>

                {/* Main Title */}
                <h1
                    ref={titleRef}
                    className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 opacity-0 px-2"
                    style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
                >
                    <span className="text-white">A pizza mais</span>
                    <br />
                    <span className="gold-text">lendária do</span>
                    <br />
                    <span className="text-white">sertão</span>
                </h1>

                {/* Separator */}
                <div className="gold-separator w-32 mx-auto mb-6" />

                {/* Subtitle */}
                <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light leading-relaxed fade-in-up" style={{ animationDelay: '0.3s' }}>
                    Pizza artesanal autêntica feita com ingredientes selecionados e entregue quentinha na sua casa
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <button
                        onClick={scrollToMenu}
                        className="btn-gold px-10 py-4 rounded-full text-lg font-bold tracking-wide w-full sm:w-auto shadow-lg shadow-[#D4AF37]/30"
                    >
                        Ver Cardápio
                    </button>
                    <button
                        onClick={scrollToMenu}
                        className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] px-10 py-4 rounded-full text-lg font-bold tracking-wide transition-all duration-300 w-full sm:w-auto"
                    >
                        Fazer Pedido
                    </button>
                </div>


            </div>

        </section>
    );
}
