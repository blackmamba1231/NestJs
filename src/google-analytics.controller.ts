import { Controller, Get, Query, Res } from '@nestjs/common';
import { GoogleAnalyticsService } from './google-analytics.service';
import { Response } from 'express';

@Controller('analytics')
export class GoogleAnalyticsController {
  constructor(private readonly googleAnalyticsService: GoogleAnalyticsService) {}

  // Endpoint to fetch user analytics
  @Get('user-analytics')
  async fetchUserAnalytics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    
  ) {
    try {
      return this.googleAnalyticsService.fetchUserAnalytics(startDate, endDate);
    
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching user analytics data',
        error: error.message,
      };
    }
  }
  @Get('update-earnings')
  async updateUserEarnings(){
    try{
       return this.googleAnalyticsService.updateUserEarnings();
       
    }catch(error){
      return {
        success: false,
        message: 'Error fetching earnings data',
        error: error.message,
      }
    }
  }
  // Endpoint to fetch earnings data
  @Get('earnings')
  async fetchEarnings(
  
  ) {
    try {
      return this.googleAnalyticsService.fetchEarnings();
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching earnings data',
        error: error.message,
      }
    }
  }

  // Endpoint to fetch referral data
  @Get('referrals')
  async fetchReferrals() {
    try {
      return this.googleAnalyticsService.fetchReferrals();
      
    } catch (error) {
      return {
        success: false,
        message: 'Error fetching referral data',
        error: error.message,
      };
    }
  }
}
