import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddCustomerTable1684724823172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("customers");
  }
}
