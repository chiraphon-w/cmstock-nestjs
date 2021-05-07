import { Product } from './product.entity';
import { EntityRepository, Repository } from 'typeorm';

// 1 repo = 1 table
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
