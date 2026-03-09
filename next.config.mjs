/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    experimental: {
        esmExternals: 'loose', // Permite um tratamento mais flexível de módulos ESM (como onnxruntime-web)
    },
    transpilePackages: ['@imgly/background-removal'],
    webpack: (config, { isServer }) => {
        // Previne que pacotes importem dependências do Node.js no lado do cliente
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                crypto: false,
                module: false, // Corrige "Can't resolve 'module'" no ort.node.min.mjs
            };
        }

        // Regra para lidar corretamente com arquivos .mjs do onnxruntime-web
        config.module.rules.push({
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto',
            resolve: {
                fullySpecified: false,
            },
        });

        return config;
    },
};

export default nextConfig;
