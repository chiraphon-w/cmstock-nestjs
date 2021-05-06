import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//main จะไปเรียก Module หลักมา
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
