import { MigrationInterface, QueryRunner } from "typeorm";

export class ModOrderField1722000622913 implements MigrationInterface {
    name = 'ModOrderField1722000622913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total_value"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "total_value" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total_value"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "total_value" integer NOT NULL`);
    }

}
