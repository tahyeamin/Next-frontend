"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor() {
        this.users = [];
    }
    registerUser(userDto) {
        const existingUser = this.users.find(u => u.email === userDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists!');
        }
        const newUser = {
            id: Date.now(),
            name: userDto.name,
            email: userDto.email,
            password: userDto.password,
        };
        this.users.push(newUser);
        console.log("Current Users DB:", this.users);
        return { message: 'Registration successful!', user: newUser };
    }
    loginUser(userDto) {
        const user = this.users.find(u => u.email === userDto.email && u.password === userDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        return { message: 'Login successful!', user: user };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map