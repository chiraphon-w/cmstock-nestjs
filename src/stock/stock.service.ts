import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock-dto';

@Injectable()
export class StockService {
  //InjectRepository ดึง entity มาให้ productRepository ใช้
  //Inject เป็นการ inject class มาใข้ใน controller
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}
  createProduct(createStockDto: CreateStockDto) {
    return this.productRepository.createProduct(createStockDto); 
  }

  getProducts() {
    return this.productRepository.find(); //find จะ return เป็น Array // ต้องประกาศ constructor(@InjectRepository) ก่อน
  }
}
