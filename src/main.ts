import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerFn } from './logger.fn.middleware';
//main จะไปเรียก Module หลักมา
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(loggerFn);
  await app.listen(3000);
}
bootstrap();
