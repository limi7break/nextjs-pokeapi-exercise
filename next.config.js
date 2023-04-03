/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/team/list',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
