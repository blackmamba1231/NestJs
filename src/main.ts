import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import * as dotenv from 'dotenv';
import cors from '@fastify/cors';

dotenv.config(); // Load environment variables

async function bootstrap() {
  // Create FastifyAdapter instance
  const fastifyAdapter = new FastifyAdapter();

  // Register CORS middleware
  await fastifyAdapter.register(cors, {
    origin: ['http://localhost:3000',
      'https://smart-prix-xlqf-cis0us965-blackmamba1231s-projects.vercel.app',
      'https://cloneable-prix.vercel.app',
    ], // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  });

  // Create NestJS application with Fastify adapter
  const app = await NestFactory.create(AppModule, fastifyAdapter);

  // Start the server
  await app.listen(5000);
  console.log(`Application is running on: http://localhost:5000`);
}
bootstrap();
