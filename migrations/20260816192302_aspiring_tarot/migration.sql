ALTER TABLE "survey_responses" ADD COLUMN "s1" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "s2" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "eligible" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "aufwand_1" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "aufwand_2" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "aufwand_3" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "comp_4" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "trust_4" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "intent_1" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "intent_2" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "intent_3" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "intent_4" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "attention_check" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "treatment_group" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "visawi_1" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "visawi_2" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "visawi_3" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "visawi_4" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "comp_1" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "comp_2" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "comp_3" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "trust_1" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "trust_2" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "trust_3" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "mc_1" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "mc_2" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "age" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "gender" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "education_level" DROP NOT NULL;