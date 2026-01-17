import { Repository } from 'typeorm';
import { Seller } from '../seller/entities/seller.entity';
import { MailService } from '../seller/mail/mail.service';
export declare class AdminService {
    private sellerRepo;
    private mailService;
    constructor(sellerRepo: Repository<Seller>, mailService: MailService);
    getPendingSellers(): Promise<Seller[]>;
    approveSeller(id: string): Promise<{
        message: string;
    }>;
    rejectSeller(id: string, reason?: string): Promise<{
        message: string;
    }>;
}
