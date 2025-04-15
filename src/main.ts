import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getCorsOptions } from './common/config/cors.config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 5000;
  const apiPrefix = configService.get<string>('API_PREFIX') || '';

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors(getCorsOptions(configService));

  await app.listen(port);

  console.log(`Server đang chạy tại http://localhost:${port}`);
}
bootstrap();
