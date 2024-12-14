"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const dotenv = require("dotenv");
const cors_1 = require("@fastify/cors");
dotenv.config();
async function bootstrap() {
    const fastifyAdapter = new platform_fastify_1.FastifyAdapter();
    await fastifyAdapter.register(cors_1.default, {
        origin: ['http://localhost:3000',
            'https://smart-prix-xlqf-cis0us965-blackmamba1231s-projects.vercel.app',
            'https://smart-prix-xlqf.vercel.app'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, fastifyAdapter);
    await app.listen(5000);
    console.log(`Application is running on: http://localhost:5000`);
}
bootstrap();
//# sourceMappingURL=main.js.map