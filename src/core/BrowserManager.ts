import puppeteer from "puppeteer";
import type { Browser, Page } from "puppeteer";

class BrowserManager {
  protected browser!: Browser;
  protected currentPage!: Page;

  public async start() {
    await this.launch();

    return this;
  }

  public async close() {
    await this.browser.close();
    console.log("browser close completed");
  }

  async launch() {
    console.log("browser launching...");
    this.browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: true,
      defaultViewport: {
        width: 500,
        height: 358,
      },
    });
    console.log("browser launch completed");
    console.log("page creating...");
    this.currentPage = await this.browser.newPage();
    this.currentPage.setDefaultTimeout(1000 * 60);
    console.log("page create completed");
  }
}

export default BrowserManager;
