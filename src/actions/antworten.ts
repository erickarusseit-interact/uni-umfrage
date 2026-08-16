"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { antworten } from "@/db/schema";

export const getData = async () => {
    const data = await db.select().from(antworten);
    return data;
};

export const addTodo = async (id: number, text: string) => {
    await db.insert(antworten).values({
        id: id,
        text: text,
    });
};

