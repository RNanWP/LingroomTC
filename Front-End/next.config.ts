import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:3000/uploads/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
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

      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "picjumbo.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "outro-site.com" },
      { protocol: "https", hostname: "png.pngtree.com" },
      {
        protocol: "https",
        hostname: "external-preview.redd.it",
        pathname: "/**",
      },
      { protocol: "https", hostname: "preview.redd. it", pathname: "/**" },
      { protocol: "https", hostname: "i.redd.it", pathname: "/**" },
      { protocol: "https", hostname: "wallpapers.com" },
      { protocol: "https", hostname: "e1.pxfuel.com" },
      { protocol: "https", hostname: "i.pinimg.com" }
    ],
  },
};

export default nextConfig;
