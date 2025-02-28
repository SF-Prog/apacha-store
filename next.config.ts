/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vuoqgbtqhwowtjsffdtm.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
},
}

module.exports = nextConfig