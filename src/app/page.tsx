'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import PromotionsSection from '@/components/PromotionsSection';
import FooterSection from '@/components/FooterSection';
import CartSidebar from '@/components/CartSidebar';

export default function Home() {
    return (
        <main className="bg-[#0A0A0A] min-h-screen">
            <Header />
            <CartSidebar />
            <HeroSection />
            <MenuSection />
            <PromotionsSection />
            <FooterSection />
        </main>
    );
}
