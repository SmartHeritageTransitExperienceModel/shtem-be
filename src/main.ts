import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 5000
  await app.listen(port);

  console.log(`Server đang chạy tại http://localhost:${port}`);
}
bootstrap();
