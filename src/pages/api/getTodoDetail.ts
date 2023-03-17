import { type NextApiRequest, type NextApiResponse } from "next";
import EClassBrowserManager from "@/core/EClassBrowserManager";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("API requrest detected!");

  const {
    id,
    password,
    todo_id: todoId,
    class_id: classId,
    type,
  } = req.query as Record<string, string>;
  if (!id || !password || !todoId || !classId || !type)
    throw new Error(
      "you need id / password / class_id / todo_id / type to get data!"
    );

  const manager = await new EClassBrowserManager(id, password).start();
  const datas = await manager.getTodoDetail(todoId, classId, type);
  console.log(datas);
  res.send(JSON.stringify({ content: datas }));
  manager.close();
}
