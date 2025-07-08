import { flashcards, type Flashcard, type InsertFlashcard, type FlashcardData } from "@shared/schema";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

export interface IStorage {
  getAllFlashcards(): Promise<Flashcard[]>;
  getFlashcardsByTechnology(technology: string): Promise<Flashcard[]>;
  createFlashcard(flashcard: InsertFlashcard): Promise<Flashcard>;
  getTechnologies(): Promise<string[]>;
  getFlashcardData(): Promise<FlashcardData>;
}

export class MemStorage implements IStorage {
  private flashcards: Map<number, Flashcard>;
  private currentId: number;

  constructor() {
    this.flashcards = new Map();
    this.currentId = 1;
    this.loadDataFromFile();
  }

  private loadDataFromFile() {
    try {
      const dataDir = join(process.cwd(), 'data');
      const files = readdirSync(dataDir).filter(file => file.endsWith('.json'));
      
      files.forEach(file => {
        const filePath = join(dataDir, file);
        const fileContent = readFileSync(filePath, 'utf-8');
        const questions = JSON.parse(fileContent);
        
        // Extract technology name from filename (remove .json extension)
        const technology = this.formatTechnologyName(file.replace('.json', ''));
        
        // Convert questions to flashcard format
        Object.entries(questions).forEach(([question, answers]) => {
          const flashcard: Flashcard = {
            id: this.currentId++,
            technology,
            question,
            answers: answers as Record<string, "right" | "wrong">
          };
          this.flashcards.set(flashcard.id, flashcard);
        });
      });
    } catch (error) {
      console.error('Error loading flashcard data from files:', error);
      throw new Error('Failed to load flashcard data');
    }
  }

  private formatTechnologyName(filename: string): string {
    // Convert filename to display name
    const nameMap: Record<string, string> = {
      'python': 'Python',
      'javascript': 'JavaScript',
      'react': 'React',
      'nodejs': 'Node.js',
      'html-css': 'HTML/CSS'
    };
    
    return nameMap[filename] || filename.charAt(0).toUpperCase() + filename.slice(1);
  }

  async getAllFlashcards(): Promise<Flashcard[]> {
    return Array.from(this.flashcards.values());
  }

  async getFlashcardsByTechnology(technology: string): Promise<Flashcard[]> {
    return Array.from(this.flashcards.values()).filter(
      (flashcard) => flashcard.technology === technology
    );
  }

  async createFlashcard(insertFlashcard: InsertFlashcard): Promise<Flashcard> {
    const id = this.currentId++;
    const flashcard: Flashcard = { 
      ...insertFlashcard, 
      id,
      answers: insertFlashcard.answers as Record<string, "right" | "wrong">
    };
    this.flashcards.set(id, flashcard);
    return flashcard;
  }

  async getTechnologies(): Promise<string[]> {
    const technologies = new Set<string>();
    this.flashcards.forEach((flashcard) => {
      technologies.add(flashcard.technology);
    });
    return Array.from(technologies);
  }

  async getFlashcardData(): Promise<FlashcardData> {
    const data: FlashcardData = {};
    this.flashcards.forEach((flashcard) => {
      if (!data[flashcard.technology]) {
        data[flashcard.technology] = {};
      }
      data[flashcard.technology][flashcard.question] = flashcard.answers;
    });
    return data;
  }
}

export const storage = new MemStorage();
