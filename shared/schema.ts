import { pgTable, text, serial, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  technology: text("technology").notNull(),
  question: text("question").notNull(),
  answers: json("answers").notNull().$type<Record<string, "right" | "wrong">>(),
});

export const insertFlashcardSchema = createInsertSchema(flashcards).omit({
  id: true,
});

export type InsertFlashcard = z.infer<typeof insertFlashcardSchema>;
export type Flashcard = typeof flashcards.$inferSelect;

// Define the flashcard data structure
export const flashcardDataSchema = z.record(
  z.string(),
  z.record(z.string(), z.record(z.string(), z.enum(["right", "wrong"])))
);

export type FlashcardData = z.infer<typeof flashcardDataSchema>;

// Session types for tracking user progress
export interface FlashcardSession {
  technology: string;
  questions: string[];
  currentIndex: number;
  score: {
    correct: number;
    total: number;
  };
  answered: boolean;
}

export interface UserProgress {
  [technology: string]: {
    lastIndex: number;
    score: {
      correct: number;
      total: number;
    };
  };
}
