// Utility functions for flashcard data manipulation
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getStoredProgress(technology: string): number {
  try {
    const stored = localStorage.getItem(`flashcard_progress_${technology}`);
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

export function setStoredProgress(technology: string, index: number): void {
  try {
    localStorage.setItem(`flashcard_progress_${technology}`, index.toString());
  } catch {
    // Ignore localStorage errors
  }
}

export function getStoredScore(technology: string): { correct: number; total: number } {
  try {
    const stored = localStorage.getItem(`flashcard_score_${technology}`);
    return stored ? JSON.parse(stored) : { correct: 0, total: 0 };
  } catch {
    return { correct: 0, total: 0 };
  }
}

export function setStoredScore(technology: string, score: { correct: number; total: number }): void {
  try {
    localStorage.setItem(`flashcard_score_${technology}`, JSON.stringify(score));
  } catch {
    // Ignore localStorage errors
  }
}
