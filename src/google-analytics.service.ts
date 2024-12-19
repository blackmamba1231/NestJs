import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { google } from 'googleapis';
import { userAnalytics } from './user-analytics.schema';
import { earnings } from './earnings.schema';
import { referral } from './referrals.schema';
import * as dotenv from 'dotenv';
import { Account } from './user.schema';

dotenv.config(); // Load environment variables

@Injectable()
export class GoogleAnalyticsService {
  constructor(
    @InjectModel(userAnalytics.name) private userAnalyticsModel: Model<userAnalytics>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(earnings.name) private earningsModel: Model<earnings>,
    @InjectModel(referral.name) private referralModel: Model<referral>
  ) {}

  private async authenticate() {
    const auth: any = new google.auth.GoogleAuth({
      keyFile: process.env.GA_SERVICE_ACCOUNT_KEY_PATH, // use env variable
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    return auth.getClient();
  }

  // Fetch user analytics data
  async fetchUserAnalytics(startDate: string, endDate: string) {
    const client = await this.authenticate();
    const a = process.env.GA4_PROPERTY_ID;
    if (!a) {
        throw new Error('Missing GA4_PROPERTY_ID');
      }
    try {
      const analytics = google.analyticsdata('v1beta');
      const response = await analytics.properties.runReport({
        property: `properties/${a}`,
        auth: client,
        requestBody: {
          dateRanges: [{ startDate, endDate }],
          metrics: [{ name: 'sessions' }, { name: 'screenPageViews' }],
          dimensions: [{ name: 'date' }],
        }
      });
      const parseDate = (dateString: string): Date => {
        const year = parseInt(dateString.substring(0, 4), 10);
        const month = parseInt(dateString.substring(4, 6), 10) - 1; // JavaScript months are 0-based
        const day = parseInt(dateString.substring(6, 8), 10);
        return new Date(year, month, day);
      };
      
      
      const signupsCount = await this.getSignupsCount(startDate, endDate);
      const userAnalyticsData = response.data.rows.map((row) => {
        const dateStr = row.dimensionValues[0]?.value; // Get the date string
        const parsedDate = dateStr ? parseDate(dateStr) : null; // Convert to Date object if valid
        
        const signups = signupsCount || 0;
      
        return {
          date: parsedDate,  // Valid Date object
          clicks: parseInt(row.metricValues[0]?.value) || 0, // Ensure valid number
          views: parseInt(row.metricValues[1]?.value) || 0, // Ensure valid number
          signups: signups,  
        };
      });
       console.table(userAnalyticsData);
      await this.userAnalyticsModel.insertMany(userAnalyticsData);
      return userAnalyticsData;
    } catch (error) {
      console.error('Error fetching user analytics:', error);
      throw error;
    }
  }
  private async getSignupsCount(startDate: string, endDate: string) {
    
  
  
  
    // Count documents in the Account collection within the date range
    const count = await this.accountModel.countDocuments({
      DateCreated: {
        $gte: startDate, // Greater than or equal to start date
        $lte: endDate,   // Less than or equal to end date
      },
    });
  
    console.log("Signups count: ", count);
    return count;
  }
  
  // Fetch earnings data (static or dynamic)
  async fetchEarnings() {
   
    const earningsData = await this.earningsModel.find().exec();
    if (!earningsData || earningsData.length === 0) {
      throw new Error('No earnings data found');
    }
    console.log(earningsData)
    return earningsData;
  }
  async updateUserEarnings(){
    const users = await this.accountModel.find().exec();

    if (!users || users.length === 0) {
      throw new Error('No users found');
    }

    let totalEarnings = 0;
  
    // Calculate total earnings from all users
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
    } else {
      
      const earningsData = new this.earningsModel({
        revenue: 0,
        earnings: totalEarnings,
      });
      await earningsData.save();
    }
  
  }

  // Fetch referral data (static or dynamic)
  async fetchReferrals() {
    try {
      const limit= 5
        // Fetch referrers and their referral earnings
        const referrers = await this.accountModel.aggregate([
          { $match: { referalcode: { $exists: true, $ne: null } } }, // Match referrers with referral codes
          {
            $lookup: {
              from: 'accounts', // Reference the same collection (or use 'users' if it's a different one)
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
              referredUsers: { $size: '$referredUsers' }, // Get count of referred users
            },
          },
          {
            $sort: { referalearning: -1 }, // Sort by referral earnings in descending order
          },
          { $limit: limit }, // Limit the number of top referrers to the specified limit
        ]);
  
        // Map the results to match the expected referral data structure
        const referralData = referrers.map(referrer => ({
          referrer: referrer.name,
          earnings: parseFloat(referrer.referalearning || '0') * referrer.referredUsers, // Multiply earnings by number of referred users
        }));
        console.log(referralData);
        await this.referralModel.insertMany(referralData);
        return referralData;
      } catch (error) {
        console.error('Error fetching referral data:', error);
        throw error;
      }
  }
}
