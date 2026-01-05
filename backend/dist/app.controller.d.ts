import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    register(body: CreateUserDto): {
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
        };
    };
    login(body: CreateUserDto): {
        message: string;
        user: any;
    };
}
