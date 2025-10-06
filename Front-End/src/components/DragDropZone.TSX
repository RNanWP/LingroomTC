"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File as FileIcon, X } from "lucide-react";

interface DragDropZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  clearSelection: () => void;
}

const DragDropZone: React.FC<DragDropZoneProps> = ({
  onFileSelect,
  selectedFile,
  clearSelection,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  if (selectedFile) {
    return (
      <div className="p-4 border rounded-md relative flex items-center space-x-2">
        <FileIcon className="h-6 w-6 text-primary" />
        <span className="text-sm text-muted-foreground truncate">
          {selectedFile.name}
        </span>
        <button
          type="button"
          onClick={clearSelection}
          className="absolute top-1 right-1 p-1 rounded-full hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-md text-center cursor-pointer transition-colors
      ${isDragActive ? "border-primary bg-primary/10" : "border-border"}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-muted-foreground">
        <UploadCloud className="h-10 w-10 mb-2" />
        {isDragActive ? (
          <p>Solte a imagem aqui...</p>
        ) : (
          <p>Arraste e solte uma imagem aqui, ou clique para selecionar</p>
        )}
        <p className="text-xs mt-1">PNG, JPG, GIF até 5MB</p>
      </div>
    </div>
  );
};

export default DragDropZone;



{/* <Card className="mt-6 gradient-card shadow-soft">
          <CardContent className="pt-6">
            <h3 className="font-heading font-semibold mb-3">
              Dicas de Escrita
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use títulos claros e descritivos.</li>
              <li>• Estruture seu conteúdo com parágrafos.</li>
              <li>
                •Adicione imagens relevantes para ilustrar seus pontos e
                envolver os leitores
              </li>
              <li>• Inclua exemplos do mundo real.</li>
              <li>• Revise seu conteúdo antes de publicar.</li>
              <li>• Interaja com os comentários.</li>
            </ul>
          </CardContent>
        </Card> */}