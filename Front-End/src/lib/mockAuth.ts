// Mock authentication data and functions
export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "professor" | "administrador";
}

// Mock user data
export const mockUsers: MockUser[] = [
  {
    id: "1",
    name: "María González",
    email: "maria.gonzalez@lingroomtc.edu",
    role: "professor",
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao.silva@lingroomtc.edu",
    role: "student",
  },
  {
    id: "3",
    name: "Ana Rodríguez",
    email: "ana.rodriguez@lingroomtc.edu",
    role: "administrador",
  },
  {
    id: "4",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@lingroomtc.edu",
    role: "student",
  },
  {
    id: "5",
    name: "Sofia Chen",
    email: "sofia.chen@lingroomtc.edu",
    role: "professor",
  },
];

// Mock authentication functions
export const mockLogin = async (
  email: string,
  password: string
): Promise<{ user: MockUser; token: string }> => {
  console.log("🔐 Mock login attempt:", { email, password });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Find user by email
  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    console.log("❌ User not found:", email);
    throw new Error("Usuário não encontrado");
  }

  // For mock purposes, any password works (except empty)
  if (!password || password.trim().length === 0) {
    console.log("❌ Empty password");
    throw new Error("Senha é obrigatória");
  }

  // Generate mock token
  const token = `mock_token_${user.id}_${Date.now()}`;

  console.log("✅ Mock login successful:", {
    user: user.name,
    role: user.role,
  });

  return {
    user,
    token,
  };
};

export const mockRegister = async (
  name: string,
  email: string,
  password: string
): Promise<{ user: MockUser; token: string }> => {
  console.log("📝 Mock register attempt:", { name, email });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if user already exists
  const existingUser = mockUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    console.log("❌ User already exists:", email);
    throw new Error("Usuário já existe com este email");
  }

  // Validate inputs
  if (!name || name.trim().length < 2) {
    throw new Error("Nome deve ter pelo menos 2 caracteres");
  }

  if (!email || !email.includes("@")) {
    throw new Error("Email inválido");
  }

  if (!password || password.length < 6) {
    throw new Error("Senha deve ter pelo menos 6 caracteres");
  }

  // Create new user
  const newUser: MockUser = {
    id: `user_${Date.now()}`,
    name: name.trim(),
    email: email.toLowerCase(),
    role: "student", // Default role for new registrations
  };

  // Add to mock users array (in a real app, this would be saved to database)
  mockUsers.push(newUser);

  // Generate mock token
  const token = `mock_token_${newUser.id}_${Date.now()}`;

  console.log("✅ Mock registration successful:", {
    user: newUser.name,
    role: newUser.role,
  });

  return {
    user: newUser,
    token,
  };
};
