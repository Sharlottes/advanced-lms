import { type NextApiRequest, type NextApiResponse } from "next";
import puppeteer from "puppeteer";

const KU_LOGIN_URL =
  "https://cyber.kyungnam.ac.kr/ilos/main/member/login_form.acl";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const res = await axios.get(KU_URL);
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
    defaultViewport: {
      width: 2000,
      height: 1024,
    },
  });
  const page = await browser.newPage();
  await page.goto(KU_LOGIN_URL);
  await page.focus("#usr_id");
  await page.keyboard.type(process.env.ID ?? "");
  await page.focus("#usr_pwd");
  await page.keyboard.type(process.env.PASSWORD ?? "");
  await page.click("#login_btn");
  await page.waitForNavigation();
  console.log(page.url());
  const content = await page.content();
  console.log(content);
}
