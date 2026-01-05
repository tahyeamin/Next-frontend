import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
 
  private users = [];


  registerUser(userDto: CreateUserDto) {
    
    const existingUser = this.users.find(u => u.email === userDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists!');
    }

  
    const newUser = {
      id: Date.now(), 
      name: userDto.name,
      email: userDto.email,
      password: userDto.password, 
    };
    
    this.users.push(newUser);
    console.log("Current Users DB:", this.users);
    return { message: 'Registration successful!', user: newUser };
  }

  
  loginUser(userDto: CreateUserDto) {
  
    const user = this.users.find(u => u.email === userDto.email && u.password === userDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { message: 'Login successful!', user: user };
  }
}