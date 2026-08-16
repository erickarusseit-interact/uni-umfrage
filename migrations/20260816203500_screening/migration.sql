ALTER TABLE "survey_responses" ADD COLUMN "s1" boolean;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "s2" boolean;--> statement-breakpoint
ALTER TABLE "survey_responses" ADD COLUMN "eligible" boolean;--> statement-breakpoint
UPDATE "survey_responses" SET "s1" = false, "s2" = false, "eligible" = true WHERE "s1" IS NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "s1" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "s2" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "survey_responses" ALTER COLUMN "eligible" SET NOT NULL;--> statement-breakpoint
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
