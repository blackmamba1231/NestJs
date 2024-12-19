import { StoreService } from './store.service';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    getAllStores(): Promise<import("./store.schema").Store[]>;
}
