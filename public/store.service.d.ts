import { Model } from 'mongoose';
import { Store } from './store.schema';
export declare class StoreService {
    private storeModel;
    constructor(storeModel: Model<Store>);
    getAllStores(): Promise<Store[]>;
}
