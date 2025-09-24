// src/app/not-found.tsx - Código corrigido

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Oops! Página não encontrada
        </p>
        <Link
          href="/"
          className="text-primary hover:text-primary-hover font-medium underline underline-offset-4"
        >
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
}

// "use client";

// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error(
//       "Erro 404: O usuário tentou acessar uma rota inexistente:",
//       location.pathname
//     );
//   }, [location.pathname]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4">404</h1>
//         <p className="text-xl text-muted-foreground mb-4">
//           Oops! Page not found
//         </p>
//         <a
//           href="/"
//           className="text-primary hover:text-primary-hover font-medium underline underline-offset-4"
//         >
//           Voltar para Home
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NotFound;
