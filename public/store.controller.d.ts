import { StoreService } from './store.service';
import { CreateStoreDto } from './create-store.dto';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    getAllStores(): Promise<import("./store.schema").Store[]>;
    createStore(createStoreDto: CreateStoreDto): Promise<import("./store.schema").Store>;
}
