// Static data loader for GitHub Pages deployment
import type { FlashcardData } from "@shared/schema";

// Technology name mapping to match the original server-side mapping
const TECHNOLOGY_MAPPING: Record<string, string> = {
  'python': 'Python',
  'javascript': 'JavaScript',
  'react': 'React',
  'nodejs': 'Node.js',
  'html-css': 'HTML/CSS',
  'typescript': 'TypeScript',
  'graphql': 'GraphQL'
};

export async function loadFlashcardData(): Promise<FlashcardData> {
  const data: FlashcardData = {};
  
  // List of available JSON files
  const jsonFiles = [
    'python.json',
    'javascript.json', 
    'react.json',
    'nodejs.json',
    'html-css.json',
    'typescript.json',
    'GraphQL.json'
  ];
  
  // Determine base path based on environment
  const basePath = import.meta.env.DEV ? '/data/' : '/projects/flashmaster/data/';
  
  try {
    // Load all JSON files in parallel
    const promises = jsonFiles.map(async (filename) => {
      try {
        const response = await fetch(`${basePath}${filename}`);
        if (!response.ok) {
          console.warn(`Failed to load ${filename}: ${response.status}`);
          return null;
        }
        const questions = await response.json();
        const technologyKey = filename.replace('.json', '').toLowerCase();
        const technologyName = TECHNOLOGY_MAPPING[technologyKey] || technologyKey;
        return { technologyName, questions };
      } catch (error) {
        console.warn(`Error loading ${filename}:`, error);
        return null;
      }
    });
    
    const results = await Promise.all(promises);
    
    // Combine all data into the expected format
    results.forEach((result) => {
      if (result && result.questions) {
        data[result.technologyName] = result.questions;
      }
    });
    
    return data;
  } catch (error) {
    console.error('Error loading flashcard data:', error);
    return {};
  }
}
