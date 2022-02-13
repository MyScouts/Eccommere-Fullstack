/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
        basePath: false
      },
    ]
  },
}



module.exports = nextConfig
