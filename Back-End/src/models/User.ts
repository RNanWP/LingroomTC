import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Interface para documento do usuário
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "aluno" | "professor" | "administrador";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["aluno", "professor", "administrador"],
      default: "aluno",
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

// Método para comparar a senha do login com a do banco
UserSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  if (!this.password) {
    return Promise.resolve(false);
  }
  return bcrypt.compare(password, this.password);
};

export const User = model<IUser>("User", UserSchema);
