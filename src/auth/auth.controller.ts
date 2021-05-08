import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentailDto } from './dto/user-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() userCredentailDto: UserCredentailDto) {
    console.log(userCredentailDto);
    this.authenService.signUp(userCredentailDto);
  }

  @Post('/signin')
  signIn(@Body() userCredentailDto: UserCredentailDto) {
    console.log(userCredentailDto);
  }
}
