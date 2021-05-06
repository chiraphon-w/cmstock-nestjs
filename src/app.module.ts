import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';
//กลุ่มของ function
@Module({
  imports: [StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
