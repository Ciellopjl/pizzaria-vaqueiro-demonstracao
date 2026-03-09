import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pizzaria do Vaqueiro | Batalha, Alagoas",
    description: "Pizza artesanal de verdade em Batalha, Alagoas. Peça agora e receba na sua casa!",
    keywords: "pizzaria, pizza artesanal, vaqueiro, batalha, alagoas, carne de sol, queijo coalho, entrega",
    openGraph: {
        title: "Pizzaria do Vaqueiro",
        description: "A pizza mais lendária de Batalha, Alagoas",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>{children}</body>
        </html>
    );
}
