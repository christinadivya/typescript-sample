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
const Customer_1 = __importDefault(require("./Customer"));
let Email = class Email {
    id;
    email;
    customer_id;
    created_at;
    updated_at;
    deleted_at;
    mobile_customer_email;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Email.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Email.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true }),
    __metadata("design:type", Number)
], Email.prototype, "customer_id", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Email.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Email.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    (0, typeorm_1.DeleteDateColumn)({ default: null }),
    __metadata("design:type", Date)
], Email.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Customer_1.default, (customer) => customer.email, {
        orphanedRowAction: "delete",
    }),
    (0, typeorm_1.JoinColumn)({ name: "customer_id" }),
    __metadata("design:type", Customer_1.default)
], Email.prototype, "mobile_customer_email", void 0);
Email = __decorate([
    (0, typeorm_1.Entity)({ name: "emails" })
], Email);
exports.default = Email;
//# sourceMappingURL=Email.js.map