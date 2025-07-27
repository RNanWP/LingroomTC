import request from "supertest";
import { Types } from "mongoose";
import { app } from "../app";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { Comment } from "../models/Comment";

interface TestUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

let professor: TestUser;
let aluno: TestUser;
let admin: TestUser;
let professorToken: string;
let alunoToken: string;
let adminToken: string;
let testPostId: string;
let testCommentId: string;

beforeEach(async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
  await Comment.deleteMany({});

  // Cria e loga aluno
  const alunoRegRes = await request(app).post("/api/users/register").send({
    name: "Aluno Comentarista",
    email: "aluno.comment@teste.com",
    password: "123",
    role: "aluno",
  });
  aluno = alunoRegRes.body.user;
  const alunoLoginRes = await request(app).post("/api/users/login").send({
    email: "aluno.comment@teste.com",
    password: "123",
  });
  alunoToken = alunoLoginRes.body.token;

  // Cria e loga professor
  const profRegRes = await request(app).post("/api/users/register").send({
    name: "Professor Comentarista",
    email: "professor.comment@teste.com",
    password: "123",
    role: "professor",
  });
  professor = profRegRes.body.user;
  const profLoginRes = await request(app).post("/api/users/login").send({
    email: "professor.comment@teste.com",
    password: "123",
  });
  professorToken = profLoginRes.body.token;

  // Cria e loga admin
  const adminRegRes = await request(app).post("/api/users/register").send({
    name: "Admin Comentarista",
    email: "admin.comment@teste.com",
    password: "123",
    role: "administrador",
  });
  admin = adminRegRes.body.user;
  const adminLoginRes = await request(app)
    .post("/api/users/login")
    .send({ email: "admin.comment@teste.com", password: "123" });
  adminToken = adminLoginRes.body.token;

  // Cria post e comentário
  const post = await new Post({
    title: "Post para Comentários",
    content: "Conteúdo",
    author: professor._id,
  }).save();
  testPostId = post.id;

  const comment = await new Comment({
    content: "Comentário inicial.",
    post: testPostId,
    author: aluno._id,
  }).save();
  testCommentId = comment.id;
});

describe("Testes das Rotas de Comentários", () => {
  it("Deve permitir que um aluno crie um comentário", async () => {
    const res = await request(app)
      .post(`/api/posts/${testPostId}/comments`)
      .set("Authorization", `Bearer ${alunoToken}`)
      .send({ content: "Ótimo post!" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("content", "Ótimo post!");
  });

  it("Deve listar os comentários de um post", async () => {
    const res = await request(app).get(`/api/posts/${testPostId}/comments`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].content).toBe("Comentário inicial.");
  });

  it("Deve permitir que um professor responda a um comentário", async () => {
    const res = await request(app)
      .post(`/api/comments/${testCommentId}/reply`)
      .set("Authorization", `Bearer ${professorToken}`)
      .send({ content: "Obrigado pelo feedback!" });

    expect(res.status).toBe(201);
    expect(res.body.parentComment).toBe(testCommentId);
  });

  it("NÃO deve permitir que um aluno responda a um comentário", async () => {
    const res = await request(app)
      .post(`/api/comments/${testCommentId}/reply`)
      .set("Authorization", `Bearer ${alunoToken}`)
      .send({ content: "De nada, professor!" });

    expect(res.status).toBe(403);
  });

  it("Deve permitir que um administrador delete um comentário de um aluno", async () => {
    const deleteRes = await request(app)
      .delete(`/api/admin/comments/${testCommentId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(deleteRes.status).toBe(204);

    const commentInDb = await Comment.findById(testCommentId);
    expect(commentInDb).toBeNull();
  });
});
