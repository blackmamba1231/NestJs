import { Document } from 'mongoose';
export declare class userAnalytics extends Document {
    date: Date;
    clicks: Number;
    views: Number;
    signups: Number;
}
export declare const UserAnalyticsSchema: import("mongoose").Schema<userAnalytics, import("mongoose").Model<userAnalytics, any, any, any, Document<unknown, any, userAnalytics> & userAnalytics & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, userAnalytics, Document<unknown, {}, import("mongoose").FlatRecord<userAnalytics>> & import("mongoose").FlatRecord<userAnalytics> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
