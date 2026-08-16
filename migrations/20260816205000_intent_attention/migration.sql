ALTER TABLE "survey_responses" ADD COLUMN "intent_1" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "intent_2" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "intent_3" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "intent_4" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "attention_check" integer;--> statement-breakpoint
ALTER TABLE "survey_responses" DROP COLUMN "trust_1";--> statement-breakpoint
ALTER TABLE "survey_responses" DROP COLUMN "trust_2";--> statement-breakpoint
ALTER TABLE "survey_responses" DROP COLUMN "trust_3";
