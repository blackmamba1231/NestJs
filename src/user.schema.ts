// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({required: true})
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({  default: false}) 
  Verified: boolean;

  @Prop({required: true})
  otp: string;
   

  @Prop({required: true, type: Date})
  otpExpiresAt: Date;
 
  @Prop()
  referredby: string;
}
@Schema()
export class Account extends Document {
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  phone: string;
  @Prop()
  comments: string;
  @Prop()
  DateCreated: Date;
  @Prop()
  replies: string;

  @Prop()
  savedpostids: string;

  @Prop()
  country: string;

  @Prop()
  bio: string;

  @Prop()
  profileImage: string; 

  @Prop()
  bloodgroup: string;

  @Prop()
  earned: string;
  
  @Prop()
  pending: string;

  @Prop()
  paid: string;
  
  @Prop()
  referalearning: string;
 

  @Prop()
  rejected: string;

  @Prop()
  cashback: string;
  @Prop()
  referalcode: string;
  @Prop()
  referredby: string;
}
@Schema()
export class orders extends Document {
  @Prop()
  ReferralName: string;

  @Prop()
  Amount: string;

  @Prop()
  type: string;

  @Prop()
  createdat: Date;
}

@Schema()
export class Transactions extends Document {
   @Prop()
   user_id: string;

   @Prop()
   amount: string;

   @Prop()
   type: string;

   @Prop()
   order_id: string;
}
export const AccountSchema = SchemaFactory.createForClass(Account);
export const UserSchema = SchemaFactory.createForClass(User);
export const ordersSchema = SchemaFactory.createForClass(orders);
export const TransactionSchema = SchemaFactory.createForClass(Transactions);