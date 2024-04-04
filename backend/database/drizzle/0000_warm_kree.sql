CREATE TABLE IF NOT EXISTS "chapters" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"title" text,
	"volume" text,
	"chapter" text,
	"published_at" timestamp NOT NULL,
	"translated_language" text NOT NULL,
	"group_uuids" text[],
	"uploader_uuid" text NOT NULL,
	"manga_uuid" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manga" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"title" jsonb NOT NULL,
	"original_language" text NOT NULL,
	"tags" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scanlation_group" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"username" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chapters" ADD CONSTRAINT "chapters_uploader_uuid_user_id_fk" FOREIGN KEY ("uploader_uuid") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chapters" ADD CONSTRAINT "chapters_manga_uuid_manga_id_fk" FOREIGN KEY ("manga_uuid") REFERENCES "manga"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
