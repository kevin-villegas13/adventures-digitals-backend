import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);

  logger.log('');
  logger.log(`🚀 App running on port ${process.env.PORT}`);
  logger.log(
    `🌍 API available at ${process.env.HOST_API || 'http://localhost:' + process.env.PORT}`,
  );
}
bootstrap();
