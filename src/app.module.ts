import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';
import { loggerFn } from './logger.fn.middleware';

//กลุ่มของ function
@Module({
  imports: [StockModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('stock'); //ต้องเอาให้ apply ลงไปไหน path ไหนบ้าง

    consumer.apply(LoggerMiddleware, loggerFn).forRoutes('stock'); //ต้องเอาให้ apply ลงไปไหน path ไหนบ้าง
  }
}
