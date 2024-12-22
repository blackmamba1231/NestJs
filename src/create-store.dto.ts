import { IsString, IsNotEmpty, IsBoolean, IsArray, IsNumber, IsEmail, IsOptional } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  logo: string;

  @IsString()
  @IsOptional()
  AffiliateUrl: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  AffiliateId: string;

  @IsBoolean()
  activated: boolean;

  @IsArray()
  @IsOptional()
  categories: string[];

  @IsNumber()
  @IsOptional()
  priority: number;

  @IsString()
  @IsOptional()
  CashbackRate: string;

  @IsNumber()
  @IsOptional()
  revenue: number;

  @IsString()
  @IsNotEmpty()
  ApiKey: string;

  @IsString()
  @IsNotEmpty()
  StoreContactPersonName: string;

  @IsEmail()
  @IsNotEmpty()
  StorePersonEmail: string;

  @IsString()
  @IsNotEmpty()
  StorePersonPhone: string;

  @IsString()
  @IsOptional()
  storeBannerImage: string;

  @IsString()
  @IsOptional()
  SEOTitle: string;

  @IsString()
  @IsOptional()
  MetaDescription: string;

  @IsNumber()
  @IsNotEmpty()
  clicks: number;

  @IsString()
  @IsNotEmpty()
  AffiliateNetwork: string;

  @IsNumber()
  @IsNotEmpty()
  conversionRate: number;
}
