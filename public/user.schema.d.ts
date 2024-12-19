import { Document } from 'mongoose';
export declare class User extends Document {
    name: string;
    phone: string;
    email: string;
    password: string;
    Verified: boolean;
    otp: string;
    otpExpiresAt: Date;
    referredby: string;
}
export declare class Account extends Document {
    email: string;
    password: string;
    name: string;
    phone: string;
    comments: string;
    DateCreated: Date;
    replies: string;
    savedpostids: string;
    country: string;
    bio: string;
    profileImage: string;
    bloodgroup: string;
    earned: string;
    pending: string;
    paid: string;
    referalearning: string;
    rejected: string;
    cashback: string;
    referalcode: string;
    referredby: string;
}
export declare class orders extends Document {
    ReferralName: string;
    Amount: string;
    type: string;
    createdat: Date;
}
export declare class Transactions extends Document {
    user_id: string;
    amount: string;
    type: string;
    order_id: string;
}
export declare const AccountSchema: import("mongoose").Schema<Account, import("mongoose").Model<Account, any, any, any, Document<unknown, any, Account> & Account & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Account, Document<unknown, {}, import("mongoose").FlatRecord<Account>> & import("mongoose").FlatRecord<Account> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const ordersSchema: import("mongoose").Schema<orders, import("mongoose").Model<orders, any, any, any, Document<unknown, any, orders> & orders & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, orders, Document<unknown, {}, import("mongoose").FlatRecord<orders>> & import("mongoose").FlatRecord<orders> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const TransactionSchema: import("mongoose").Schema<Transactions, import("mongoose").Model<Transactions, any, any, any, Document<unknown, any, Transactions> & Transactions & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transactions, Document<unknown, {}, import("mongoose").FlatRecord<Transactions>> & import("mongoose").FlatRecord<Transactions> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
