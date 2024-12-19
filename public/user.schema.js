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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionSchema = exports.ordersSchema = exports.UserSchema = exports.AccountSchema = exports.Transactions = exports.orders = exports.Account = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let User = class User extends mongoose_2.Document {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "Verified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "otp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], User.prototype, "otpExpiresAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "referredby", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)()
], User);
let Account = class Account extends mongoose_2.Document {
};
exports.Account = Account;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Account.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Account.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Account.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "comments", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Account.prototype, "DateCreated", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "replies", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "savedpostids", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "bio", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "profileImage", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "bloodgroup", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "earned", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "pending", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "paid", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "referalearning", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "rejected", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "cashback", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "referalcode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "referredby", void 0);
exports.Account = Account = __decorate([
    (0, mongoose_1.Schema)()
], Account);
let orders = class orders extends mongoose_2.Document {
};
exports.orders = orders;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orders.prototype, "ReferralName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orders.prototype, "Amount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], orders.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], orders.prototype, "createdat", void 0);
exports.orders = orders = __decorate([
    (0, mongoose_1.Schema)()
], orders);
let Transactions = class Transactions extends mongoose_2.Document {
};
exports.Transactions = Transactions;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transactions.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transactions.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transactions.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Transactions.prototype, "order_id", void 0);
exports.Transactions = Transactions = __decorate([
    (0, mongoose_1.Schema)()
], Transactions);
exports.AccountSchema = mongoose_1.SchemaFactory.createForClass(Account);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.ordersSchema = mongoose_1.SchemaFactory.createForClass(orders);
exports.TransactionSchema = mongoose_1.SchemaFactory.createForClass(Transactions);
//# sourceMappingURL=user.schema.js.map