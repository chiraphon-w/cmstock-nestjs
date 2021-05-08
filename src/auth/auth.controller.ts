import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() userCredentialDto: UserCredentialDto) {
    console.log(userCredentialDto);
    return this.authenService.signUp(userCredentialDto);
  }

  @Post('/signin')
  signIn(@Body() userCredentialDto: UserCredentialDto) {
    console.log(userCredentialDto);
  }
}
