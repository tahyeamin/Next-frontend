import { IsString, IsNumber, IsOptional, Min, IsUrl } from 'class-validator';
import { Type } from 'class-transformer'; 

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Number) 
  @IsNumber()
  @Min(1)
  price: number;

  @Type(() => Number) 
  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsOptional()
  // @IsUrl()
  imageUrl?: string;
}