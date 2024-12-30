import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1735552846622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying(255) NOT NULL,
        "password" character varying(255) NOT NULL,
        "avatar" character varying(255),
        "address" character varying(255),
        "mobile" character varying(15),
        "role" character varying(50),
        "birthday" date,
        "firebase" character varying(255),
        "status" character varying(50),
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "PK_2a5d23b639b06cc89f5c3d53ac7" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_8b07c5c20bdb92cc267d6e1c2ac" UNIQUE ("email")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
