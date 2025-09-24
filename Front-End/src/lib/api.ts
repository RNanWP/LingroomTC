const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export interface ApiError {
  message: string;
  status: number;
}

// Função para mapear _id para id em um objeto ou array de objetos
const mapId = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => mapId(item));
  }
  if (data && typeof data === "object" && data._id) {
    const { _id, ...rest } = data;
    return { id: _id, ...rest };
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
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

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
    // Mapeamento de _id para id
    const data = await response.json();
    return mapId(data); // <-- Mapeamento de _id para id
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
  createPost: async (title: string, content: string) => {
    return apiRequest("/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
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
