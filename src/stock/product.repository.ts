import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock-dto';

// 1 repo = 1 table
// config entity แล้ว ต้องมาเรียกใช้ใน repo
// repo เป็นคนคุยกับ db ว่าจะเอาข้อมูลตรงไหนบ้าง แล้วส่งต่อให้ service

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createStockDto: CreateStockDto) : Promise<Product> {
    const { name, price, stock } = createStockDto;

    const product = new Product();
    product.name = name;
    product.price = price;
    product.stock = stock;
    await product.save(); //บันทึกข้อมูลเข้า DB, Promise จะสั่งงานโดยไม่หยุดรอให้เสร็จก่อน >> ต้อง await
    return product;
  }
}
