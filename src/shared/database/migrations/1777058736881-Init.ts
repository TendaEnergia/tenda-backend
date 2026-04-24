import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1777058736881 implements MigrationInterface {
    name = 'Init1777058736881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying(255) NOT NULL, "department" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_a3d9676173d45095f26252902b" UNIQUE ("user_id"), CONSTRAINT "PK_89c52edc2b9c2178f1acd127f3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying(255) NOT NULL, "cpf" character varying(14) NOT NULL, "phone" character varying(20) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_542bfcd136b7ef76af7e4edf1d" UNIQUE ("user_id"), CONSTRAINT "PK_fc4acd4b04f4a0537e7213f8ddd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying(20) NOT NULL, "email" character varying(255) NOT NULL, "password_hash" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "admin_profiles" ADD CONSTRAINT "FK_a3d9676173d45095f26252902b1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_profiles" ADD CONSTRAINT "FK_542bfcd136b7ef76af7e4edf1d7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_profiles" DROP CONSTRAINT "FK_542bfcd136b7ef76af7e4edf1d7"`);
        await queryRunner.query(`ALTER TABLE "admin_profiles" DROP CONSTRAINT "FK_a3d9676173d45095f26252902b1"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "client_profiles"`);
        await queryRunner.query(`DROP TABLE "admin_profiles"`);
    }

}
