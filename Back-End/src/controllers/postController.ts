import { Request, Response } from "express";
import * as postService from "../services/postServices";

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await postService.getAllPostsService();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar posts" });
  }
}

export async function getPostById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const post = await postService.getPostByIdService(id);
    if (!post) return res.status(404).json({ message: "Post não encontrado" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Error ao buscar post" });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const { title, content, author } = req.body;
    const newPost = await postService.createPostService({
      title,
      content,
      author,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar post" });
  }
}

export async function updatePost(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const updated = await postService.updatePostService(id, req.body);
    if (!updated)
      return res.status(404).json({ message: "Post não encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar post" });
  }
}

export async function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await postService.deletePostService(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir post" });
  }
}
