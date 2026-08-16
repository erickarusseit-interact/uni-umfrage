CREATE TABLE "survey_responses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "survey_responses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"treatment_group" integer NOT NULL,
	"visawi_1" integer NOT NULL,
	"visawi_2" integer NOT NULL,
	"visawi_3" integer NOT NULL,
	"visawi_4" integer NOT NULL,
	"comp_1" integer NOT NULL,
	"comp_2" integer NOT NULL,
	"comp_3" integer NOT NULL,
	"trust_1" integer NOT NULL,
	"trust_2" integer NOT NULL,
	"trust_3" integer NOT NULL,
	"mc_1" integer NOT NULL,
	"mc_2" integer NOT NULL,
	"age" integer NOT NULL,
	"gender" varchar(50) NOT NULL,
	"education_level" varchar(100) NOT NULL
);
--> statement-breakpoint
DROP TABLE "participants";