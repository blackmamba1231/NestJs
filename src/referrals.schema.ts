import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
 export class referral extends Document {
  @Prop({ required: true })
  referrer: String;
  @Prop({ required: true })
  earnings: Number;
};

export const ReferralSchema = SchemaFactory.createForClass(referral);
