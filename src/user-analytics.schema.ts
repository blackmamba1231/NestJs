import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class userAnalytics extends Document{
  @Prop({ required: true })
  date: Date ;
  @Prop({ required: true })
  clicks: Number;
  @Prop({ required: true })
  views: Number;
  @Prop({ required: true })
  signups: Number;
};

export const UserAnalyticsSchema =  SchemaFactory.createForClass(userAnalytics);
