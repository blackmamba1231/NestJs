
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from './user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, MiddlewareConsumer } from '@nestjs/common'
import { AuthMiddleware } from './auth.middleware';


@Module({
  imports: [UserModule,
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_URI),
     ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) 
      .forRoutes('auth/payment'); 
  }
}
