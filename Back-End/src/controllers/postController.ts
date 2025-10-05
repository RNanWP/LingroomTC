import { Request, Response } from "express";
import * as postService from "../services/postServices";

// barra de pesquisa
export async function searchPosts(req: Request, res: Response) {
  const query = req.query.q;

  if (!query || typeof query !== "string") {
    return res
      .status(400)
      .json({ message: "Parâmetro de busca é obrigatório" });
  }
  try {
    const post = await postService.searchPostService(query);
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar posts" });
  }
}

// Visão ADM
export async function getAdminPosts(req: Request, res: Response) {
  try {
    const posts = await postService.getAdminPostService();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar posts para admin" });
  }
}

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
    const { title, content, imageUrl } = req.body;
    const author = (req.user as any).id;
    const newPost = await postService.createPostService({
      title,
      content,
      imageUrl,
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

// Admin Delete
export async function deletePost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedPost = await postService.deletePostService(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir post" });
  }
}

// Função para lidar com o upload de imagem
export async function uploadImage(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    res.status(201).json({ imageUrl });
  } catch (error: any) {
    res.status(500).json({
      message: "Erro ao fazer upload da imagem",
      error: error.message,
    });
  }
}
