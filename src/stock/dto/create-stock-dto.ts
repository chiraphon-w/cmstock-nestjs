import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty() //สามารถตั้งกฎขึ้นมาที่ไฟล์ dto ในที่นี้คือ ข้อมูลต้อง Is Not Empty
  @MinLength(10, {
    message: 'name is to short',
  })
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;
}
