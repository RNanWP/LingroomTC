import {
  mockPostsApi,
  mockCommentsApi,
  mockAdminApi,
  createFallbackApi,
} from "../lib/mockApi";

const API_BASE_URL = "http://localhost:3001/api";

export interface ApiError {
  message: string;
  status: number;
}

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem("token");

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
        message: errorData.message || `HTTP error! status: ${response.status}`,
        status: response.status,
      } as ApiError;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && "status" in error) {
      throw error;
    }
    throw {
      message: "Network error occurred",
      status: 0,
    } as ApiError;
  }
};

// Auth API calls (still use real API since we have mock auth in AuthContext)
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

// Real Posts API calls
const realPostsApi = {
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

// Posts API with fallback to mock
export const postsApi = createFallbackApi(realPostsApi, mockPostsApi);

// Real Comments API calls
const realCommentsApi = {
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
    return apiRequest(`/admin/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};

// Comments API with fallback to mock
export const commentsApi = createFallbackApi(realCommentsApi, mockCommentsApi);

// Real Admin API calls
const realAdminApi = {
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
  deleteComment: async (commentId: string) => {
    return apiRequest(`/admin/comments/${commentId}`, {
      method: "DELETE",
    });
  },
};

// Admin API with fallback to mock
export const adminApi = createFallbackApi(realAdminApi, mockAdminApi);
