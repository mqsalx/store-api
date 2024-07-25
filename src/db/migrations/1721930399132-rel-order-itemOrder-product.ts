import { MigrationInterface, QueryRunner } from "typeorm";

export class RelOrderItemOrderProduct1721930399132 implements MigrationInterface {
    name = 'RelOrderItemOrderProduct1721930399132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_orders" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "items_orders" ADD CONSTRAINT "FK_a027cddebdab6612857fdbaf8c0" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_orders" DROP CONSTRAINT "FK_a027cddebdab6612857fdbaf8c0"`);
        await queryRunner.query(`ALTER TABLE "items_orders" DROP COLUMN "productId"`);
    }

}
