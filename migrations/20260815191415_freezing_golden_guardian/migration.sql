CREATE TABLE "participants" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "participants_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"age" integer NOT NULL,
	"gender" varchar(50) NOT NULL,
	"education_level" varchar(100) NOT NULL,
	"antworten" integer[] NOT NULL
);
--> statement-breakpoint
DROP TABLE "users";