import { UserCredentailDto } from './dto/user-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async signUp(userCredentailDto: UserCredentailDto) {
    const { username, password } = userCredentailDto;

    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
    return user;
  }
}
