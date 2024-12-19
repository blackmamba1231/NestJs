import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './store.schema';

@Injectable()
export class StoreService {
  constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}

  // Fetch all stores
  async getAllStores(): Promise<Store[]> {
    return this.storeModel.find().exec();
  }

}
