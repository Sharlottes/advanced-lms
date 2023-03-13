import BrowserManager from "@/core/BrowserManager";
import { type CheerioAPI, load as loadCheerio } from "cheerio";

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
    await this.currentPage.waitForNavigation({ timeout: 1000000000 });
    console.log("page login completed: ", this.currentPage.url());

    const content = await this.currentPage.content();
    this.mainPage$ = loadCheerio(content);
    this.mainPage$("script, style").remove();
  }

  public async getMainPage() {
    const wrap = this.mainPage$("#wrap");
    return wrap;
  }

  public async getTodoList() {
    await this.currentPage.click('div[title="Todo List"]');
    await this.reloadCheerio();
    const todo_list = this.mainPage$("#todo_list");
    return todo_list;
  }

  async reloadCheerio() {
    const content = await this.currentPage.content();
    this.mainPage$ = loadCheerio(content);
    this.mainPage$("script, style").remove();
  }
}

export default EClassBrowserManager;
