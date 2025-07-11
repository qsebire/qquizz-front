import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '', // Laisser vide si pas de port spécifique, ou spécifier si nécessaire
                pathname: '/**', // Permet toutes les images sous ce domaine, quel que soit le chemin
            },
        ],
    },
};

export default nextConfig;
