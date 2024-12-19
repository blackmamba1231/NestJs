import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Store extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({required: true})
  url: string;
  @Prop({})
  logo: string;
  @Prop({})
  AffiliateUrl: string;
  @Prop({})
  description: string;
  @Prop({})
  AffiliateId: string;
  @Prop({default: true})
  activated: boolean;
  @Prop({})
  categories: string[];
  @Prop({})
  priority: string;
  @Prop({})
  CashbackRate: string;
  @Prop({ required: true })
  revenue: number;
  @Prop({})
  storeBannerImage: string;
  @Prop({})
  SEOTitle: string;
  @Prop({})
  MetaDescription: string;
  @Prop({ required: true })
  clicks: number;

  @Prop({ required: true })
  conversionRate: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
