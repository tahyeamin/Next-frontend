import { CreateUserDto } from './dto/create-user.dto';
export declare class AppService {
    private users;
    registerUser(userDto: CreateUserDto): {
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
        };
    };
    loginUser(userDto: CreateUserDto): {
        message: string;
        user: any;
    };
}
