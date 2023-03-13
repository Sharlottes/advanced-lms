import BrowserManager from "@/core/BrowserManager";
import { load as loadCheerio } from "cheerio";

const KU_ECLASS_LOGIN_URL =
  "https://cyber.kyungnam.ac.kr/ilos/main/member/login_form.acl";

class EClassBrowserManager extends BrowserManager {
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
    await this.currentPage.waitForNavigation({ timeout: 1000000000 });
    console.log("page login completed: ", this.currentPage.url());
  }

  public async getMainPage() {
    const content = await this.currentPage.content();
    const $ = loadCheerio(content);
    $("script, style").remove();
    const wrap = $("#wrap");
    return wrap;
  }

  public async getTodoList() {
    await this.currentPage.click('div[title="Todo List"]');
    const content = await this.currentPage.content();
    const $ = loadCheerio(content);
    $("script, style").remove();
    const wrap = $("#todo_list");
    return wrap;
  }
}

export default EClassBrowserManager;
