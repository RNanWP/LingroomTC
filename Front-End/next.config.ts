/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    eslint: { ignoreDuringBuilds: true },
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
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

      // --- GOOGLE IMAGES ---
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "encrypted-tbn1.gstatic.com" },
      { protocol: "https", hostname: "encrypted-tbn2.gstatic.com" },
      { protocol: "https", hostname: "encrypted-tbn3.gstatic.com" },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },

      { protocol: "https", hostname: "i0.wp.com", pathname: "/**" },
      { protocol: "https", hostname: "i1.wp.com", pathname: "/**" },
      { protocol: "https", hostname: "i2.wp.com", pathname: "/**" },

      // --- UNSPLASH / IMGUR / POSTIMG ---
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "i.imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "i.postimg.cc", pathname: "/**" },

      {
        protocol: "https",
        hostname: "external-preview.redd.it",
        pathname: "/**",
      },
      { protocol: "https", hostname: "preview.redd.it", pathname: "/**" },
      { protocol: "https", hostname: "i.redd.it", pathname: "/**" },

      // --- BANCOS POPULARES DE IMAGEM ---
      { protocol: "https", hostname: "img.freepik.com", pathname: "/**" },
      { protocol: "https", hostname: "png.pngtree.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.pixabay.com", pathname: "/**" },
      { protocol: "https", hostname: "live.staticflickr.com", pathname: "/**" },

      { protocol: "https", hostname: "picjumbo.com", pathname: "/**" },
      { protocol: "https", hostname: "static.vecteezy.com" },
      { protocol: "https", hostname: "wallpapers.com", pathname: "/**" },

      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
