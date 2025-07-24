import request from "supertest";
import mongoose, { Types } from "mongoose";
import { app } from "../app";
import { Post } from "../models/Post";
import { IUser, User } from "../models/User";
import { Comment } from "../models/Comment";
import { MONGO_URI } from "../config";

// jest.setTimeout(30000);

interface TestUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

let professor: TestUser;
let aluno: TestUser;
let professorToken: string;
let alunoToken: string;
let testPostId: string;
let testCommentId: string;

// beforeAll(async () => {
//   const testMongoUri = MONGO_URI;
//   if (mongoose.connection.readyState === 0) {
//     await mongoose.connect(testMongoUri);
//   }
// });

beforeEach(async () => {
  // Limpar coleções
  await User.deleteMany({});
  await Post.deleteMany({});
  await Comment.deleteMany({});

  // Cria e loga aluno
  await request(app).post("/api/users/register").send({
    name: "Aluno Comentarista",
    email: "aluno.comment@teste.com",
    password: "123",
    role: "aluno",
  });
  const alunoLoginRes = await request(app).post("/api/users/login").send({
    email: "aluno.comment@teste.com",
    password: "123",
  });
  alunoToken = alunoLoginRes.body.token;
  aluno = alunoLoginRes.body.user;

  // Cria e loga professor
  await request(app).post("/api/users/register").send({
    name: "Professor Comentarista",
    email: "professor.comment@teste.com",
    password: "123",
    role: "professor",
  });
  const profLoginRes = await request(app).post("/api/users/login").send({
    email: "professor.comment@teste.com",
    password: "123",
  });
  professorToken = profLoginRes.body.token;
  professor = profLoginRes.body.user;

  // Cria post e comentário
  const post = await new Post({
    title: "Post para Comentários",
    content: "Conteúdo",
    author: professor._id.toString(),
  }).save();
  testPostId = post.id;

  const comment = await new Comment({
    content: "Comentário inicial.",
    post: new Types.ObjectId(testPostId),
    author: new Types.ObjectId(aluno._id),
  }).save();
  testCommentId = comment.id;
});

afterAll(async () => {
  await mongoose.connection.close();
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
});
