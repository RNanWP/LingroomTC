import { User, IUser } from "../models/User";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

// Registrar usuario
export async function registerUserService(
  userData: Omit<IUser, "comparePassword">
): Promise<IUser> {
  const user = new User(userData);
  return user.save();
}

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
