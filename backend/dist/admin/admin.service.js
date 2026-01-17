"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const seller_entity_1 = require("../seller/entities/seller.entity");
const mail_service_1 = require("../seller/mail/mail.service");
let AdminService = class AdminService {
    sellerRepo;
    mailService;
    constructor(sellerRepo, mailService) {
        this.sellerRepo = sellerRepo;
        this.mailService = mailService;
    }
    async getPendingSellers() {
        return this.sellerRepo.find({
            where: { status: seller_entity_1.SellerStatus.PENDING },
            select: ['id', 'fullName', 'email', 'phone', 'shopName', 'createdAt'],
            order: { createdAt: 'DESC' },
        });
    }
    async approveSeller(id) {
        const seller = await this.sellerRepo.findOne({ where: { id } });
        if (!seller)
            throw new common_1.NotFoundException('Seller not found');
        seller.status = seller_entity_1.SellerStatus.APPROVED;
        await this.sellerRepo.save(seller);
        console.log('Sending approval email to:', seller.email);
        try {
            await this.mailService.sendApprovalMail(seller.email, seller.fullName, seller.shopName || 'Your Shop');
            console.log('Approval email sent successfully!');
        }
        catch (error) {
            console.error('Email failed:', error.message);
        }
        return { message: 'Seller approved & email sent' };
    }
    async rejectSeller(id, reason) {
        const seller = await this.sellerRepo.findOne({ where: { id } });
        if (!seller)
            throw new common_1.NotFoundException('Seller not found');
        seller.status = seller_entity_1.SellerStatus.REJECTED;
        seller.rejectedReason = reason || 'No reason provided';
        await this.sellerRepo.save(seller);
        console.log('Sending rejection email to:', seller.email);
        try {
            await this.mailService.sendRejectionMail(seller.email, seller.fullName, reason || 'No reason provided');
            console.log('Rejection email sent!');
        }
        catch (error) {
            console.error('Email failed:', error.message);
        }
        return { message: 'Seller rejected & email sent' };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(seller_entity_1.Seller)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService])
], AdminService);
//# sourceMappingURL=admin.service.js.map