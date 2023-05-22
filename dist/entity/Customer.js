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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ICustomer_1 = require("../interfaces/entity/ICustomer");
const Email_1 = __importDefault(require("./Email"));
let Customer = class Customer {
    id;
    account_id;
    first_name;
    last_name;
    password;
    status;
    profile_pic;
    created_at;
    updated_at;
    deleted_at;
    email;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { unique: true }),
    __metadata("design:type", String)
], Customer.prototype, "account_id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Customer.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Customer.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { select: false, default: null }),
    __metadata("design:type", String)
], Customer.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", { enum: ICustomer_1.CustomerStatusEnum, default: "ACTIVE" }),
    __metadata("design:type", String)
], Customer.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "profile_pic", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, typeorm_1.DeleteDateColumn)({ default: null }),
    __metadata("design:type", Date)
], Customer.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Email_1.default, (email) => email.mobile_customer_email, {
        cascade: true,
    }),
    __metadata("design:type", Email_1.default)
], Customer.prototype, "email", void 0);
Customer = __decorate([
    (0, typeorm_1.Entity)({ name: "customers" })
], Customer);
exports.default = Customer;
//# sourceMappingURL=Customer.js.map