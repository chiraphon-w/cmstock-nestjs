import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserCredentialDto } from './dto/user-credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// 1 repo = 1 table
// config entity แล้ว ต้องมาเรียกใช้ใน repo
// repo เป็นคนคุยกับ db ว่าจะเอาข้อมูลตรงไหนบ้าง แล้วส่งต่อให้ service

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCredentialDto: UserCredentialDto) {
    const { username, password } = userCredentialDto;
    const salt = bcrypt.genSaltSync();

    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        console.log(error.code);
        throw new ConflictException(
          'Error, because this username already exist!',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async verifyUserPassword(userCredentialDto: UserCredentialDto) {
    const { username, password } = userCredentialDto;
    const user = await this.findOne({ username }); //ต้องการหา column username ที่เท่ากับ username ที่รับเข้ามา
    if (user && await user.verifyPassword(password)) {
      return user.username;
    } else {
      return null;
    }
  }

  async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
