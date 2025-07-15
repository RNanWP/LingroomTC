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
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
const Comment_1 = require("../models/Comment");
jest.setTimeout(30000);
let professor;
let aluno;
let professorToken;
let alunoToken;
let testPostId;
let testCommentId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const testMongoUri = (process.env.MONGO_URI || "").replace("/TechChallengeEducaTC", "/TechChallengeEducaTC_Test_Comments");
    yield mongoose_1.default.connect(testMongoUri);
}));
// Para garantir um estado limpo
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // Limpar coleções
    yield User_1.User.deleteMany({});
    yield Post_1.Post.deleteMany({});
    yield Comment_1.Comment.deleteMany({});
    // Cria e loga aluno
    yield (0, supertest_1.default)(app_1.app).post("/api/users/register").send({
        name: "Aluno Comentarista",
        email: "aluno.comment@teste.com",
        password: "123",
        role: "aluno",
    });
    const alunoLoginRes = yield (0, supertest_1.default)(app_1.app).post("/api/users/login").send({
        email: "aluno.comment@teste.com",
        password: "123",
    });
    alunoToken = alunoLoginRes.body.token;
    aluno = alunoLoginRes.body.user;
    // Cria e loga professor
    yield (0, supertest_1.default)(app_1.app).post("/api/users/register").send({
        name: "Professor Comentarista",
        email: "professor.comment@teste.com",
        password: "123",
        role: "professor",
    });
    const profLoginRes = yield (0, supertest_1.default)(app_1.app).post("/api/users/login").send({
        email: "professor.comment@teste.com",
        password: "123",
    });
    professorToken = profLoginRes.body.token;
    professor = profLoginRes.body.user;
    // Cria post e comentário
    const post = yield new Post_1.Post({
        title: "Post para Comentários",
        content: "Conteúdo",
        author: professor._id,
    }).save();
    testPostId = post.id;
    const comment = yield new Comment_1.Comment({
        content: "Comentário inicial.",
        post: testPostId,
        author: aluno._id,
    }).save();
    testCommentId = comment.id;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("Testes das Rotas de Comentários", () => {
    it("Deve permitir que um aluno crie um comentário", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .post(`/api/posts/${testPostId}/comments`)
            .set("Authorization", `Bearer ${alunoToken}`)
            .send({ content: "Ótimo post!" });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("content", "Ótimo post!");
    }));
    it("Deve listar os comentários de um post", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get(`/api/posts/${testPostId}/comments`);
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(1);
        expect(res.body[0].content).toBe("Comentário inicial.");
    }));
    it("Deve permitir que um professor responda a um comentário", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .post(`/api/comments/${testCommentId}/reply`)
            .set("Authorization", `Bearer ${professorToken}`)
            .send({ content: "Obrigado pelo feedback!" });
        expect(res.status).toBe(201);
        expect(res.body.parentComment).toBe(testCommentId);
    }));
    it("NÃO deve permitir que um aluno responda a um comentário", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .post(`/api/comments/${testCommentId}/reply`)
            .set("Authorization", `Bearer ${alunoToken}`)
            .send({ content: "De nada, professor!" });
        expect(res.status).toBe(403);
    }));
});
// --------------------------------- TESTES --------------------------------
// let professor: IUser;
// let aluno: IUser;
// let professorToken: string;
// let alunoToken: string;
// let testPostId: string;
// let testCommentId: string;
// beforeAll(async () => {
//   const testMongoUri = (process.env.MONGO_URI || "").replace(
//     "/TechChallengeEducaTC",
//     "/TechChallengeEducaTC_Test_Comments"
//   );
//   await mongoose.connect(testMongoUri);
//   beforeEach(async () => {
//     // Limpa dados
//     await User.deleteMany({});
//     await Post.deleteMany({});
//     await Comment.deleteMany({});
//     // Cria e loga aluno
//     const aluno = await new User({
//       name: "Aluno Comentarista",
//       email: "aluno.comment@teste.com",
//       password: "123",
//       role: "aluno",
//     }).save();
//     const alunoLoginRes = await request(app).post("/api/users/login").send({
//       email: "aluno.comment@teste.com",
//       password: "123",
//     });
//     alunoToken = alunoLoginRes.body.token;
//     // Cria e loga professor
//     const professor = await new User({
//       name: "Professor Comentarista",
//       email: "professor.comment@teste.com",
//       password: "123",
//       role: "professor",
//     }).save();
//     const profLoginRes = await request(app).post("/api/users/login").send({
//       email: "professor.comment@teste.com",
//       password: "123",
//     });
//     professorToken = profLoginRes.body.token;
//     // Criar um post de teste
//     const post = await new Post({
//       title: "Post para Comentários",
//       content: "Conteúdo do post...",
//       author: professor.id,
//     }).save();
//     testPostId = post.id;
//     // Criar um comentário de teste
//     const comment = await new Comment({
//       content: "Comentário inicial para testes.",
//       post: testPostId,
//       author: aluno.id,
//     }).save();
//     testCommentId = comment.id;
//   });
// });
// afterAll(async () => {
//   await mongoose.connection.close();
// });
// describe("Testes das Rotas de Comentários", () => {
//   it("Deve permitir que um aluno crie um novo comentário", async () => {
//     const res = await request(app)
//       .post(`/api/posts/${testPostId}/comments`)
//       .set("Authorization", `Bearer ${alunoToken}`)
//       .send({ content: "Ótimo post, muito informativo!" });
//     expect(res.status).toBe(201);
//     expect(res.body).toHaveProperty(
//       "content",
//       "Ótimo post, muito informativo!"
//     );
//   });
//   it("NÃO deve permitir que um usuário não autenticado comente", async () => {
//     const res = await request(app)
//       .post(`/api/posts/${testPostId}/comments`)
//       .send({ content: "Comentário anônimo." });
//     expect(res.status).toBe(401);
//   });
//   it("Deve listar todos os comentários de um post", async () => {
//     const res = await request(app).get(`/api/posts/${testPostId}/comments`);
//     expect(res.status).toBe(200);
//     expect(res.body).toBeInstanceOf(Array);
//     expect(res.body.length).toBeGreaterThan(0);
//   });
//   it("Deve permitir que um professor responda a um comentário", async () => {
//     const res = await request(app)
//       .post(`/api/comments/${testCommentId}/reply`)
//       .set("Authorization", `Bearer ${professorToken}`)
//       .send({ content: "Obrigado pelo feedback!" });
//     expect(res.status).toBe(201);
//     expect(res.body.parentComment).toBe(testCommentId);
//   });
//   it("NÃO deve permitir que um aluno responda a um comentário", async () => {
//     const res = await request(app)
//       .post(`/api/comments/${testCommentId}/reply`)
//       .set("Authorization", `Bearer ${alunoToken}`)
//       .send({ content: "De nada, professor!" });
//     expect(res.status).toBe(403);
//   });
// });
