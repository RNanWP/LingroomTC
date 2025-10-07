// "use client";

// import React from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import DragDropZone from "./DragDropZone";

// interface ImageUploadProps {
//   onImageSelect: (image: string | File) => void;
//   selectedFile: File | null;
//   clearFileSelection: () => void;
//   imageUrl: string;
//   setImageUrl: (url: string) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   onImageSelect,
//   selectedFile,
//   clearFileSelection,
//   imageUrl,
//   setImageUrl,
// }) => {
//   const handleUrlSubmit = () => {
//     if (imageUrl) {
//       onImageSelect(imageUrl);
//     }
//   };

//   return (
//     <Tabs defaultValue="url" className="w-full">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="url">Usar URL</TabsTrigger>
//         <TabsTrigger value="upload">Enviar Arquivo</TabsTrigger>
//       </TabsList>
//       <TabsContent value="url">
//         <div className="space-y-2 mt-4">
//           <Label htmlFor="imageUrlInput">URL da Imagem</Label>
//           <div className="flex space-x-2">
//             <Input
//               id="imageUrlInput"
//               placeholder="https://exemplo.com/imagem.png"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//             />
//             <Button type="button" onClick={handleUrlSubmit}>
//               Adicionar
//             </Button>
//           </div>
//         </div>
//       </TabsContent>
//       <TabsContent value="upload">
//         <div className="mt-4">
//           <DragDropZone
//             onFileSelect={(file) => onImageSelect(file)}
//             selectedFile={selectedFile}
//             clearSelection={clearFileSelection}
//           />
//         </div>
//       </TabsContent>
//     </Tabs>
//   );
// };

// export default ImageUpload;

"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DragDropZone from "./DragDropZone";

