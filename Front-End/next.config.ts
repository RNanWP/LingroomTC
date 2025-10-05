/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },

      {
        protocol: "https",
        hostname: "www.google.com",
      },

      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },

      {
        protocol: "https",
        hostname: "i0.wp.com",
      },

      { protocol: "https", hostname: "images.unsplash.com" },

      { protocol: "https", hostname: "i.imgur.com" },

      { protocol: "https", hostname: "picjumbo.com" },

      { protocol: "https", hostname: "img.freepik.com" },

      { protocol: "https", hostname: "outro-site.com" },

      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },

      {
        protocol: "https",
        hostname: "png.pngtree.com",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "lingroomtc-egxb.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
