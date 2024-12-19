import { Controller, Get, } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async getAllStores() {
    return this.storeService.getAllStores();
  }
 
 
}
