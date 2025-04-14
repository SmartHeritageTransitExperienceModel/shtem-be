import { NestFactory } from '@nestjs/core';
import { ScraperModule } from './scraper.module';
import { ScraperService } from './scraper.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(ScraperModule);

  const scrape = app.get(ScraperService);
  await scrape.scrape();

  await app.close();
}
bootstrap();