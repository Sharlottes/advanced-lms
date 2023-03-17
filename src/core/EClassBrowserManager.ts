import BrowserManager from "@/core/BrowserManager";
import { type CheerioAPI, load as loadCheerio } from "cheerio";

const queryData: Record<TODOData["todoType"], string> = {
  project: "PROJECT_SEQ",
  report: "RT_SEQ",
  test: "exam_setup_seq",
  survey: "SURVEY_SEQ",
};

const KU_ECLASS_LOGIN_URL =
  "https://cyber.kyungnam.ac.kr/ilos/main/member/login_form.acl";

class EClassBrowserManager extends BrowserManager {
  public mainPage$!: CheerioAPI;

  public constructor(private id: string, private password: string) {
    super();
  }

  public async start() {
    await super.start();
    await this.auth();

    return this;
  }

  async auth() {
    console.log("page changing...");
    await this.currentPage.goto(KU_ECLASS_LOGIN_URL);
    console.log("page change completed: ", this.currentPage.url());

    await this.currentPage.focus("#usr_id");
    await this.currentPage.keyboard.type(this.id);
    await this.currentPage.focus("#usr_pwd");
    await this.currentPage.keyboard.type(this.password);
    await this.currentPage.click("#login_btn");
    await this.currentPage.waitForNavigation();
    console.log("page login completed: ", this.currentPage.url());

    const content = await this.currentPage.content();
    this.mainPage$ = loadCheerio(content);
    this.mainPage$("script, style").remove();
  }

  public async getMainPage() {
    const wrap = this.mainPage$("#wrap");
    return wrap;
  }

  public async getTodoList(): Promise<TODOData[]> {
    await this.currentPage.click('div[title="Todo List"]');
    await this.reloadCheerio();
    const todos = this.mainPage$("#todo_list")
      .children(".todo_wrap[onclick]")
      .toArray();
    const result: TODOData[] = [];
    for (const todo of todos) {
      const [classId, todoId, todoType] = todo.attribs.onclick
        .match(/\((.*)\)/)!
        .at(1)!
        .replaceAll("'", "")
        .split(",") as [string, string, TODOData["todoType"]];

      const $ = loadCheerio(todo);
      const title = $(".todo_title").text();
      const subject = $(".todo_subjt").text();
      const dday = $(".todo_d_day").text();
      const date = $(".todo_date").text();
      const link = `https://cyber.kyungnam.ac.kr/ilos/st/course/${todoType}_view_form.acl?${queryData[todoType]}=${todoId}`;

      result.push({
        classId,
        todoId,
        todoType,
        title,
        subject,
        dday,
        date,
        link,
      });
    }

    console.log("todo list crawling is successfully done!");

    return result;
  }

  public async getTodoDetail(classId: string, link: string): Promise<string[]> {
    console.log("page changing...", link);
    await this.currentPage.goto(link);
    console.log("page change completed: ", this.currentPage.url());
    await this.currentPage.addScriptTag({ content: `roomGo('${classId}');` });
    await this.currentPage.waitForNavigation();

    const table = await this.currentPage
      .$(".bbsview")
      .then((h) => h?.jsonValue());
    if (!table) throw new Error("cannot find content table!");
    const $ = loadCheerio(table.innerHTML);
    return $("tr")
      .map((_, el) => {
        const $$ = loadCheerio(el);
        return `${$$("th").text()}: ${$$("td").text()}`;
      })
      .toArray();
  }

  async reloadCheerio() {
    const content = await this.currentPage.content();
    this.mainPage$ = loadCheerio(content);
    this.mainPage$("script, style").remove();
  }
}

export default EClassBrowserManager;
