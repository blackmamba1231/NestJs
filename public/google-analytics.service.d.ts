import { Model } from 'mongoose';
import { userAnalytics } from './user-analytics.schema';
import { earnings } from './earnings.schema';
import { referral } from './referrals.schema';
import { Account } from './user.schema';
export declare class GoogleAnalyticsService {
    private userAnalyticsModel;
    private accountModel;
    private earningsModel;
    private referralModel;
    constructor(userAnalyticsModel: Model<userAnalytics>, accountModel: Model<Account>, earningsModel: Model<earnings>, referralModel: Model<referral>);
    private authenticate;
    fetchUserAnalytics(startDate: string, endDate: string): Promise<{
        date: Date;
        clicks: number;
        views: number;
        signups: number;
    }[]>;
    private getSignupsCount;
    fetchEarnings(): Promise<(import("mongoose").Document<unknown, {}, earnings> & earnings & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    updateUserEarnings(): Promise<void>;
    fetchReferrals(): Promise<{
        referrer: any;
        earnings: number;
    }[]>;
}
