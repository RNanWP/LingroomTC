export interface User {
  id: string;
  name: string;
  email: string;
  role: "aluno" | "professor" | "administrador";
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  post: {
    id: string;
    title: string;
  };
  parentId?: string;
  replies?: Comment[];
  parentComment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}