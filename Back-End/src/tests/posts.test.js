"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
const config_1 = require("../config");
// Aumenta o timeout do Jest para 30 segundos, por segurança
jest.setTimeout(30000);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Gera a URI de teste
    const testMongoUri = config_1.MONGO_URI.replace("/TechChallengeEducaTC", "/TechChallengeEducaTC_Test");
    console.log(`INFO: Tentando conectar ao banco de dados de teste: ${testMongoUri}`);
    try {
        // Conecta ao banco de teste
        yield mongoose_1.default.connect(testMongoUri);
        console.log("SUCCESS: Conexão com o banco de dados de teste estabelecida!");
    }
    catch (error) {
        console.error("ERROR: Falha ao conectar ao banco de dados de teste.", error);
        // Lança o erro para que o Jest pare a execução se a conexão falhar
        throw error;
    }
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // Limpa todas as coleções do banco de dados a cada teste
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        yield collection.deleteMany({});
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Fecha a conexão com o banco de dados a todos os testes
    yield mongoose_1.default.connection.close();
    console.log("INFO: Conexão com o banco de dados de teste fechada.");
}));
describe("Testes das Rotas de Posts", () => {
    it("Deve listar todos os posts públicos", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get("/api/posts");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
    it('Não deve permitir que um "aluno" crie um post', () => __awaiter(void 0, void 0, void 0, function* () {
        // 1. Cria e loga um aluno
        yield (0, supertest_1.default)(app_1.app).post("/api/users/register").send({
            name: "Aluno Teste",
            email: "aluno@teste.com",
            password: "123",
        });
        const loginRes = yield (0, supertest_1.default)(app_1.app).post("/api/users/login").send({
            email: "aluno@teste.com",
            password: "123",
        });
        const alunoToken = loginRes.body.token;
        // 2. Tenta criar um post com o token do aluno
        const postRes = yield (0, supertest_1.default)(app_1.app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${alunoToken}`)
            .send({ title: "Post do Aluno", content: "Conteúdo", author: "Aluno" });
        // 3. Verifica se o acesso foi proibido (o correto aqui seria 403 Forbidden)
        expect(postRes.status).toBe(403);
    }));
    it('Deve permitir que um "professor" crie um post', () => __awaiter(void 0, void 0, void 0, function* () {
        // 1. Cria e loga um professor
        yield (0, supertest_1.default)(app_1.app).post("/api/users/register").send({
            name: "Professor Teste",
            email: "professor@teste.com",
            password: "123",
            role: "professor",
        });
        const loginRes = yield (0, supertest_1.default)(app_1.app).post("/api/users/login").send({
            email: "professor@teste.com",
            password: "123",
        });
        const professorToken = loginRes.body.token;
        // 2. Cria um post com o token do professor
        const postRes = yield (0, supertest_1.default)(app_1.app)
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
    }));
});
it("Deve retornar 404 ao tentar buscar um post com ID inexistente", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.app).get("/api/posts/60d21b4667d0d8992e610c8b");
    expect(response.status).toBe(404);
}));
