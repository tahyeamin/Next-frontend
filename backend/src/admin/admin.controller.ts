import { Controller, Get, Patch, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('pending')
  getPending() {
    return this.adminService.getPendingSellers();
  }

  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    return this.adminService.approveSeller(id);
  }

  @Patch('reject/:id')
  reject(@Param('id') id: string) {
    return this.adminService.rejectSeller(id);
  }
}