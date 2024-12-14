import { Model } from 'mongoose';
import { orders, Transactions, User } from './user.schema';
import { Account } from './user.schema';
import { CreateUserDto } from './user.dto';
export declare class UserService {
    private userModel;
    private accountModel;
    private orderModel;
    private transactionModel;
    constructor(userModel: Model<User>, accountModel: Model<Account>, orderModel: Model<orders>, transactionModel: Model<Transactions>);
    signup(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    private sendCodeEmail;
    private sendConfirmationEmail;
    user(email: string): Promise<import("mongoose").Document<unknown, {}, Account> & Account & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    verifyOTP(email: string, otp: string): Promise<{
        useremail: string;
        token: any;
        AccountId: unknown;
        success: boolean;
    }>;
    generateReferralCode(length?: number): string;
    signin(email: string, password: string): Promise<{
        useremail: string;
        token: any;
        AccountId: unknown;
        success: boolean;
    }>;
    invite(email: string, referalcode: string): Promise<{
        success: boolean;
    }>;
    placeOrder(AccountId: string, amount: any, ReferralName: string, type: string): Promise<import("mongoose").Document<unknown, {}, orders> & orders & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    payment(bearerToken: string): Promise<(import("mongoose").Document<unknown, {}, Transactions> & Transactions & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
