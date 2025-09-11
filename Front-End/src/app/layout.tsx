// src/app/layout.tsx
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LingroomTC",
  description: "Sua plataforma de blogging dinâmico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

// front-end/src/app/layout.tsx

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { AuthProvider } from "@/app/contexts/AuthContext"; // Import AuthProvider

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "LingroomTC",
//   description: "Sua plataforma de blogging dinâmico",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           {" "}
//           {/* Wrap the children */}
//           {children}
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
