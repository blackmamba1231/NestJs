import { Body, Controller, Get, Post, } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './create-store.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async getAllStores() {
    return this.storeService.getAllStores();
  }
  @Post('create')
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.createStore(createStoreDto);
  }
 
 
}
