import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res
      .status(405)
      .send({ error: true, message: "Only POST requests are allowed" });
    return;
  }

  const { email, password } = req.body;

  // Валидация электронной почты и пароля
  if (!isValidEmail(email) || !isValidPassword(password)) {
    res
      .status(400)
      .send({ error: true, message: "Invalid email or password format" });
    return;
  }

  // Фейковая логика авторизации (вы можете заменить ее на реальную логику)
  const user = authenticateUser(email, password);

  if (user) {
    const token = generateToken();
    res.status(200).send({ success: true, token });
  } else {
    res.status(401).send({ error: true, message: "Authentication failed" });
  }
}

// Валидация электронной почты
function isValidEmail(email: string): boolean {
  // Ваша логика валидации электронной почты
  return /\S+@\S+\.\S+/.test(email);
}

// Валидация пароля
function isValidPassword(password: string): boolean {
  // Ваша логика валидации пароля (например, минимальная длина)
  return password.length >= 6 && password.length <= 9;
}

// Фейковая логика авторизации
function authenticateUser(email: string, password: string): boolean {
  // Здесь может быть ваша реальная логика проверки пользователя в базе данных и т. д.
  // В этом примере просто фейково возвращаем true
  return true;
}

// Генерация фейкового токена
function generateToken(): string {
  // Здесь может быть ваша реальная логика генерации токена (например, библиотека jsonwebtoken)
  // В этом примере генерируем просто фейковый токен
  return "fakeToken123";
}
