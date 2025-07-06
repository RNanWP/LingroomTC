import { Post, IPost } from "../models/Post";

export async function getAllPostsService(): Promise<IPost[]> {
  return Post.find().sort({ createdAt: -1 }).exec();
}

export async function getPostByIdService(id: string): Promise<IPost | null> {
  return Post.findById(id).exec();
}

export async function createPostService(data: {
  title: string;
  content: string;
  author: string;
}): Promise<IPost> {
  const post = new Post(data);
  return post.save();
}

export async function updatePostService(
  id: string,
  data: Partial<{ title: string; content: string }>
): Promise<IPost | null> {
  return Post.findByIdAndUpdate(id, data, { new: true }).exec();
}

export async function deletePostService(id: string): Promise<IPost | null> {
  return Post.findByIdAndDelete(id).exec();
}
