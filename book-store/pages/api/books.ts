// api/books.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Проверяем, что запрос является GET-запросом
  if (req.method !== "GET") {
    res
      .status(405)
      .send({ error: true, message: "Only GET requests are allowed" });
    return;
  }

  // Получаем параметры из запроса
  const { subject, page } = req.query;

  // Проверяем наличие обязательного параметра subject
  if (!subject) {
    res.status(400).send({
      error: true,
      message: "Missing required parameter: subject",
    });
    return;
  }

  try {
    // Строим параметры запроса к Google Books API
    const gbooksReqParams = new URLSearchParams();
    gbooksReqParams.set("q", `subject:${subject}`);
    gbooksReqParams.set("startIndex", String((parseInt(page) - 1) * 10)); // Пагинация: каждая страница содержит 10 результатов
    gbooksReqParams.set("maxResults", "10"); // Ограничиваем количество результатов на странице

    // Выполняем запрос к Google Books API
    const gbooksRes = await fetch(
      `https://www.googleapis.com/books/v1/volumes?${gbooksReqParams.toString()}`,
    );
    const booksData = await gbooksRes.json();

    // Возвращаем данные в ответе
    res.status(200).send({
      data: booksData,
    });
  } catch (error) {
    console.error("Error fetching books from Google Books API:", error);
    res.status(500).send({
      error: true,
      message: "Internal Server Error",
    });
  }
}
