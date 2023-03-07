  import { type NextApiRequest, type NextApiResponse } from "next";
  import puppeteer from "puppeteer";
  import { load } from 'cheerio';

  const KU_ECLASS_LOGIN_URL =
    "https://cyber.kyungnam.ac.kr/ilos/main/member/login_form.acl";

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    console.log("API requrest detected!");
    
    const { id = process.env.ID, password = process.env.PASSWORD } = req.query as Record<string, string>;
    if(!id || !password) throw new Error("you need id / password to get data!");

    console.log("browser launching...");
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: true,
      defaultViewport: {
        width: 500,
        height: 358,
      },
    });
    console.log("browser launch completed");

    const page = await browser.newPage();
    await page.goto(KU_ECLASS_LOGIN_URL);
    console.log("page change completed: ", page.url());

    await page.focus("#usr_id");
    await page.keyboard.type(id);
    await page.focus("#usr_pwd");
    await page.keyboard.type(password);
    await page.click("#login_btn");
    await page.waitForNavigation({ timeout: 1000000000 });
    console.log("page login completed: ", page.url());

    const content = await page.content();
    const $ = load(content);
    $("*").remove("script").remove("style");
    console.log($("#wrap").toString());

    await browser.close();
    console.log("browser close completed");
  }
