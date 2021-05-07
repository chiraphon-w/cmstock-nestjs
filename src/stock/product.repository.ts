import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';

// 1 repo = 1 table
// repo เป็นคนคุยกับ db ว่าจะเอาข้อมูลตรงไหนบ้าง แล้วส่งต่อให้ service

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
