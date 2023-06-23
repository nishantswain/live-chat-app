/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    // remotePatterns:[
    //   {
    //     protocol:"https",
    //     hostname:'images.pexels.com'
    //   }
    // ]
    domains: ['lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
