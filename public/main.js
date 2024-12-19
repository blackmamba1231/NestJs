"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const fastifyAdapter = new platform_fastify_1.FastifyAdapter();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, fastifyAdapter);
    app.enableCors();
    await app.listen(5000);
    console.log(`Application is running on: http://localhost:5000`);
}
bootstrap();
//# sourceMappingURL=main.js.map