import request from "supertest";
import { app } from "../app";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { Types } from "mongoose";
import * as postService from "../services/postServices";

// jest.setTimeout(30000);

// beforeAll(async () => {
//   const testMongoUri = MONGO_URI;

//   console.log(
//     `INFO: Tentando conectar ao banco de dados de teste: ${testMongoUri}`
//   );

//   try {
//     // Conecta ao banco de teste
//     await mongoose.connect(testMongoUri);
//     console.log("SUCCESS: Conexão com o banco de dados de teste estabelecida!");
//   } catch (error) {
//     console.error(
//       "ERROR: Falha ao conectar ao banco de dados de teste.",
//       error
//     );
//     throw error;
//   }
// });

// afterEach(async () => {
//   // Limpa todas as coleções do banco de dados
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     const collection = collections[key];
//     await collection.deleteMany({});
//   }
// });

// afterAll(async () => {
//   // Fecha a conexão com o banco de dados
//   await mongoose.connection.close();
//   console.log("INFO: Conexão com o banco de dados de teste fechada.");
// });

interface TestUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

let professor: TestUser;
let admin: TestUser;
let professorToken: string;
let adminToken: string;

beforeEach(async () => {
  // Cria e loga um professor
  const profRegRes = await request(app).post("/api/users/register").send({
    name: "Professor Teste Posts",
    email: "professor.posts@teste.com",
    password: "123",
    role: "professor",
  });
  professor = profRegRes.body.user;
  const profLoginRes = await request(app).post("/api/users/login").send({
    email: "professor.posts@teste.com",
    password: "123",
  });
  professorToken = profLoginRes.body.token;

  // Cria e loga um ADM
  const adminRegRes = await request(app).post("/api/users/register").send({
    name: "Admin Teste Posts",
    email: "admin.posts@teste.com",
    password: "123",
    role: "administrador",
  });
  admin = adminRegRes.body.user;
  const adminLoginRes = await request(app).post("/api/users/login").send({
    email: "admin.posts@teste.com",
    password: "123",
  });
  adminToken = adminLoginRes.body.token;
});

describe("Testes das Rotas de Posts", () => {
  it("Deve listar todos os posts públicos", async () => {
    const response = await request(app).get("/api/posts");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Não deve permitir que um "aluno" crie um post', async () => {
    // Cria e loga um aluno
    await request(app).post("/api/users/register").send({
      name: "Aluno Teste",
      email: "aluno@teste.com",
      password: "123",
    });
    const loginRes = await request(app).post("/api/users/login").send({
      email: "aluno@teste.com",
      password: "123",
    });
    const alunoToken = loginRes.body.token;

    // Tenta criar um post com o token do aluno
    const postRes = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${alunoToken}`)
      .send({ title: "Post do Aluno", content: "Conteúdo" });

    // Verifica se o acesso foi proibido
    expect(postRes.status).toBe(403);
  });

  it('Deve permitir que um "professor" crie um post', async () => {
    // Cria e loga um professor
    await request(app).post("/api/users/register").send({
      name: "Professor Teste",
      email: "professor@teste.com",
      password: "123",
      role: "professor",
    });
    const loginRes = await request(app).post("/api/users/login").send({
      email: "professor@teste.com",
      password: "123",
    });
    const professorToken = loginRes.body.token;

    // Cria um post com o token do professor
    const postRes = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${professorToken}`)
      .send({
        title: "Post do Professor",
        content: "Conteúdo",
      });

    // Verifica se o post foi criado com sucesso
    expect(postRes.status).toBe(201);
    expect(postRes.body).toHaveProperty("title", "Post do Professor");
  });

  it("Deve retornar 404 ao tentar buscar um post com ID inexistente", async () => {
    const response = await request(app).get(
      "/api/posts/60d21b4667d0d8992e610c8b"
    );
    expect(response.status).toBe(404);
  });

  // Testando as rotas Put, Del, Search do professor e ADM

  it("Deve permitir que um administrador atualize um post", async () => {
    const post = await new Post({
      title: "Post Original",
      content: "Conteúdo",
      author: new Types.ObjectId(professor._id),
    }).save();
    const updatedRes = await request(app)
      .put(`/api/posts/${post.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ title: "Post Atualizado" });
    expect(updatedRes.status).toBe(200);
    expect(updatedRes.body.title).toBe("Post Atualizado");
  });

  it("Deve permitir que um professor delete um post", async () => {
    const post = await new Post({
      title: "Post a Deletar",
      content: "Conteúdo",
      author: new Types.ObjectId(professor._id),
    }).save();
    const deleteRes = await request(app)
      .delete(`/api/posts/${post.id}`)
      .set("Authorization", `Bearer ${professorToken}`);
    expect(deleteRes.status).toBe(204);
  });

  it("Deve encontrar posts através da busca", async () => {
    await new Post({
      title: "Aprendendo Node.js",
      content: "Conteúdo sobre Node",
      author: new Types.ObjectId(professor._id),
    }).save();
    const searchRes = await request(app).get("/api/posts/search?q=Node.js");
    expect(searchRes.status).toBe(200);
    expect(searchRes.body.length).toBe(1);
    expect(searchRes.body[0].title).toBe("Aprendendo Node.js");
  });

  it("Deve permitir que um administrador veja a lista de posts de admin", async () => {
    await new Post({
      title: "Post Secreto",
      content: "Conteúdo",
      author: new Types.ObjectId(admin._id),
    }).save();
    const adminRes = await request(app)
      .get("/api/admin/posts")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(adminRes.status).toBe(200);
    expect(adminRes.body.length).toBeGreaterThan(0);
  });
});

// Testes de Falhas Post
describe("Testes de Falha do Post Controller", () => {
  it("Deve retornar status 500 se o serviço falhar ao criar um post", async () => {
    const createPostSpy = jest
      .spyOn(postService, "createPostService")
      .mockRejectedValue(new Error("Erro de banco de dados simulado"));

    // tenta criar o post
    const postRes = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${professorToken}`)
      .send({ title: "Post que vai falhar", content: "Conteúdo" });

    expect(postRes.status).toBe(500);
    expect(postRes.body).toHaveProperty("message", "Erro ao criar post");

    createPostSpy.mockRestore();
  });
});
