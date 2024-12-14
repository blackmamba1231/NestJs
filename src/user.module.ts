// src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { orders, ordersSchema, Transactions, TransactionSchema, User, UserSchema } from './user.schema';
import { Account, AccountSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Account.name, schema: AccountSchema },
      { name: orders.name, schema: ordersSchema },
      { name: Transactions.name, schema: TransactionSchema },
    ]), // Bind the schema
  ],  
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
