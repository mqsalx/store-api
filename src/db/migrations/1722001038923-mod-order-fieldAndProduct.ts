import { MigrationInterface, QueryRunner } from "typeorm";

export class ModOrderFieldAndProduct1722001038923 implements MigrationInterface {
    name = 'ModOrderFieldAndProduct1722001038923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "value" TYPE numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "value" TYPE numeric(10,2)`);
    }

}
