import { MigrationInterface, QueryRunner } from 'typeorm';

export class firstMigration1677667978740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS document_id_seq;

-- Table Definition
CREATE TABLE "public"."document" (
    "id" int4 NOT NULL DEFAULT nextval('document_id_seq'::regclass),
    "name" varchar NOT NULL,
    "projectId" int4 NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);`,
    );

    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS element_id_seq;

-- Table Definition
CREATE TABLE "public"."element" (
    "id" int4 NOT NULL DEFAULT nextval('element_id_seq'::regclass),
    "name" varchar NOT NULL,
    "type" varchar NOT NULL,
    "projectId" int4 NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);`);

    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS element_to_document_id_seq;

-- Table Definition
CREATE TABLE "public"."element_to_document" (
    "id" int4 NOT NULL DEFAULT nextval('element_to_document_id_seq'::regclass),
    "order" int4 NOT NULL DEFAULT 0,
    "documentId" int4 NOT NULL,
    "elementId" int4 NOT NULL,
    PRIMARY KEY ("id")
);`);

    await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS project_id_seq;

-- Table Definition
CREATE TABLE "public"."project" (
    "id" int4 NOT NULL DEFAULT nextval('project_id_seq'::regclass),
    "name" varchar NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);`);
    await queryRunner.query(
      `ALTER TABLE "public"."document" ADD FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE CASCADE;`,
    );

    await queryRunner.query(
      `ALTER TABLE "public"."element" ADD FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE CASCADE;`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."element_to_document" ADD FOREIGN KEY ("documentId") REFERENCES "public"."document"("id") ON DELETE CASCADE;`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."element_to_document" ADD FOREIGN KEY ("elementId") REFERENCES "public"."element"("id") ON DELETE CASCADE;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
