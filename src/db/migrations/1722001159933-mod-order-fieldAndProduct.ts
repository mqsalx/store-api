import { MigrationInterface, QueryRunner } from "typeorm";

export class ModOrderFieldAndProduct1722001159933 implements MigrationInterface {
    name = 'ModOrderFieldAndProduct1722001159933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "value" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total_value"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "total_value" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "total_value"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "total_value" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "value" numeric NOT NULL`);
    }

}
