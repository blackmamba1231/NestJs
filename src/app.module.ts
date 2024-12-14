
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from './user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, MiddlewareConsumer } from '@nestjs/common'
import { AuthMiddleware } from './auth.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Path to your public directory
    }),
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
