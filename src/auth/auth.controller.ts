import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    return this.authenService.signIn(userCredentialDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
    // user ที่รีเทิร์นมาจาก authStrategy
    return req.user.username;
  }
}
