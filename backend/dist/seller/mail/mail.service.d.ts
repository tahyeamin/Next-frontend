import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendApprovalMail(email: string, name: string, shopName: string): Promise<void>;
    sendRejectionMail(email: string, name: string, reason: string): Promise<void>;
}
