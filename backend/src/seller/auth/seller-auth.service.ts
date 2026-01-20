import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller, SellerStatus } from 'src/seller/entities/seller.entity'; 
import { SellerRegisterDto } from './dto/seller-register.dto';
import { SellerLoginDto } from './dto/seller-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service'; 
@Injectable()
export class SellerAuthService {
  constructor(
    @InjectRepository(Seller)
    private sellerRepo: Repository<Seller>,
    private jwtService: JwtService,
    private adminService: AdminService, 
  ) {}

  async register(dto: SellerRegisterDto) {
    const { fullName, email, password, phone, shopName } = dto;

    
    const existingSeller = await this.sellerRepo.findOne({ where: { email } });
    if (existingSeller) {
      throw new ConflictException('Email already exists');
    }


    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

 
    const newSeller = this.sellerRepo.create({
      fullName,
      email,
      phone,
      shopName,
      password: hashedPassword,
      status: SellerStatus.PENDING, 
    });

    const savedSeller = await this.sellerRepo.save(newSeller);

    
    if (savedSeller) {
      await this.adminService.triggerNewSellerNotification(savedSeller.fullName);
    }

    return { message: 'Registration successful! Please wait for admin approval.' };
  }

  async login(dto: SellerLoginDto) {
    const seller = await this.sellerRepo.findOne({ 
      where: { email: dto.email },
      select: ['id', 'email', 'password', 'fullName', 'status'] 
    });

    if (!seller) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (seller.status === SellerStatus.PENDING) {
      throw new UnauthorizedException('Account is under review. Please wait for Admin approval.');
    }

    if (seller.status === SellerStatus.REJECTED) {
      throw new UnauthorizedException('Your account has been rejected by Admin.');
    }

    const isMatch = await bcrypt.compare(dto.password, seller.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: seller.id, email: seller.email, role: 'seller' };
    
    return {
      access_token: this.jwtService.sign(payload),
      seller: {
        id: seller.id,
        name: seller.fullName,
        email: seller.email,
        status: seller.status,
      },
    };
  }
}