import { type NextApiRequest, type NextApiResponse } from "next";
import EClassBrowserManager from "@/core/EClassBrowserManager";
import { load as loadCheerio } from "cheerio";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("API requrest detected!");

  const { id = process.env.ID, password = process.env.PASSWORD } =
    req.query as Record<string, string>;
  if (!id || !password) throw new Error("you need id / password to get data!");

  const manager = await new EClassBrowserManager(id, password).start();
  const wrap = await manager.getTodoList();
  const datas = wrap
    .children(".todo_wrap[onclick]")
    .map((i, todo) => {
      const [classId, todoId, todoType] = todo.attribs.onclick
        .match(/\((.*)\)/)!
        .at(1)!
        .replaceAll("'", "")
        .split(",");

      console.log("classId: ", classId);
      console.log("todoId: ", todoId);
      console.log("todoType: ", todoType);

      const $ = loadCheerio(todo);
      const title = $(".todo_title").text();
      const subject = $(".todo_subjt").text();
      const dday = $(".todo_d_day").text();
      const date = $(".todo_date").text();
      console.log("title content: ", title);
      console.log("subject content: ", subject);

      return {
        classId,
        todoId,
        todoType,
        title,
        subject,
        dday,
        date,
      } as TODOData;
    })
    .toArray();
  res.send(JSON.stringify({ content: datas }));
  manager.close();
}
