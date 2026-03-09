/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    transpilePackages: ['@imgly/background-removal'],
};

export default nextConfig;
