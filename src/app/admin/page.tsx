'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            if (password === 'ciello291108') {
                router.push('/admin/dashboard');
            } else {
                setError('Senha incorreta.');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-8 text-sm"
                >
                    <ArrowLeft size={16} />
                    Voltar ao site
                </Link>

                {/* Card */}
                <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl p-8 sm:p-10 shadow-2xl">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Image
                            src="/logo.png"
                            alt="Pizzaria do Vaqueiro"
                            width={160}
                            height={64}
                            className="h-16 w-auto object-contain"
                        />
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-4">
                            <Lock size={20} className="text-[#D4AF37]" />
                        </div>
                        <h1 className="font-serif text-2xl font-bold text-white">Painel Administrativo</h1>
                        <p className="text-gray-400 text-sm mt-2">Digite a senha para acessar</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">Senha</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-600 outline-none transition-colors text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#D4AF37] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-gold w-full py-3.5 rounded-xl font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-600 text-xs mt-6">
                    © {new Date().getFullYear()} Pizzaria do Vaqueiro — Área restrita
                </p>
            </div>
        </div>
    );
}
