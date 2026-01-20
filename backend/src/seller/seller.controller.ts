import { 
  Controller, Get, Patch, Post, Delete, Body, Param, Request, UseGuards, 
  UseInterceptors, UploadedFile, BadRequestException 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SellerJwtGuard } from './guards/seller-jwt.guard';
import { ActiveSellerGuard } from './guards/active-seller.guard';
import { SellerService } from './seller.service';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('seller')
@UseGuards(SellerJwtGuard)
export class SellerController {
  constructor(private sellerService: SellerService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return { message: 'Welcome Seller!', user: req.user };
  }

  
  async getProductById(@Request() req, @Param('id') id: string) {
   
    const products = await this.sellerService.getMyProducts(req.user.sellerId);
    const product = products.find(p => p.id === id); 
    return product || { error: 'Product not found' };
  }

  @Post('products')
  @UseGuards(ActiveSellerGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/products',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `product-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async createProduct(
    @Request() req, 
    @Body() dto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
        if (!file.mimetype.startsWith('image/')) {
            throw new BadRequestException('File must be an image');
        }
        dto.imageUrl = file.filename;
    } else {
        throw new BadRequestException('Image is required');
    }

    if (dto.price && typeof dto.price === 'string') dto.price = parseFloat(dto.price);
    if (dto.stock && typeof dto.stock === 'string') dto.stock = parseInt(dto.stock, 10);

    return this.sellerService.createProduct(req.user.sellerId, dto);
  }

  @Get('products')
  getMyProducts(@Request() req) {
    return this.sellerService.getMyProducts(req.user.sellerId);
  }

  
  @Patch('products/:id')
  @UseGuards(ActiveSellerGuard)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/products',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `product-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  updateProduct(
    @Request() req, 
    @Param('id') id: string, 
    @Body() dto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File 
  ) {
   
    if (file) {
      if (!file.mimetype.startsWith('image/')) {
        throw new BadRequestException('File must be an image');
      }
      dto.imageUrl = file.filename;
    }

    if (dto.price && typeof dto.price === 'string') dto.price = parseFloat(dto.price);
    if (dto.stock && typeof dto.stock === 'string') dto.stock = parseInt(dto.stock, 10);

    return this.sellerService.updateProduct(req.user.sellerId, id, dto);
  }

  @Delete('products/:id')
  @UseGuards(ActiveSellerGuard)
  deleteProduct(@Request() req, @Param('id') id: string) {
    return this.sellerService.deleteProduct(req.user.sellerId, id);
  }

 
  @Get('wallet')
  getWallet(@Request() req) { return this.sellerService.getWallet(req.user.sellerId); }
  
  @Get('pending')
  getPendingSellers() { return this.sellerService.getPendingSellers(); }

  @Patch('approve/:id')
  approveSeller(@Param('id') id: string) { return this.sellerService.approveSeller(id); }

  @Patch('reject/:id')
  rejectSeller(@Param('id') id: string, @Body('reason') r?: string) { return this.sellerService.rejectSeller(id, r || 'No reason'); }
}