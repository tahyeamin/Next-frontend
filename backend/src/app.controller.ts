import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. Registration Route: POST http://localhost:5000/register
  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.appService.registerUser(body);
  }

  // 2. Login Route: POST http://localhost:5000/login
  @Post('login')
  login(@Body() body: CreateUserDto) {
    return this.appService.loginUser(body);
  }
}