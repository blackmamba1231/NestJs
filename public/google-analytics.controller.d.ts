import { GoogleAnalyticsService } from './google-analytics.service';
export declare class GoogleAnalyticsController {
    private readonly googleAnalyticsService;
    constructor(googleAnalyticsService: GoogleAnalyticsService);
    fetchUserAnalytics(startDate: string, endDate: string): Promise<{
        date: Date;
        clicks: number;
        views: number;
        signups: number;
    }[] | {
        success: boolean;
        message: string;
        error: any;
    }>;
    updateUserEarnings(): Promise<void | {
        success: boolean;
        message: string;
        error: any;
    }>;
    fetchEarnings(): Promise<(import("mongoose").Document<unknown, {}, import("./earnings.schema").earnings> & import("./earnings.schema").earnings & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[] | {
        success: boolean;
        message: string;
        error: any;
    }>;
    fetchReferrals(): Promise<{
        referrer: any;
        earnings: number;
    }[] | {
        success: boolean;
        message: string;
        error: any;
    }>;
}
