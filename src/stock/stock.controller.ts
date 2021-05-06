import { CreateStockDto } from './dto/create-stock-dto';
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';

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
  @UsePipes(ValidationPipe) // ใช้เพื่อตรวจสอบว่าข้อมูลที่ส่งมาผ่าน dto ครบถ้วนไหม
  addStock(@Body() createStockDto: CreateStockDto) {
    const { name, price, stock } = createStockDto;
    
    console.log(`name: ${name}, price: ${price}, stock: ${stock}`);
  }
}
