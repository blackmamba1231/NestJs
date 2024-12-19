// user.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { orders, Transactions, User } from './user.schema';
import { Account } from './user.schema';
import { CreateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as speakeasy from 'speakeasy';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,
 @InjectModel(Account.name) private accountModel: Model<Account>,@InjectModel (orders.name) private orderModel: Model<orders>, @InjectModel (Transactions.name) private transactionModel: Model<Transactions>) {}
   
   
  async signup(createUserDto: CreateUserDto) {
    const { email, password, name, phone, referalcode } = createUserDto;
    let referredby: any = "";
    if(referalcode!=""){
      const account = await this.accountModel.findOne({ referalcode: referalcode });
      console.log("Referred by found");
      console.log(account);
      referredby = account._id;
    }
    
    const unverifiedUser = await this.userModel.findOne({ email ,Verified: false});

    if (unverifiedUser) {
        await this.userModel.deleteOne({ email });
        console.log('User deleted successfully');
    }
    const user = await this.userModel.findOne({ email, Verified: true });
    if (user) { 
      throw new Error('User already exists');
    }
    const otp = speakeasy.totp({
      secret: speakeasy.generateSecret().base32, 
      digits: 6, 
    });
    
    await this.sendConfirmationEmail(email, otp);
    const hashedOTP = await bcrypt.hash(otp, 10);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({name, phone, email, password: hashedPassword, otp: hashedOTP, otpExpiresAt: new Date(Date.now() + 15 * 60 * 1000),Verified: false, referredby: referredby, });
    await newUser.save();
    return newUser;
  }
  private sendCodeEmail(email: string, referalcode: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Referral code',
      text: `Your Referral Code is: ${referalcode} . Signup with this COde to get 10% discount on your first order.`,
    };
    transporter.sendMail(mailOptions);
  }
  private async sendConfirmationEmail(email: string, otp: string) {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
      })
      
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp} . It will expire in 5 minutes.`,
      };
      
      await transporter.sendMail(mailOptions);
  }
  async user(email : string) {
    try{
      const user = await this.accountModel.findOne({ email: email });
      console.log(user);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
    }catch(error){
        console.log(error);
    }
  }
  async verifyOTP(email: string, otp: string) {
    const user = await this.userModel.findOne({ email });
 
    try{if(!user || !user.otp ){
      throw new Error('User not found');

  }
  if(user.otpExpiresAt < new Date()){
      throw new Error('OTP expired');
  }
  const isOTPValid = await bcrypt.compare(otp, user.otp);
  if(!isOTPValid){
      throw new Error('Invalid OTP');
  }
  user.Verified = true;
  await user.save();
  const hashedPassword = user.password;
  console.log(hashedPassword);
  console.log(user.name);
  console.log(user.phone);
  console.log(user.email);
  console.log(user.Verified);
  const referalcode = this.generateReferralCode();
  const Account = new this.accountModel({referredby: user.referredby,DateCreated: new Date(), email, password: hashedPassword, name: user.name, phone: user.phone, earned: 0, pending: 0, paid: 0, rejected: 0, cashback: 0,referalcode: referalcode , referalearning: 0});
  await Account.save();
  console.log(Account);
  const useremail = Account.email;
  const AccountId = Account._id;
  const token = jwt.sign({ AccountId }, process.env.JWT_SECRET);
  return {useremail, token, AccountId ,success: true };
}catch  (error) {
  console.log(error);
  throw new Error(error.message);
}
  }
  generateReferralCode(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }
  async signin(email: string, password: string) {
    const user = await this.accountModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ AccountId: user._id }, process.env.JWT_SECRET);
    const AccountId = user._id;
    const useremail = user.email;
    return {useremail, token, AccountId ,success: true };
  }
  async invite(email: string, referalcode: string) {
    this.sendCodeEmail(email, referalcode);
    return {success: true };
  }
  async placeOrder(AccountId: string, amount: any, ReferralName: string,type  : string) {
     const user = await this.accountModel.findById(AccountId);
     if(!user){
       throw new Error('User not found');
     }
     const order = await this.orderModel.create({ ReferralName: ReferralName, amount: amount, createdat: new Date(), type: type });
    
     if(user.referredby!==""){
      const referrer = await this.accountModel.findOne({ refferedby: user.referredby });
      if(referrer){
        const cashback = amount * 0.1; // 10% cashback
        referrer.referalearning += cashback;

        await referrer.save();

        await this.transactionModel.create({
          user_id: referrer._id,
          amount: cashback,
          type: 'cashback',
          order_id: order._id
        })
      }
     }
     return order;
  }
  
  
  async payment(bearerToken: string){
    let decodedToken:any;
    try{
      decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET);

    }catch (error){
      throw new Error('Invalid token');

    }  
     const accountId = decodedToken?.AccountId;
     if(!accountId){
      throw new UnauthorizedException('Account id not found in token');
     }
     const account = await this.accountModel.findById(accountId);
     if(!account){
      throw new UnauthorizedException('Account not found');
     }
     const transactions = await this.transactionModel.find({ user_id: accountId });
     return transactions;

  }

}
