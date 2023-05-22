"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmailTable1684727707197 = void 0;
const typeorm_1 = require("typeorm");
class AddEmailTable1684727707197 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "emails",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "customer_id",
                    type: "int",
                },
                {
                    name: "email",
                    type: "varchar(150)",
                },
                {
                    name: "is_verified",
                    type: "boolean",
                    default: false,
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
        await queryRunner.createForeignKey("emails", new typeorm_1.TableForeignKey({
            columnNames: ["customer_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "customers",
            onDelete: "CASCADE",
        }));
        await queryRunner.createIndices("emails", [
            new typeorm_1.TableIndex({
                name: "idx_emails_customer_id",
                columnNames: ["customer_id"],
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropIndices("emails", [
            new typeorm_1.TableIndex({
                name: "idx_emails_customer_id",
                columnNames: ["customer_id"],
            }),
        ]);
        await queryRunner.dropTable("emails");
    }
}
exports.AddEmailTable1684727707197 = AddEmailTable1684727707197;
//# sourceMappingURL=1684727707197-AddEmailTable.js.map