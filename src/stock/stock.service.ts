import { ProductRepository } from './product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock-dto';
import * as fsExtra from 'fs-extra';

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
    return await this.productRepository.createProduct(createStockDto); // รับค่าจาก createProduct ใน productRepository มาใส่ createStockDto // data = product
  }

  getProducts(keyword: string) {
    if (keyword) {
      const query = this.productRepository.createQueryBuilder('product');
      query.andWhere('product.name LIKE :keyword', { keyword: `%${keyword}%` }); //filter เอาคำตาม keyword
      return query.getMany();
    } else {
      return this.productRepository.find(); //find จะ return เป็น Array // ต้องประกาศ constructor(@InjectRepository) ก่อน
    }
  }

  async getProductById(id: number) {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Product ${id} is not found!!!`);
    }
    return found;
  }

  async deleteProduct(id: number) {
    const found = await this.getProductById(id);
    const { image } = found;
    await fsExtra.remove(`upload/${image}`); //เอาไว้ลบรูป
    return await this.productRepository.delete(id);
  }

  async updateProduct(id: number, createStockDto: CreateStockDto) {
    const product = await this.getProductById(id);
    const { name, price, stock } = createStockDto;
    product.name = name;
    product.price = price;
    product.stock = stock;
    await product.save();
    return product;
  }
}
