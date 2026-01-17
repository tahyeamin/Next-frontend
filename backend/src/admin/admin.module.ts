import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from '../seller/entities/seller.entity';
import { MailService } from '../seller/mail/mail.service';   // ← এই লাইনটা যোগ করো
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
})
export class AdminModule {}