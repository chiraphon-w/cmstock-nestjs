import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// map ข้อมูลกับตัว DB
// 1 table แทนด้วย 1 repo 1 entity
// entity กำหนดว่าจะมี column อะไรบ้าง
// เป็น schema
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
