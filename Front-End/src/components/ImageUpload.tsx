"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DragDropZone from "./DragDropZone";

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

//
// "use client";

// import React from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// interface ImageUploadProps {
//   onImageSelect: (image: string) => void;
//   imageUrl: string;
//   setImageUrl: (url: string) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   onImageSelect,
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
//         <TabsTrigger value="upload" disabled>
//           Enviar Ficheiro (em breve)
//         </TabsTrigger>
//       </TabsList>
//       <TabsContent value="url">
//         <div className="space-y-2 mt-4">
//           <Label htmlFor="imageUrl">URL da Imagem</Label>
//           <div className="flex space-x-2">
//             <Input
//               id="imageUrl"
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
//         <p className="text-sm text-muted-foreground mt-4">
//           A funcionalidade de envio de ficheiros do seu computador estará
//           disponível em breve.
//         </p>
//       </TabsContent>
//     </Tabs>
//   );
// };

// export default ImageUpload;
