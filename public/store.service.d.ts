import { Model } from 'mongoose';
import { Store } from './store.schema';
import { CreateStoreDto } from './create-store.dto';
export declare class StoreService {
    private storeModel;
    constructor(storeModel: Model<Store>);
    getAllStores(): Promise<Store[]>;
    createStore(createStoreDto: CreateStoreDto): Promise<Store>;
}
