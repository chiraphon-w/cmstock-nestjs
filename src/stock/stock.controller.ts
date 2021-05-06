import { Controller, Get } from '@nestjs/common';

@Controller('stock') //path 'stock'
export class StockController {
  @Get()
  getStocks() {
    return [1, 2, 3];
  }
}
