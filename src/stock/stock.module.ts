import { AuthModule } from './../auth/auth.module';
import { StockService } from './stock.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { StockController } from './stock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), AuthModule], //เป็นการ import table
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
