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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./user.dto");
const node_console_1 = require("node:console");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async signup(createUserDto) {
        return this.userService.signup(createUserDto);
    }
    async verifyOTP(otpData) {
        return this.userService.verifyOTP(otpData.email, otpData.otp);
    }
    async signin(credentials) {
        return this.userService.signin(credentials.email, credentials.password);
    }
    async user(credentials) {
        return this.userService.user(credentials.email);
    }
    async invite(credentials) {
        return this.userService.invite(credentials.email, credentials.referalcode);
    }
    async placeOrder(credentials) {
        return this.userService.placeOrder(credentials.AccountId, credentials.amount, credentials.ReferralName, credentials.type);
    }
    async payment(token) {
        const bearerToken = token?.replace('Bearer ', '');
        if (!bearerToken) {
            throw new node_console_1.error('Token is missing');
        }
        return this.userService.payment(bearerToken);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyOTP", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "user", null);
__decorate([
    (0, common_1.Post)('invite'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "invite", null);
__decorate([
    (0, common_1.Post)('placeorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "placeOrder", null);
__decorate([
    (0, common_1.Get)('payment'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "payment", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map