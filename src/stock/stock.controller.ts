import { CreateStockDto } from './dto/create-stock-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChangeStringCasePipe } from 'src/pipes/change-string-case.pipe';

@Controller('stock') //path 'stock'
export class StockController {
  @Get()
  getStocks() {
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    return [1, 2, 3];
  }

  //   @Post()
  //   addStock(@Body('name') name: string, @Body('price') price: number) {
  //     console.log(`name: ${name}, price: ${price}`);
  //   }

  // custom pipes ถูกเรียกก่อน
  @Post()
  @UsePipes(ValidationPipe) // ใช้เพื่อตรวจสอบว่าข้อมูลที่ส่งมาผ่าน dto ครบถ้วนถูกต้องไหม
  @UsePipes(new ChangeStringCasePipe)
  addStock(@Body() createStockDto: CreateStockDto) {
    const { name, price, stock } = createStockDto;
    console.log(`name: ${name}, price: ${price}, stock: ${stock}`);
  }

  @Get('/:id') //ยิง id เข้ามา
  getStockById(@Param('id') id: number) {
    //Param คือการ map id
    return `Get id is ${id}`;
  }

  @Delete('/:id') //ยิง id เข้ามา
  deleteStockById(@Param('id') id: number) {
    //Param คือการ map id
    return `Delete id is ${id}`;
  }

  //put ยิงข้อมูลทั้งหมด
  //patch ยิงเฉพาะส่วนที่ต้องการ
  @Put('/:id')
  UpdateStockById(
    @Param('id') id: number, //param or body ก็ได้ แต่จะเรียกผ่าน Body ได้ก็ต่อเมื่อมีการประกาศตัวแปรหรือ field ใน Dto เท่านั้น
    @Body() createStockDto: CreateStockDto,
  ) {
    const { name, price, stock } = createStockDto;
    console.log(`name: ${name}, price: ${price}, stock: ${stock}`);

    return `Update id is ${id}, ${name}, ${price}, ${stock}`;
  }
}
