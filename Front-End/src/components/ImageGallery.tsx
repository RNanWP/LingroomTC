"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageLightbox } from "@/components/ImageLightbox";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  className?: string;
  maxDisplay?: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className,
  maxDisplay = 5,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, maxDisplay);
  const remainingCount = images.length - maxDisplay;

  const getGridClassName = (count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    return "grid-cols-2 sm:grid-cols-3";
  };

  const getImageClassName = (index: number, total: number) => {
    if (total > 1 && index === 0) {
    }
    return "col-span-1 row-span-1";
  };

  return (
    <>
      <div className={cn("space-y-4", className)}>
        <div
          className={cn("grid gap-2", getGridClassName(displayImages.length))}
        >
          {displayImages.map((imageUrl, index) => (
            <Card
              key={index}
              className={cn(
                "overflow-hidden cursor-pointer group hover:shadow-medium transition-all duration-200",
                getImageClassName(index, displayImages.length)
              )}
              onClick={() => setSelectedImageIndex(index)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                  {index === maxDisplay - 1 && remainingCount > 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {images.length > 1 && (
          <p className="text-sm text-muted-foreground text-center">
            Clique em qualquer imagem para ver a galeria ({images.length}{" "}
            imagens)
          </p>
        )}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <ImageLightbox
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>
  );
};
