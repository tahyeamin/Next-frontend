import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from '../seller/entities/seller.entity';
import { MailService } from '../seller/mail/mail.service';  
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seller]),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    MailService,  
  ],
  exports: [AdminService],
})
export class AdminModule {}