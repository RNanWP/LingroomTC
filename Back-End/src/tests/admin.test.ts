import request from "supertest";
import { app } from "../app";
import { User } from "../models/User";

interface TestUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

let admin: TestUser;
let alunoParaDeletar: TestUser;
let adminToken: string;

beforeEach(async () => {
  await User.deleteMany({});

  const adminRegRes = await request(app).post("/api/users/register").send({
    name: "Admin Master",
    email: "admin.master@teste.com",
    password: "123",
    role: "administrador",
  });
  admin = adminRegRes.body.user;
  const adminLoginRes = await request(app).post("/api/users/login").send({
    email: "admin.master@teste.com",
    password: "123",
  });
  adminToken = adminLoginRes.body.token;

  const alunoRegRes = await request(app).post("/api/users/register").send({
    name: "Aluno a ser Deletado",
    email: "aluno.delete@teste.com",
    password: "123",
  });
  alunoParaDeletar = alunoRegRes.body.user;
});

describe("Testes das Rotas de Administrador", () => {
  it("Deve permitir que um administrador delete um usuário", async () => {
    const res = await request(app)
      .delete(`/api/admin/users/${alunoParaDeletar._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(204);
    const userInDb = await User.findById(alunoParaDeletar._id);
    expect(userInDb).toBeNull();
  });

  it("NÃO deve permitir que um usuário comum delete outro usuário", async () => {
    const res = await request(app).delete(
      `/api/admin/users/${alunoParaDeletar._id}`
    );

    expect(res.status).toBe(401);
  });
});
