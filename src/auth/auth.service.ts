import { UserCredentialDto } from './dto/user-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  signUp(userCredentialDto: UserCredentialDto) {
    return this.userRepository.createUser(userCredentialDto);
  }

  // check user
  async signIn(userCredentialDto: UserCredentialDto) {
    const username = await this.userRepository.verifyUserPassword(
      userCredentialDto,
    );
    if (!username) {
      console.log("test")
      throw new UnauthorizedException('Invalid username or password');
    }
    //payload
    const payload = { username };
    const token = await this.jwtService.sign(payload);
    return { token };

    // return this.userRepository.verifyUserPassword(userCredentialDto);
  }
}
