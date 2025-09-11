// src/types/index.ts

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "aluno" | "professor" | "administrador";
}

// Corrigindo IPost
export interface IPost {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id: string;
  content: string;
  author: IUser;
  post: string;
  parentComment?: string;
  createdAt: string;
  updatedAt: string;
}