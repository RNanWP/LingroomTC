"use client";

import { IPost, IComment, IUser, ApiResponse } from "@/types";
import {
  mockPosts,
  mockComments,
  getCommentsForPost,
  getAllMockUsers,
  getPostsByAuthor,
  searchMockPosts,
} from "./mockData";

// Simulate network delay
const delay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock storage for runtime data modifications
let runtimePosts = [...mockPosts];
let runtimeComments = [...mockComments];
let runtimeUsers = [...getAllMockUsers()];

// Generate unique IDs
const generateId = () =>
  `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Get current user from localStorage
const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Mock Posts API
export const mockPostsApi = {
  getAllPosts: async (): Promise<IPost[]> => {
    console.log("📚 Mock API: Fetching all posts");
    await delay();
    return [...runtimePosts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getPost: async (id: string): Promise<IPost | null> => {
    console.log("📖 Mock API: Fetching post", id);
    await delay();
    const post = runtimePosts.find((p) => p._id === id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  },

  searchPosts: async (query: string): Promise<IPost[]> => {
    console.log("🔍 Mock API: Searching posts with query:", query);
    await delay();
    return searchMockPosts(query);
  },

  createPost: async (title: string, content: string): Promise<IPost> => {
    console.log("✍️ Mock API: Creating new post");
    await delay();

    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error("Authentication required");
    }

    const newPost: IPost = {
      id: generateId(),
      title,
      content,
      author: {
        id: currentUser.id,
        name: currentUser.name,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    runtimePosts.unshift(newPost);
    return newPost;
  },

  updatePost: async (
    id: string,
    title: string,
    content: string
  ): Promise<IPost> => {
    console.log("📝 Mock API: Updating post", id);
    await delay();

    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error("Authentication required");
    }

    const postIndex = runtimePosts.findIndex((p) => p._id === id);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }

    const post = runtimePosts[postIndex];
    if (
      post.author._id !== currentUser.id &&
      currentUser.role !== "administrador"
    ) {
      throw new Error("Permission denied");
    }

    const updatedPost = {
      ...post,
      title,
      content,
      updatedAt: new Date().toISOString(),
    };

    runtimePosts[postIndex] = updatedPost;
    return updatedPost;
  },

  deletePost: async (id: string): Promise<void> => {
    console.log("🗑️ Mock API: Deleting post", id);
    await delay();

    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error("Authentication required");
    }

    const postIndex = runtimePosts.findIndex((p) => p._id === id);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }

    const post = runtimePosts[postIndex];
    if (
      post.author._id !== currentUser.id &&
      currentUser.role !== "administrador"
    ) {
      throw new Error("Permission denied");
    }

    runtimePosts.splice(postIndex, 1);
    // Also remove associated comments
    runtimeComments = runtimeComments.filter((c) => c.postId !== id);
  },
};

// Mock Comments API
export const mockCommentsApi = {
  getPostComments: async (postId: string): Promise<IComment[]> => {
    console.log("💬 Mock API: Fetching comments for post", postId);
    await delay();
    return getCommentsForPost(postId);
  },

  createComment: async (postId: string, content: string): Promise<IComment> => {
    console.log("💭 Mock API: Creating comment for post", postId);
    await delay();

    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error("Authentication required");
    }

    const newComment: IComment = {
      id: generateId(),
      content,
      author: {
        _id: currentUser.id,
        name: currentUser.name,
      },
      postId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    runtimeComments.push(newComment);
    return newComment;
  },

  replyToComment: async (
    commentId: string,
    content: string
  ): Promise<IComment> => {
    console.log("↩️ Mock API: Creating reply to comment", commentId);
    await delay();

    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error("Authentication required");
    }

    const parentComment = runtimeComments.find((c) => c.id === commentId);
    if (!parentComment) {
      throw new Error("Parent comment not found");
    }

    const newReply: IComment = {
      id: generateId(),
      content,
      author: {
        id: currentUser.id,
        name: currentUser.name,
      },
      postId: parentComment.post,
      parentId: commentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    runtimeComments.push(newReply);
    return newReply;
  },

  deleteComment: async (commentId: string): Promise<void> => {
    console.log("🗑️ Mock API: Deleting comment", commentId);
    await delay();

    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error("Authentication required");
    }

    const commentIndex = runtimeComments.findIndex((c) => c.id === commentId);
    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }

    const comment = runtimeComments[commentIndex];
    if (
      comment.author.id !== currentUser.id &&
      currentUser.role !== "administrador"
    ) {
      throw new Error("Permission denied");
    }

    // Remove comment and all its replies
    const removeCommentAndReplies = (id: string) => {
      const replies = runtimeComments.filter((c) => c.parentId === id);
      replies.forEach((reply) => removeCommentAndReplies(reply.id));
      runtimeComments = runtimeComments.filter((c) => c.id !== id);
    };

    removeCommentAndReplies(commentId);
  },
};

// Mock Admin API
export const mockAdminApi = {
  getAllPosts: async (): Promise<IPost[]> => {
    console.log("🔐 Mock Admin API: Fetching all posts");
    await delay();

    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "administrador") {
      throw new Error("Admin access required");
    }

    return [...runtimePosts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getAllUsers: async (): Promise<IUser[]> => {
    console.log("👥 Mock Admin API: Fetching all users");
    await delay();

    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "administrador") {
      throw new Error("Admin access required");
    }

    return [...runtimeUsers].sort((a, b) => a.name.localeCompare(b.name));
  },

  getAllComments: async (): Promise<Comment[]> => {
    console.log("💬 Mock Admin API: Fetching all comments");
    await delay();

    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "administrador") {
      throw new Error("Admin access required");
    }

    return [...runtimeComments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  deleteUser: async (userId: string): Promise<void> => {
    console.log("🗑️ Mock Admin API: Deleting user", userId);
    await delay();

    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "administrador") {
      throw new Error("Admin access required");
    }

    if (userId === currentUser.id) {
      throw new Error("Cannot delete your own account");
    }

    const userIndex = runtimeUsers.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    // Remove user
    runtimeUsers.splice(userIndex, 1);

    // Remove user's posts and comments
    runtimePosts = runtimePosts.filter((p) => p.author._id !== userId);
    runtimeComments = runtimeComments.filter((c) => c.author.id !== userId);
  },

  deleteComment: async (commentId: string): Promise<void> => {
    console.log("🗑️ Mock Admin API: Deleting comment", commentId);
    await delay();

    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== "administrador") {
      throw new Error("Admin access required");
    }

    const commentIndex = runtimeComments.findIndex((c) => c.id === commentId);
    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }

    // Remove comment and all its replies
    const removeCommentAndReplies = (id: string) => {
      const replies = runtimeComments.filter((c) => c.parentId === id);
      replies.forEach((reply) => removeCommentAndReplies(reply.id));
      runtimeComments = runtimeComments.filter((c) => c.id !== id);
    };

    removeCommentAndReplies(commentId);
  },
};

// Fallback API that tries real API first, then falls back to mock
export const createFallbackApi = (realApi: any, mockApi: any) => {
  const fallbackMethods: any = {};

  Object.keys(mockApi).forEach((method) => {
    fallbackMethods[method] = async (...args: any[]) => {
      try {
        console.log(`🌐 Trying real API: ${method}`);
        return await realApi[method](...args);
      } catch (error) {
        console.log(`📱 Real API failed, using mock: ${method}`, error);
        return await mockApi[method](...args);
      }
    };
  });

  return fallbackMethods;
};
