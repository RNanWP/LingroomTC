// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "LingroomTC",
  description: "Sua plataforma educacional para aprender e compartilhar.",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
              <Sonner />
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
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
