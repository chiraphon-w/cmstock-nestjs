import { Product } from './product.entity';
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
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChangeStringCasePipe } from 'src/pipes/change-string-case.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fsExtra from 'fs-extra';
import { extname } from 'path';
import { LoggerInterceptor } from 'src/logger.interceptor';
import { MyGuard } from 'src/my.guard';

@Controller('stock') //path 'stock'
@UseInterceptors(LoggerInterceptor)
@UseGuards(MyGuard)
export class StockController {
  constructor(private stockService: StockService) {} //เรียกใช้ StockService

  @Get()
  getStocks(@Query('keyword') keyword: string, @Req() req) {
    // console.log('Added by Middleware : ', req.timestamp);
    return this.stockService.getProducts(keyword);
  }

  // custom pipes ถูกเรียกก่อน
  // @Post()
  // @UsePipes(ValidationPipe) // ใช้เพื่อตรวจสอบว่าข้อมูลที่ส่งมาผ่าน dto ครบถ้วนถูกต้องไหม
  // @UsePipes(new ChangeStringCasePipe())
  // addStock(@Body() createStockDto: CreateStockDto) {
  //   // console.log('frist');
  //   return this.stockService.createProduct(createStockDto);
  // }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  //@UseInterceptors(FileInterceptor('file'))
  @UsePipes(ValidationPipe)
  @UsePipes(new ChangeStringCasePipe())
  async addStock(@UploadedFile() file, @Body() createStockDto: CreateStockDto) {
    const product = await this.stockService.createProduct(createStockDto);

    const imageFile = product.id + extname(file.filename);
    fsExtra.move(file.path, `upload/${imageFile}`);
    product.image = imageFile;
    await product.save();
    return product;
  }

  @Get('/:id') //ยิง id เข้ามา
  getStockById(@Param('id') id: number) {
    //Param คือการ map id
    return this.stockService.getProductById(id);
  }

  @Delete('/:id')
  deleteStockById(@Param('id') id: number) {
    return this.stockService.deleteProduct(id);
  }

  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateStockById(
    @UploadedFile() file,
    @Param('id') id: number,
    @Body() createStockDto: CreateStockDto,
  ) {
    const product = await this.stockService.updateProduct(id, createStockDto);
    if (file) {
      fsExtra.remove(`upload/${product.image}`);
      const imageFile = id + extname(file.filename);
      fsExtra.move(file.path, `upload/${imageFile}`);
      product.image = imageFile;
      await product.save();
    }
    return product;
  }

  // put ยิงข้อมูลทั้งหมด
  // patch ยิงเฉพาะส่วนที่ต้องการ
  // @Put('/:id')
  // updateStockById(
  //   @Param('id') id: number, //param or body ก็ได้ แต่จะเรียกผ่าน Body ได้ก็ต่อเมื่อมีการประกาศตัวแปรหรือ field ใน Dto เท่านั้น
  //   @Body() createStockDto: CreateStockDto,
  // ) {
  //   return this.stockService.updateProduct(id, createStockDto);
  // }
}
