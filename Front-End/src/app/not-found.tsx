// src/app/not-found.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.log("Página não encontrada:", pathname);
  }, [pathname]);

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold">404 - Página Não Encontrada</h1>
      <p className="mt-4">A página que você está procurando não existe.</p>
    </div>
  );
};

export default NotFound;
