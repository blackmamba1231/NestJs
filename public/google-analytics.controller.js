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
exports.GoogleAnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const google_analytics_service_1 = require("./google-analytics.service");
let GoogleAnalyticsController = class GoogleAnalyticsController {
    constructor(googleAnalyticsService) {
        this.googleAnalyticsService = googleAnalyticsService;
    }
    async fetchUserAnalytics(startDate, endDate) {
        try {
            return this.googleAnalyticsService.fetchUserAnalytics(startDate, endDate);
        }
        catch (error) {
            return {
                success: false,
                message: 'Error fetching user analytics data',
                error: error.message,
            };
        }
    }
    async updateUserEarnings() {
        try {
            return this.googleAnalyticsService.updateUserEarnings();
        }
        catch (error) {
            return {
                success: false,
                message: 'Error fetching earnings data',
                error: error.message,
            };
        }
    }
    async fetchEarnings() {
        try {
            return this.googleAnalyticsService.fetchEarnings();
        }
        catch (error) {
            return {
                success: false,
                message: 'Error fetching earnings data',
                error: error.message,
            };
        }
    }
    async fetchReferrals() {
        try {
            return this.googleAnalyticsService.fetchReferrals();
        }
        catch (error) {
            return {
                success: false,
                message: 'Error fetching referral data',
                error: error.message,
            };
        }
    }
};
exports.GoogleAnalyticsController = GoogleAnalyticsController;
__decorate([
    (0, common_1.Get)('user-analytics'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GoogleAnalyticsController.prototype, "fetchUserAnalytics", null);
__decorate([
    (0, common_1.Get)('update-earnings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleAnalyticsController.prototype, "updateUserEarnings", null);
__decorate([
    (0, common_1.Get)('earnings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleAnalyticsController.prototype, "fetchEarnings", null);
__decorate([
    (0, common_1.Get)('referrals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleAnalyticsController.prototype, "fetchReferrals", null);
exports.GoogleAnalyticsController = GoogleAnalyticsController = __decorate([
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [google_analytics_service_1.GoogleAnalyticsService])
], GoogleAnalyticsController);
//# sourceMappingURL=google-analytics.controller.js.map