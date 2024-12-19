import { Document } from 'mongoose';
export declare class earnings extends Document {
    revenue: number;
    earnings: number;
    lastUpdated: Date;
}
export declare const EarningsSchema: import("mongoose").Schema<earnings, import("mongoose").Model<earnings, any, any, any, Document<unknown, any, earnings> & earnings & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, earnings, Document<unknown, {}, import("mongoose").FlatRecord<earnings>> & import("mongoose").FlatRecord<earnings> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
