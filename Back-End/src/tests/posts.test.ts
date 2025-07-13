import request from "supertest";
import mongoose from "mongoose";
import { app } from "..";
import { MONGO_URI } from "../config";

// Conectar ao banco de dados antes de todos os testes
beforeAll(async () => {
  await mongoose.disconnect();

  //URI de teste
  const testMongoUri = MONGO_URI.replace(
    "/TechChallengeEducaTC",
    "/TechChallengeEducaTC_Test"
  );
  await mongoose.connect(testMongoUri);
});

// Limpa os dados
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

// Desconecta do banco
afterAll(async () => {
  await mongoose.connection.close();
});

// -------------------------------Teste rotas publicas------------------------------------
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
      .send({ title: "Post do Aluno", content: "Conteúdo", author: "Aluno" });

    // 3. Verifica se o acesso foi proibido
    expect(postRes.status).toBe(403);
  });

  // -------------------------------Teste rotas privadas------------------------------------
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

    // 2. Tenta criar um post com o token do professor
    const postRes = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${professorToken}`)
      .send({
        title: "Post do Professor",
        content: "Conteúdo",
        author: "Professor",
      });

    // 3. Verifica se o post foi criado com sucesso
    expect(postRes.status).toBe(201);
    expect(postRes.body).toHaveProperty("title", "Post do Professor");
  });
});
