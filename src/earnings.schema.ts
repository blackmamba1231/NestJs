import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'earnings' })
export class earnings extends  Document {
   
  @Prop({ required: true, default: 0 })
  revenue: number; // Total platform revenue (if you want to track it in the future)

  @Prop({ required: true })
  earnings: number; // Total earnings of all users combined

  @Prop({ default: Date.now }) // Timestamp of when the earnings data was last updated
  lastUpdated: Date;
};
export const EarningsSchema = SchemaFactory.createForClass(earnings)
