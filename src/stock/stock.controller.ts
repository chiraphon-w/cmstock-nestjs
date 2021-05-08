import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock-dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChangeStringCasePipe } from 'src/pipes/change-string-case.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('stock') //path 'stock'
export class StockController {
  constructor(private stockService: StockService) {} //เรียกใช้ StockService

  @Get()
  getStocks() {
    return this.stockService.getProducts();
  }

  // custom pipes ถูกเรียกก่อน
  // @Post()
  // @UsePipes(ValidationPipe) // ใช้เพื่อตรวจสอบว่าข้อมูลที่ส่งมาผ่าน dto ครบถ้วนถูกต้องไหม
  // @UsePipes(new ChangeStringCasePipe())
  // addStock(@Body() createStockDto: CreateStockDto) {
  //   // console.log('frist');
  //   return this.stockService.createProduct(createStockDto);
  // }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ValidationPipe)
  @UsePipes(new ChangeStringCasePipe())
  addStock(@UploadedFile() file, @Body() createStockDto: CreateStockDto) {
    console.log(file);
    return this.stockService.createProduct(createStockDto);
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
