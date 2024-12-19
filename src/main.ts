import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

async function bootstrap() {
  // Create FastifyAdapter instance
  const fastifyAdapter = new FastifyAdapter();

 

  // Create NestJS application with Fastify adapter
  const app = await NestFactory.create(AppModule, fastifyAdapter);
  app.enableCors();
  // Start the server
  await app.listen(5000);
  console.log(`Application is running on: http://localhost:5000`);
}
bootstrap();
