import { type NextApiRequest, type NextApiResponse } from "next";
import puppeteer, { HTTPResponse } from "puppeteer";
import fs from 'fs';

const KU_URL = "https://sugang.kyungnam.ac.kr";

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
  });
  console.log("browser launch completed");

  const page = await browser.newPage();
  await page.goto(KU_URL, { timeout: 1000000000 });
  console.log("page change completed: ", page.url());

  await page.focus("#txtUserID");
  await page.keyboard.type(id);
  await page.focus("#txtPassword");
  await page.keyboard.type(password);
  await page.click("#ibtnLogin");
  await page.waitForNavigation({ timeout: 1000000000 });
  console.log("page login completed: ", page.url());

  await page.goto(KU_URL + "/Menu.aspx");
  console.log("page change completed: ", page.url());

  await page.click("table tr:nth-child(3) a");
  const hrefHandle = await page
    .$("a[onclick=\"OnMenu(20)\"]")
    .then(handle => handle?.getProperty("href"))
    .then(prop => prop?.toString().split("JSHandle:")[1]);
  if(!hrefHandle) throw new Error("cannot find href!");

  await page.goto(hrefHandle.toString());
  console.log("page change completed: ", page.url());

  await page.("#ReportViewerControl1_ucReportToolbar1_Menu_ITCNT13_SaveFormat_I", "Image");
  await page.click("#ReportViewerControl1_ucReportToolbar1_Menu_DXI12_Img");
  console.log("pages: ", browser.pages.length);
  const buffer = await new Promise<HTTPResponse>(res => {
    page.on('response', async response => {
    if (response.request().resourceType() !== 'image') return;
      res(response);
    });
  }).then(pageResponse => pageResponse.buffer());
  console.log("completely buffer has gotten: ", buffer);
  await browser.close();
  console.log("browser close completed");

  
  const all = fs.createWriteStream("out.jpg");
  all.write(buffer);
  all.end();
  console.log(all.path);

  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Length', buffer.length);
  res.status(200).send(buffer);
  res.end();
}
