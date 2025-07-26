import { User, IUser } from "../models/User";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

// Método usado para colcoar na role a criação do usuario para fazer testes com insominia
interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

interface CreateUserPayload {
  name: IUser["name"];
  email: IUser["email"];
  password: IUser["password"];
  role?: IUser["role"];
}

export async function registerUserService(
  userData: CreateUserPayload
): Promise<IUser> {
  const user = new User(userData);
  return user.save();
}

// ---------------------------------------

// Registrar usuario
// export async function registerUserService(
//   userData: Omit<IUser, "comparePassword">
// ): Promise<IUser> {
//   const user = new User(userData);
//   return user.save();
// }

// Autenticando usuario
export async function loginUserService(
  email: string,
  password: string
): Promise<{ user: IUser; token: string } | null> {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return null;
  }

  const payload = { id: user._id, email: user.email, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  return { user, token };
}

// Admin Delete
export async function deleteUserService(id: string): Promise<IUser | null> {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return null;
  }
  return user;
}
