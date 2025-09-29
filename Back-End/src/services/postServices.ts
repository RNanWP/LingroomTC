import { Post, IPost } from "../models/Post";

// Buscar post por palavra chave no titulo ou conteudo
export async function searchPostService(query: string): Promise<IPost[]> {
  const searchRegex = new RegExp(query, "i");

  return Post.find({
    $or: [
      { title: { $regex: searchRegex } },
      { content: { $regex: searchRegex } },
    ],
  })
    .sort({ createdAt: -1 })
    .populate("author", "name")
    .exec();
}

// Retorna todos os posts para gerenciamento (ADM)
export async function getAdminPostService(): Promise<IPost[]> {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("author", "name")
    .exec();

  return posts.filter((post: IPost) => post.author);
}

export async function getAllPostsService(): Promise<IPost[]> {
  return Post.find().sort({ createdAt: -1 }).populate("author", "name").exec();
}

export async function getPostByIdService(id: string): Promise<IPost | null> {
  return Post.findById(id).populate("author", "name").exec();
}

export async function createPostService(data: {
  title: string;
  content: string;
  imageUrl?: string;
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
