// "use client";

// import React, { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// interface ImageUploadProps {
//   onImageSelect: (image: string | File) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
//   const [imageUrl, setImageUrl] = useState("");

//   const handleUrlSubmit = () => {
//     if (imageUrl) {
//       onImageSelect(imageUrl);
//     }
//   };

//   // A funcionalidade de arrastar e soltar (DragDropZone) é mais complexa
//   // e envolve um back-end que aceite uploads de arquivo.
//   // Por enquanto, vamos focar na funcionalidade de URL que é mais simples.

//   return (
//     <Tabs defaultValue="url" className="w-full">
//       <TabsList className="grid w-full grid-cols-2">
//         <TabsTrigger value="url">Usar URL</TabsTrigger>
//         <TabsTrigger value="upload" disabled>
//           Enviar Arquivo (em breve)
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
//         {/* Futuramente, aqui entraria o <DragDropZone /> */}
//         <p className="text-sm text-muted-foreground mt-4">
//           A funcionalidade de envio de arquivos do seu computador estará
//           disponível em breve.
//         </p>
//       </TabsContent>
//     </Tabs>
//   );
// };

// export default ImageUpload;
