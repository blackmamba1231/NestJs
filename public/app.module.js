"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user.module");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const google_analytics_controller_1 = require("./google-analytics.controller");
const google_analytics_service_1 = require("./google-analytics.service");
const user_analytics_schema_1 = require("./user-analytics.schema");
const earnings_schema_1 = require("./earnings.schema");
const referrals_schema_1 = require("./referrals.schema");
const user_schema_1 = require("./user.schema");
const store_controller_1 = require("./store.controller");
const store_service_1 = require("./store.service");
const store_schema_1 = require("./store.schema");
const cloudinary_module_1 = require("./cloudinary.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_analytics_schema_1.userAnalytics.name, schema: user_analytics_schema_1.UserAnalyticsSchema
                }, { name: user_schema_1.Account.name, schema: user_schema_1.AccountSchema },
                { name: earnings_schema_1.earnings.name, schema: earnings_schema_1.EarningsSchema },
                { name: referrals_schema_1.referral.name, schema: referrals_schema_1.ReferralSchema },
                { name: store_schema_1.Store.name, schema: store_schema_1.StoreSchema }
            ]),
            cloudinary_module_1.CloudinaryModule,
            user_module_1.UserModule,
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
        ],
        controllers: [app_controller_1.AppController,
            google_analytics_controller_1.GoogleAnalyticsController,
            store_controller_1.StoreController,
        ],
        providers: [app_service_1.AppService,
            google_analytics_service_1.GoogleAnalyticsService,
            store_service_1.StoreService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map