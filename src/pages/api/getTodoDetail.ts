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
    class_id: classId,
    link,
  } = req.query as Record<string, string>;
  if (!id || !password || !classId || !link)
    throw new Error("you need id / password / class_id / link to get data!");

  const manager = await new EClassBrowserManager(id, password).start();
  const datas = await manager.getTodoDetail(classId, link);
  console.log(datas);
  res.send(JSON.stringify({ content: datas }));
  manager.close();
}
