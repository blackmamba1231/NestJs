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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const user_schema_2 = require("./user.schema");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const jwt = require("jsonwebtoken");
let UserService = class UserService {
    constructor(userModel, accountModel, orderModel, transactionModel) {
        this.userModel = userModel;
        this.accountModel = accountModel;
        this.orderModel = orderModel;
        this.transactionModel = transactionModel;
    }
    async signup(createUserDto) {
        const { email, password, name, phone, referalcode } = createUserDto;
        let referredby = "";
        if (referalcode != "") {
            const account = await this.accountModel.findOne({ referalcode: referalcode });
            console.log("Referred by found");
            console.log(account);
            referredby = account._id;
        }
        const unverifiedUser = await this.userModel.findOne({ email, Verified: false });
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
        const newUser = new this.userModel({ name, phone, email, password: hashedPassword, otp: hashedOTP, otpExpiresAt: new Date(Date.now() + 15 * 60 * 1000), Verified: false, referredby: referredby, });
        await newUser.save();
        return newUser;
    }
    sendCodeEmail(email, referalcode) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Referral code',
            text: `Your Referral Code is: ${referalcode} . Signup with this COde to get 10% discount on your first order.`,
        };
        transporter.sendMail(mailOptions);
    }
    async sendConfirmationEmail(email, otp) {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is: ${otp} . It will expire in 5 minutes.`,
        };
        await transporter.sendMail(mailOptions);
    }
    async user(email) {
        try {
            const user = await this.accountModel.findOne({ email: email });
            console.log(user);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
        catch (error) {
            console.log(error);
        }
    }
    async verifyOTP(email, otp) {
        const user = await this.userModel.findOne({ email });
        try {
            if (!user || !user.otp) {
                throw new Error('User not found');
            }
            if (user.otpExpiresAt < new Date()) {
                throw new Error('OTP expired');
            }
            const isOTPValid = await bcrypt.compare(otp, user.otp);
            if (!isOTPValid) {
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
            const Account = new this.accountModel({ referredby: user.referredby, DateCreated: new Date(), email, password: hashedPassword, name: user.name, phone: user.phone, earned: 0, pending: 0, paid: 0, rejected: 0, cashback: 0, referalcode: referalcode, referalearning: 0 });
            await Account.save();
            console.log(Account);
            const useremail = Account.email;
            const AccountId = Account._id;
            const token = jwt.sign({ AccountId }, process.env.JWT_SECRET);
            return { useremail, token, AccountId, success: true };
        }
        catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
    generateReferralCode(length = 8) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }
    async signin(email, password) {
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
        return { useremail, token, AccountId, success: true };
    }
    async invite(email, referalcode) {
        this.sendCodeEmail(email, referalcode);
        return { success: true };
    }
    async placeOrder(AccountId, amount, ReferralName, type) {
        const user = await this.accountModel.findById(AccountId);
        if (!user) {
            throw new Error('User not found');
        }
        const order = await this.orderModel.create({ ReferralName: ReferralName, amount: amount, createdat: new Date(), type: type });
        if (user.referredby !== "") {
            const referrer = await this.accountModel.findOne({ refferedby: user.referredby });
            if (referrer) {
                const cashback = amount * 0.1;
                referrer.referalearning += cashback;
                await referrer.save();
                await this.transactionModel.create({
                    user_id: referrer._id,
                    amount: cashback,
                    type: 'cashback',
                    order_id: order._id
                });
            }
        }
        return order;
    }
    async payment(bearerToken) {
        let decodedToken;
        try {
            decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET);
        }
        catch (error) {
            throw new Error('Invalid token');
        }
        const accountId = decodedToken?.AccountId;
        if (!accountId) {
            throw new common_1.UnauthorizedException('Account id not found in token');
        }
        const account = await this.accountModel.findById(accountId);
        if (!account) {
            throw new common_1.UnauthorizedException('Account not found');
        }
        const transactions = await this.transactionModel.find({ user_id: accountId });
        return transactions;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_2.Account.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.orders.name)),
    __param(3, (0, mongoose_1.InjectModel)(user_schema_1.Transactions.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model, mongoose_2.Model, mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map