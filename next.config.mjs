/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'resources.premierleague.com',
                port: '',
                pathname: '/premierleague/photos/**',
            },
            {
                protocol: 'https',
                hostname: 'resources.premierleague.com',
                port: '',
                pathname: '/premierleague25/photos/**',
            },
            {
                protocol: 'https',
                hostname: 'resources.premierleague.com',
                port: '',
                pathname: '/premierleague/badges/**',
            },
            {
                protocol: 'https',
                hostname: 'resources.premierleague.com',
                port: '',
                pathname: '/premierleague25/badges/**',
            },
        ],
    },
};

export default nextConfig;
