// user.controller.ts
import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { error } from 'node:console';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }
  @Post('verify-otp')
  async verifyOTP(@Body() otpData: { email: string; otp: string }) {
    return this.userService.verifyOTP(otpData.email, otpData.otp);
  }

  @Post('signin')
  async signin(@Body() credentials: { email: string; password: string }) {
    return this.userService.signin(credentials.email, credentials.password);
  }
  @Post('user')
  async user(@Body() credentials: { email: string }) {
    return this.userService.user(credentials.email);
  }
  @Post('invite')
  async invite(@Body() credentials: { email: string, referalcode: string }) {
   return this.userService.invite(credentials.email, credentials.referalcode);
  }
  @Post('placeorder')
  async placeOrder(@Body() credentials: { AccountId: string, amount: any, ReferralName: string, type: string }) {
    return this.userService.placeOrder(credentials.AccountId, credentials.amount, credentials.ReferralName, credentials.type);
  }
  @Get('payment')
  async payment(@Headers('authorization') token: string) {
    // Extract the Bearer token
    const bearerToken = token?.replace('Bearer ', '');

    if (!bearerToken) {
      throw new error('Token is missing');
    }

    // Process the token as needed
    return this.userService.payment(bearerToken); // Pass token to the service
  }
}
