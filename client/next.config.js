/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'ipfs.io' },
            { protocol: 'https', hostname: 'gateway.pinata.cloud' },
        ],
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false }
        config.resolve.alias = {
            ...config.resolve.alias,
            '@react-native-async-storage/async-storage': false,
        }
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        return config
    },
}

module.exports = nextConfig
