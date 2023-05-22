"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCustomerTable1684724823172 = void 0;
const typeorm_1 = require("typeorm");
class AddCustomerTable1684724823172 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "customers",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "account_id",
                    type: "varchar(50)",
                    isUnique: true,
                },
                {
                    name: "first_name",
                    type: "varchar(150)",
                },
                {
                    name: "last_name",
                    type: "varchar(150)",
                },
                {
                    name: "password",
                    type: "text",
                    isNullable: true,
                },
                {
                    name: "status",
                    type: "enum",
                    enum: ["ACTIVE", "INACTIVE", "ARCHIVED"],
                    enumName: "userStatusEnum",
                    default: '"ACTIVE"',
                },
                {
                    name: "profile_pic",
                    type: "text",
                    isNullable: true,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "deleted_at",
                    type: "timestamp",
                    isNullable: true,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("customers");
    }
}
exports.AddCustomerTable1684724823172 = AddCustomerTable1684724823172;
//# sourceMappingURL=1684724823172-AddCustomerTable.js.map