// CORREÇÃO 1: Definindo as propriedades que o componente realmente recebe
interface ImageUploadProps {
  onImageSelect: (image: string | File) => void;
  selectedFile: File | null;
  clearFileSelection: () => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  selectedFile,
  clearFileSelection,
  imageUrl,
  setImageUrl,
}) => {
  const handleUrlSubmit = () => {
    if (imageUrl) {
      onImageSelect(imageUrl);
    }
  };

  // CORREÇÃO 2: Removida a lógica problemática que usava 'images.length'
  return (
    <Tabs defaultValue="url" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="url">Usar URL</TabsTrigger>
        <TabsTrigger value="upload">Enviar Arquivo</TabsTrigger>
      </TabsList>
      <TabsContent value="url">
        <div className="space-y-2 mt-4">
          <Label htmlFor="imageUrlInput">URL da Imagem</Label>
          <div className="flex space-x-2">
            <Input
              id="imageUrlInput"
              placeholder="https://exemplo.com/imagem.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button type="button" onClick={handleUrlSubmit}>
              Adicionar
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="upload">
        <div className="mt-4">
          <DragDropZone
            onFileSelect={(file) => onImageSelect(file)}
            selectedFile={selectedFile}
            clearSelection={clearFileSelection}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ImageUpload;

// "use client";

// import React, { useCallback, useState } from "react";
// import { X, Plus, Link, Upload } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import DragDropZone from "./DragDropZone";
// import { UploadedImage, ImageUploadProps } from "@/types";
// import { cn } from "@/lib/utils";
// import { useToast } from "@/hooks/use-toast";

// export const ImageUpload: React.FC<ImageUploadProps> = ({
//   images,
//   onImagesChange,
//   maxImages = 5,
//   maxSizeMB = 5,
// }) => {
//   const [urlInput, setUrlInput] = useState("");
//   const [isUploading, setIsUploading] = useState(false);
//   const { toast } = useToast();

//   const validateFile = useCallback(
//     (file: File): boolean => {
//       // Check file type
//       if (!file.type.startsWith("image/")) {
//         toast({
//           title: "Invalid file type",
//           description: `${file.name} is not an image file`,
//           variant: "destructive",
//         });
//         return false;
//       }

//       // Check file size
//       if (file.size > maxSizeMB * 1024 * 1024) {
//         toast({
//           title: "File too large",
//           description: `${file.name} exceeds ${maxSizeMB}MB limit`,
//           variant: "destructive",
//         });
//         return false;
//       }

//       return true;
//     },
//     [maxSizeMB, toast]
//   );

//   const handleFilesAdded = useCallback(
//     async (files: File[]) => {
//       if (images.length >= maxImages) {
//         toast({
//           title: "Maximum images reached",
//           description: `You can only upload up to ${maxImages} images`,
//           variant: "destructive",
//         });
//         return;
//       }

//       const validFiles = files.filter(validateFile);
//       const remainingSlots = maxImages - images.length;
//       const filesToProcess = validFiles.slice(0, remainingSlots);

//       if (filesToProcess.length === 0) return;

//       setIsUploading(true);

//       try {
//         const newImages: UploadedImage[] = [];

//         for (const file of filesToProcess) {
//           // Create preview URL
//           const preview = URL.createObjectURL(file);

//           // Simulate upload delay
//           await new Promise((resolve) =>
//             setTimeout(resolve, 500 + Math.random() * 1000)
//           );

//           // Mock upload - in real app this would upload to server
//           const mockUrl = `https://picsum.photos/800/600?random=${Date.now()}-${Math.random()}`;

//           newImages.push({
//             id: `${Date.now()}-${Math.random()}`,
//             url: mockUrl,
//             file,
//             preview,
//           });
//         }

//         onImagesChange([...images, ...newImages]);

//         toast({
//           title: "Images uploaded",
//           description: `${newImages.length} image(s) uploaded successfully`,
//         });
//       } catch (error) {
//         toast({
//           title: "Upload failed",
//           description: "Failed to upload images. Please try again.",
//           variant: "destructive",
//         });
//       } finally {
//         setIsUploading(false);
//       }
//     },
//     [images, onImagesChange, maxImages, validateFile, toast]
//   );

//   const handleUrlAdd = useCallback(() => {
//     if (!urlInput.trim()) return;

//     if (images.length >= maxImages) {
//       toast({
//         title: "Maximum images reached",
//         description: `You can only add up to ${maxImages} images`,
//         variant: "destructive",
//       });
//       return;
//     }

//     // Basic URL validation
//     try {
//       new URL(urlInput);
//     } catch {
//       toast({
//         title: "Invalid URL",
//         description: "Please enter a valid image URL",
//         variant: "destructive",
//       });
//       return;
//     }

//     const newImage: UploadedImage = {
//       id: `url-${Date.now()}`,
//       url: urlInput.trim(),
//     };

//     onImagesChange([...images, newImage]);
//     setUrlInput("");

//     toast({
//       title: "Image added",
//       description: "Image URL added successfully",
//     });
//   }, [urlInput, images, onImagesChange, maxImages, toast]);

//   const handleImageRemove = useCallback(
//     (imageId: string) => {
//       const imageToRemove = images.find((img) => img.id === imageId);
//       if (imageToRemove?.preview) {
//         URL.revokeObjectURL(imageToRemove.preview);
//       }

//       onImagesChange(images.filter((img) => img.id !== imageId));
//     },
//     [images, onImagesChange]
//   );

//   const handleImageReorder = useCallback(
//     (fromIndex: number, toIndex: number) => {
//       const newImages = [...images];
//       const [moved] = newImages.splice(fromIndex, 1);
//       newImages.splice(toIndex, 0, moved);
//       onImagesChange(newImages);
//     },
//     [images, onImagesChange]
//   );

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col sm:flex-row gap-4">
//         {/* URL Input */}
//         <div className="flex-1">
//           <div className="flex gap-2">
//             <div className="relative flex-1">
//               <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//               <Input
//                 placeholder="Add image URL..."
//                 value={urlInput}
//                 onChange={(e) => setUrlInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleUrlAdd()}
//                 className="pl-10"
//               />
//             </div>
//             <Button
//               onClick={handleUrlAdd}
//               variant="outline"
//               size="icon"
//               disabled={!urlInput.trim() || images.length >= maxImages}
//             >
//               <Plus className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Drag Drop Zone */}
//       {images.length < maxImages && (
//         <DragDropZone
//           onFilesAdded={handleFilesAdded}
//           maxFiles={maxImages - images.length}
//           disabled={isUploading}
//           className="min-h-[120px]"
//         />
//       )}

//       {/* Loading State */}
//       {isUploading && (
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-2 text-muted-foreground">
//               <Upload className="w-4 h-4 animate-pulse" />
//               <span>Uploading images...</span>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Image Preview Grid */}
//       {images.length > 0 && (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {images.map((image, index) => (
//             <Card key={image.id} className="relative group overflow-hidden">
//               <CardContent className="p-0">
//                 <div className="aspect-square relative">
//                   <img
//                     src={image.preview || image.url}
//                     alt={`Upload ${index + 1}`}
//                     className="w-full h-full object-cover transition-transform group-hover:scale-105"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

//                   {/* Remove Button */}
//                   <Button
//                     variant="destructive"
//                     size="icon"
//                     className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
//                     onClick={() => handleImageRemove(image.id)}
//                   >
//                     <X className="w-3 h-3" />
//                   </Button>

//                   {/* Index Number */}
//                   <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
//                     {index + 1}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Image Count */}
//       <div className="text-sm text-muted-foreground text-center">
//         {images.length} of {maxImages} images
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;
