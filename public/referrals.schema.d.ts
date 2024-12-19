import { Document } from 'mongoose';
export declare class referral extends Document {
    referrer: String;
    earnings: Number;
}
export declare const ReferralSchema: import("mongoose").Schema<referral, import("mongoose").Model<referral, any, any, any, Document<unknown, any, referral> & referral & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, referral, Document<unknown, {}, import("mongoose").FlatRecord<referral>> & import("mongoose").FlatRecord<referral> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
