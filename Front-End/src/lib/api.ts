import { Post } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export interface ApiError {
  message: string;
  status: number;
}

const mapId = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => mapId(item));
  }
  if (data && typeof data === "object" && !data.nodeType) {
    const newData: { [key: string]: any } = {};
    for (const key in data) {
      if (key === "_id") {
        newData["id"] = data[key];
      } else {
        newData[key] = mapId(data[key]);
      }
    }
    return newData;
  }
  return data;
};

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      body: options.body,
      credentials: "include", // importante se usa cookie/sessão
      mode: "cors",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.message || `Erro HTTP! Status: ${response.status}`,
        status: response.status,
      } as ApiError;
    }

    if (response.status === 204) {
      return undefined as T;
    }
    const data = await response.json();
    return mapId(data);
  } catch (error) {
    if (error && typeof error === "object" && "status" in error) {
      throw error;
    }
    throw {
      message:
        "Ocorreu um erro de rede. Verifique sua conexão com o servidor da API.",
      status: 0,
    } as ApiError;
  }
};

// --- API de Autenticação ---
export const authApi = {
  login: async (email: string, password: string) => {
    return apiRequest("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (name: string, email: string, password: string) => {
    return apiRequest("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },
};

// --- API de Posts ---
export const postsApi = {
  getAllPosts: async () => {
    return apiRequest("/posts");
  },
  getPost: async (id: string) => {
    return apiRequest(`/posts/${id}`);
  },
  searchPosts: async (query: string) => {
    return apiRequest(`/posts/search?q=${encodeURIComponent(query)}`);
  },
  createPost: async (
    title: string,
    content: string,
    imageUrl?: string 
  ): Promise<Post> => {
    return apiRequest("/posts", {
      method: "POST",
      body: JSON.stringify({ title, content, imageUrl }),
    });
  },

  updatePost: async (id: string, title: string, content: string) => {
    return apiRequest(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
    });
  },
  deletePost: async (id: string) => {
    return apiRequest(`/posts/${id}`, {
      method: "DELETE",
    });
  },
};

// --- API de Comentários ---
export const commentsApi = {
  getPostComments: async (postId: string) => {
    return apiRequest(`/posts/${postId}/comments`);
  },
  createComment: async (postId: string, content: string) => {
    return apiRequest(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },
  replyToComment: async (commentId: string, content: string) => {
    return apiRequest(`/comments/${commentId}/reply`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },
  deleteComment: async (commentId: string) => {
    return apiRequest(`/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};

// --- API de Administração ---
export const adminApi = {
  getAllPosts: async () => {
    return apiRequest("/admin/posts");
  },
  getAllUsers: async () => {
    return apiRequest("/admin/users");
  },
  getAllComments: async () => {
    return apiRequest("/admin/comments");
  },
  deleteUser: async (userId: string) => {
    return apiRequest(`/admin/users/${userId}`, {
      method: "DELETE",
    });
  },
  deletePost: async (postId: string) => {
    return apiRequest(`/admin/posts/${postId}`, {
      method: "DELETE",
    });
  },
  deleteComment: async (commentId: string) => {
    return apiRequest(`/admin/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};

// --- API de Upload de Imagens ---
export const uploadImage = async (
  file: File
): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/posts/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Falha no upload da imagem");
  }

  return response.json();
};
