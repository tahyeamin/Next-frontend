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
exports.SellerController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const seller_jwt_guard_1 = require("./guards/seller-jwt.guard");
const active_seller_guard_1 = require("./guards/active-seller.guard");
const seller_service_1 = require("./seller.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
let SellerController = class SellerController {
    sellerService;
    constructor(sellerService) {
        this.sellerService = sellerService;
    }
    getProfile(req) {
        return { message: 'Welcome Seller!', user: req.user };
    }
    async getProductById(req, id) {
        const products = await this.sellerService.getMyProducts(req.user.sellerId);
        const product = products.find(p => p.id === id);
        return product || { error: 'Product not found' };
    }
    async createProduct(req, dto, file) {
        if (file) {
            if (!file.mimetype.startsWith('image/')) {
                throw new common_1.BadRequestException('File must be an image');
            }
            dto.imageUrl = file.filename;
        }
        else {
            throw new common_1.BadRequestException('Image is required');
        }
        if (dto.price && typeof dto.price === 'string')
            dto.price = parseFloat(dto.price);
        if (dto.stock && typeof dto.stock === 'string')
            dto.stock = parseInt(dto.stock, 10);
        return this.sellerService.createProduct(req.user.sellerId, dto);
    }
    getMyProducts(req) {
        return this.sellerService.getMyProducts(req.user.sellerId);
    }
    updateProduct(req, id, dto, file) {
        if (file) {
            if (!file.mimetype.startsWith('image/')) {
                throw new common_1.BadRequestException('File must be an image');
            }
            dto.imageUrl = file.filename;
        }
        if (dto.price && typeof dto.price === 'string')
            dto.price = parseFloat(dto.price);
        if (dto.stock && typeof dto.stock === 'string')
            dto.stock = parseInt(dto.stock, 10);
        return this.sellerService.updateProduct(req.user.sellerId, id, dto);
    }
    deleteProduct(req, id) {
        return this.sellerService.deleteProduct(req.user.sellerId, id);
    }
    getWallet(req) { return this.sellerService.getWallet(req.user.sellerId); }
    getPendingSellers() { return this.sellerService.getPendingSellers(); }
    approveSeller(id) { return this.sellerService.approveSeller(id); }
    rejectSeller(id, r) { return this.sellerService.rejectSeller(id, r || 'No reason'); }
};
exports.SellerController = SellerController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "getProfile", null);
__decorate([
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Post)('products'),
    (0, common_1.UseGuards)(active_seller_guard_1.ActiveSellerGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/products',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `product-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], SellerController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "getMyProducts", null);
__decorate([
    (0, common_1.Patch)('products/:id'),
    (0, common_1.UseGuards)(active_seller_guard_1.ActiveSellerGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/products',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `product-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('products/:id'),
    (0, common_1.UseGuards)(active_seller_guard_1.ActiveSellerGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)('wallet'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Get)('pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "getPendingSellers", null);
__decorate([
    (0, common_1.Patch)('approve/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "approveSeller", null);
__decorate([
    (0, common_1.Patch)('reject/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SellerController.prototype, "rejectSeller", null);
exports.SellerController = SellerController = __decorate([
    (0, common_1.Controller)('seller'),
    (0, common_1.UseGuards)(seller_jwt_guard_1.SellerJwtGuard),
    __metadata("design:paramtypes", [seller_service_1.SellerService])
], SellerController);
//# sourceMappingURL=seller.controller.js.map