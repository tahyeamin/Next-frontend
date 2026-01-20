import { Repository } from 'typeorm';
import { Seller, SellerStatus } from 'src/seller/entities/seller.entity';
import { SellerRegisterDto } from './dto/seller-register.dto';
import { SellerLoginDto } from './dto/seller-login.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
export declare class SellerAuthService {
    private sellerRepo;
    private jwtService;
    private adminService;
    constructor(sellerRepo: Repository<Seller>, jwtService: JwtService, adminService: AdminService);
    register(dto: SellerRegisterDto): Promise<{
        message: string;
    }>;
    login(dto: SellerLoginDto): Promise<{
        access_token: string;
        seller: {
            id: string;
            name: string;
            email: string;
            status: SellerStatus.APPROVED | SellerStatus.BLOCKED;
        };
    }>;
}
