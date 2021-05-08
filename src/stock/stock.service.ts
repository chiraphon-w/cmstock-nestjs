import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock-dto';

@Injectable()
export class StockService {
  // เรียกใช้ ProductRepository
  // private เป็นการประกาศตัวแปรขึ้นมา
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}
  // productRepository = [{name:xx, price:xx, stock:xx}, {....}]
  async createProduct(createStockDto: CreateStockDto) {
    // console.log('second');
    const data = await this.productRepository.createProduct(createStockDto); // รับค่าจาก createProduct ใน productRepository มาใส่ createStockDto // data = product
    return data;
  }

  getProducts() {
    return this.productRepository.find(); //find จะ return เป็น Array // ต้องประกาศ constructor(@InjectRepository) ก่อน
  }

}
