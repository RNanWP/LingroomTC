import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app";
import { MONGO_URI } from "../config";

jest.setTimeout(30000);

beforeAll(async () => {
  const testMongoUri = MONGO_URI;

  console.log(
    `INFO: Tentando conectar ao banco de dados de teste: ${testMongoUri}`
  );

  try {
    // Conecta ao banco de teste
    await mongoose.connect(testMongoUri);
    console.log("SUCCESS: Conexão com o banco de dados de teste estabelecida!");
  } catch (error) {
    console.error(
      "ERROR: Falha ao conectar ao banco de dados de teste.",
      error
    );
    throw error;
  }
});

afterEach(async () => {
  // Limpa todas as coleções do banco de dados
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // Fecha a conexão com o banco de dados
  await mongoose.connection.close();
  console.log("INFO: Conexão com o banco de dados de teste fechada.");
});

describe("Testes das Rotas de Posts", () => {
  it("Deve listar todos os posts públicos", async () => {
    const response = await request(app).get("/api/posts");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Não deve permitir que um "aluno" crie um post', async () => {
    // 1. Cria e loga um aluno
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

    // 2. Tenta criar um post com o token do aluno
    const postRes = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${alunoToken}`)
      .send({ title: "Post do Aluno", content: "Conteúdo" });

    // 3. Verifica se o acesso foi proibido
    expect(postRes.status).toBe(403);
  });

  it('Deve permitir que um "professor" crie um post', async () => {
    // 1. Cria e loga um professor
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

    // 2. Cria um post com o token do professor
    const postRes = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${professorToken}`)
      .send({
        title: "Post do Professor",
        content: "Conteúdo",
      });

    // 3. Verifica se o post foi criado com sucesso
    expect(postRes.status).toBe(201);
    expect(postRes.body).toHaveProperty("title", "Post do Professor");
  });
});

it("Deve retornar 404 ao tentar buscar um post com ID inexistente", async () => {
  const response = await request(app).get(
    "/api/posts/60d21b4667d0d8992e610c8b"
  );
  expect(response.status).toBe(404);
});
