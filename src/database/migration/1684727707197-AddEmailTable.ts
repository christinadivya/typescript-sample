import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class AddEmailTable1684727707197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );
    await queryRunner.createForeignKey(
      "emails",
      new TableForeignKey({
        columnNames: ["customer_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "customers",
        onDelete: "CASCADE",
      })
    );
    await queryRunner.createIndices("emails", [
      new TableIndex({
        name: "idx_emails_customer_id",
        columnNames: ["customer_id"],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndices("emails", [
      new TableIndex({
        name: "idx_emails_customer_id",
        columnNames: ["customer_id"],
      }),
    ]);
    await queryRunner.dropTable("emails");
  }
}
