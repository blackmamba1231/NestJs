import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signup(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").User> & import("./user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    verifyOTP(otpData: {
        email: string;
        otp: string;
    }): Promise<{
        useremail: string;
        token: any;
        AccountId: unknown;
        success: boolean;
    }>;
    signin(credentials: {
        email: string;
        password: string;
    }): Promise<{
        useremail: string;
        token: any;
        AccountId: unknown;
        success: boolean;
    }>;
    user(credentials: {
        email: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").Account> & import("./user.schema").Account & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    invite(credentials: {
        email: string;
        referalcode: string;
    }): Promise<{
        success: boolean;
    }>;
    placeOrder(credentials: {
        AccountId: string;
        amount: any;
        ReferralName: string;
        type: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./user.schema").orders> & import("./user.schema").orders & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    payment(token: string): Promise<(import("mongoose").Document<unknown, {}, import("./user.schema").Transactions> & import("./user.schema").Transactions & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
