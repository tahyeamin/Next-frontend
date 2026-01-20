import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class SellerRegisterDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

 
  @IsOptional() 
  @IsString()
  shopName?: string; 
}