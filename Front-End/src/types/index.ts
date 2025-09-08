export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "aluno" | "professor" | "administrador";
}

export interface IPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
