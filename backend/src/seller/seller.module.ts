import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';   
import { Seller } from './entities/seller.entity';
import { Product } from './entities/product.entity';
import { Wallet } from './entities/wallet.entity';
import { SellerAuthModule } from './auth/seller-auth.module';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { SellerJwtGuard } from './guards/seller-jwt.guard';
import { ActiveSellerGuard } from './guards/active-seller.guard';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
   
    TypeOrmModule.forFeature([Seller, Product, Wallet]),

    ConfigModule,

    
    SellerAuthModule,
  ],

  controllers: [SellerController],

  providers: [
    SellerService,
    SellerJwtGuard,
    ActiveSellerGuard,
    MailService,   
  ],
})
export class SellerModule {}