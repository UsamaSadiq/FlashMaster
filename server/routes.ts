import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFlashcardSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all technologies
  app.get("/api/technologies", async (req, res) => {
    try {
      const technologies = await storage.getTechnologies();
      res.json(technologies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch technologies" });
    }
  });

  // Get flashcard data structure
  app.get("/api/flashcards", async (req, res) => {
    try {
      const data = await storage.getFlashcardData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flashcard data" });
    }
  });

  // Get flashcards by technology
  app.get("/api/flashcards/:technology", async (req, res) => {
    try {
      const { technology } = req.params;
      const flashcards = await storage.getFlashcardsByTechnology(technology);
      res.json(flashcards);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flashcards" });
    }
  });

  // Create a new flashcard
  app.post("/api/flashcards", async (req, res) => {
    try {
      const result = insertFlashcardSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid flashcard data" });
      }

      const flashcard = await storage.createFlashcard(result.data);
      res.status(201).json(flashcard);
    } catch (error) {
      res.status(500).json({ message: "Failed to create flashcard" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
