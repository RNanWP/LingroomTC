"use client";

import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import HomePageClient from "./HomePageClient";

const Loading = () => (
  <div className="min-h-screen bg-background">
    <div className="container py-8">
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg text-muted-foreground">
          Carregando posts...
        </span>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HomePageClient />
    </Suspense>
  );
};

export default HomePage;
