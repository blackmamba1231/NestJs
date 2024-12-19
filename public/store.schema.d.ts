import { Document } from 'mongoose';
export declare class Store extends Document {
    name: string;
    url: string;
    logo: string;
    AffiliateUrl: string;
    description: string;
    AffiliateId: string;
    activated: boolean;
    categories: string[];
    priority: string;
    CashbackRate: string;
    revenue: number;
    storeBannerImage: string;
    SEOTitle: string;
    MetaDescription: string;
    clicks: number;
    conversionRate: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const StoreSchema: import("mongoose").Schema<Store, import("mongoose").Model<Store, any, any, any, Document<unknown, any, Store> & Store & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Store, Document<unknown, {}, import("mongoose").FlatRecord<Store>> & import("mongoose").FlatRecord<Store> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
