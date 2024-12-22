
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from './user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, MiddlewareConsumer } from '@nestjs/common'
import { AuthMiddleware } from './auth.middleware';
import { GoogleAnalyticsController  } from './google-analytics.controller';
import { GoogleAnalyticsService } from './google-analytics.service';
import { userAnalytics, UserAnalyticsSchema } from './user-analytics.schema';
import { earnings, EarningsSchema } from './earnings.schema';
import { referral, ReferralSchema } from './referrals.schema';
import { Account, AccountSchema } from './user.schema';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { Store, StoreSchema } from './store.schema';
import { CloudinaryModule } from './cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: userAnalytics.name, schema: UserAnalyticsSchema
       },{ name: Account.name, schema: AccountSchema},
      { name: earnings.name, schema: EarningsSchema },
      { name: referral.name, schema: ReferralSchema },
      { name: Store.name , schema: StoreSchema}
    ]),
    CloudinaryModule,
    UserModule,
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI),
     ],
  controllers: [AppController,
    GoogleAnalyticsController,
    StoreController,
  ],
  providers: [AppService,
    GoogleAnalyticsService,
    StoreService,
  ],
})
export class AppModule {
  
}
