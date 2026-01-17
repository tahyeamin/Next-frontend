import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getPending(): Promise<import("../seller/entities/seller.entity").Seller[]>;
    approve(id: string): Promise<{
        message: string;
    }>;
    reject(id: string): Promise<{
        message: string;
    }>;
}
