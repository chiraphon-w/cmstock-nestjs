import { UserCredentialDto } from './dto/user-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  signUp(userCredentialDto: UserCredentialDto) {
    return this.userRepository.createUser(userCredentialDto);
  }
}
