import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentailDto } from './dto/user-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}

  @Post('/signup')
  signUp(@Body() userCredentailDto: UserCredentailDto) {
    console.log(userCredentailDto);
  }

  @Post('/signin')
  signIn(@Body() userCredentailDto: UserCredentailDto) {
    console.log(userCredentailDto);
  }
}
