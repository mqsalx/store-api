import { MigrationInterface, QueryRunner } from "typeorm";

export class RelOrderItemOrder1721923137272 implements MigrationInterface {
    name = 'RelOrderItemOrder1721923137272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "items_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "sale_price" integer NOT NULL, "orderId" uuid, CONSTRAINT "PK_b3103e8045f9dcf1173171be20b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "items_orders" ADD CONSTRAINT "FK_582615a5afbb77d39c232dc35bd" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "items_orders" DROP CONSTRAINT "FK_582615a5afbb77d39c232dc35bd"`);
        await queryRunner.query(`DROP TABLE "items_orders"`);
    }

}
