import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  async scrape(): Promise<void> {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized'],
    });
    const page = await browser.newPage();
    const url =
      'https://vi.wikipedia.org/wiki/B%C3%A3i_bi%E1%BB%83n_M%E1%BB%B9_Kh%C3%AA';
    await page.goto(url, { waitUntil: 'networkidle2' });
    const location = await page.$eval('.geo-default .geo-dec', (el) => {
      return el.textContent?.trim();
    });
    console.log(location);

    await browser.close();
  }
}
