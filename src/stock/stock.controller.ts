import { CreateStockDto } from './dto/create-stock-dto';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('stock') //path 'stock'
export class StockController {
  @Get()
  getStocks() {
    return [1, 2, 3];
  }

  //   @Post()
  //   addStock(@Body('name') name: string, @Body('price') price: number) {
  //     console.log(`name: ${name}, price: ${price}`);
  //   }

  @Post()
  addStock(@Body() createStockDto: CreateStockDto) {
    const { name, price, stock } = createStockDto;
    
    console.log(`name: ${name}, price: ${price}, stock: ${stock}`);
  }
}
