import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { StockController } from './stock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])], //เป็นการ import table
  controllers: [StockController],
})
export class StockModule {}
