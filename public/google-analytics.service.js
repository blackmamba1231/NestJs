"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const googleapis_1 = require("googleapis");
const user_analytics_schema_1 = require("./user-analytics.schema");
const earnings_schema_1 = require("./earnings.schema");
const referrals_schema_1 = require("./referrals.schema");
const dotenv = require("dotenv");
const user_schema_1 = require("./user.schema");
dotenv.config();
let GoogleAnalyticsService = class GoogleAnalyticsService {
    constructor(userAnalyticsModel, accountModel, earningsModel, referralModel) {
        this.userAnalyticsModel = userAnalyticsModel;
        this.accountModel = accountModel;
        this.earningsModel = earningsModel;
        this.referralModel = referralModel;
    }
    async authenticate() {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: process.env.GA_SERVICE_ACCOUNT_KEY_PATH,
            scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
        });
        return auth.getClient();
    }
    async fetchUserAnalytics(startDate, endDate) {
        const client = await this.authenticate();
        const a = process.env.GA4_PROPERTY_ID;
        if (!a) {
            throw new Error('Missing GA4_PROPERTY_ID');
        }
        try {
            const analytics = googleapis_1.google.analyticsdata('v1beta');
            const response = await analytics.properties.runReport({
                property: `properties/${a}`,
                auth: client,
                requestBody: {
                    dateRanges: [{ startDate, endDate }],
                    metrics: [{ name: 'sessions' }, { name: 'screenPageViews' }],
                    dimensions: [{ name: 'date' }],
                }
            });
            const parseDate = (dateString) => {
                const year = parseInt(dateString.substring(0, 4), 10);
                const month = parseInt(dateString.substring(4, 6), 10) - 1;
                const day = parseInt(dateString.substring(6, 8), 10);
                return new Date(year, month, day);
            };
            const signupsCount = await this.getSignupsCount(startDate, endDate);
            const userAnalyticsData = response.data.rows.map((row) => {
                const dateStr = row.dimensionValues[0]?.value;
                const parsedDate = dateStr ? parseDate(dateStr) : null;
                const signups = signupsCount || 0;
                return {
                    date: parsedDate,
                    clicks: parseInt(row.metricValues[0]?.value) || 0,
                    views: parseInt(row.metricValues[1]?.value) || 0,
                    signups: signups,
                };
            });
            console.table(userAnalyticsData);
            await this.userAnalyticsModel.insertMany(userAnalyticsData);
            return userAnalyticsData;
        }
        catch (error) {
            console.error('Error fetching user analytics:', error);
            throw error;
        }
    }
    async getSignupsCount(startDate, endDate) {
        const count = await this.accountModel.countDocuments({
            DateCreated: {
                $gte: startDate,
                $lte: endDate,
            },
        });
        console.log("Signups count: ", count);
        return count;
    }
    async fetchEarnings() {
        const earningsData = await this.earningsModel.find().exec();
        if (!earningsData || earningsData.length === 0) {
            throw new Error('No earnings data found');
        }
        console.log(earningsData);
        return earningsData;
    }
    async updateUserEarnings() {
        const users = await this.accountModel.find().exec();
        if (!users || users.length === 0) {
            throw new Error('No users found');
        }
        let totalEarnings = 0;
        for (const user of users) {
            totalEarnings += parseFloat(user.earned || '0') +
                parseFloat(user.referalearning || '0') +
                parseFloat(user.cashback || '0');
        }
        console.log("Total Earnings of All Users:", totalEarnings);
        const existingEarnings = await this.earningsModel.findOne().exec();
        if (existingEarnings) {
            existingEarnings.earnings = totalEarnings;
            await existingEarnings.save();
        }
        else {
            const earningsData = new this.earningsModel({
                revenue: 0,
                earnings: totalEarnings,
            });
            await earningsData.save();
        }
    }
    async fetchReferrals() {
        try {
            const limit = 5;
            const referrers = await this.accountModel.aggregate([
                { $match: { referalcode: { $exists: true, $ne: null } } },
                {
                    $lookup: {
                        from: 'accounts',
                        localField: 'referalcode',
                        foreignField: 'referredby',
                        as: 'referredUsers',
                    },
                },
                {
                    $project: {
                        email: 1,
                        name: 1,
                        referalearning: 1,
                        referredUsers: { $size: '$referredUsers' },
                    },
                },
                {
                    $sort: { referalearning: -1 },
                },
                { $limit: limit },
            ]);
            const referralData = referrers.map(referrer => ({
                referrer: referrer.name,
                earnings: parseFloat(referrer.referalearning || '0') * referrer.referredUsers,
            }));
            console.log(referralData);
            await this.referralModel.insertMany(referralData);
            return referralData;
        }
        catch (error) {
            console.error('Error fetching referral data:', error);
            throw error;
        }
    }
};
exports.GoogleAnalyticsService = GoogleAnalyticsService;
exports.GoogleAnalyticsService = GoogleAnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_analytics_schema_1.userAnalytics.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.Account.name)),
    __param(2, (0, mongoose_1.InjectModel)(earnings_schema_1.earnings.name)),
    __param(3, (0, mongoose_1.InjectModel)(referrals_schema_1.referral.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], GoogleAnalyticsService);
//# sourceMappingURL=google-analytics.service.js.map