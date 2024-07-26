import { MigrationInterface, QueryRunner } from "typeorm";

export class ModOrderField1721998625082 implements MigrationInterface {
    name = 'ModOrderField1721998625082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "value" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "value" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "password" character varying(255) NOT NULL`);
    }

}
