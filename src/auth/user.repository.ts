import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserCredentailDto } from './dto/user-credential.dto';

// 1 repo = 1 table
// config entity แล้ว ต้องมาเรียกใช้ใน repo
// repo เป็นคนคุยกับ db ว่าจะเอาข้อมูลตรงไหนบ้าง แล้วส่งต่อให้ service

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserCredentailDto: UserCredentailDto): Promise<User> {
    const { username, password} = createUserCredentailDto;
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    return user;
  }
}
