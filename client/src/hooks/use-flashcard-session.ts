import { useState, useCallback } from "react";
import { shuffleArray, getStoredProgress, setStoredProgress } from "@/lib/flashcard-data";

export function useFlashcardSession() {
  const [technology, setTechnology] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [hasAnswered, setHasAnswered] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);

  const initializeSession = useCallback((tech: string, techQuestions: Record<string, Record<string, "right" | "wrong">>) => {
    const questionList = Object.keys(techQuestions);
    const shuffledQuestions = shuffleArray(questionList);
    const storedIndex = getStoredProgress(tech);
    
    setTechnology(tech);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(Math.min(storedIndex, shuffledQuestions.length - 1));
    setScore({ correct: 0, total: shuffledQuestions.length });
    setHasAnswered(false);
    setAnsweredQuestions(new Set());
    setIsCompleted(false);
  }, []);

  const selectAnswer = useCallback((answer: string, isCorrect: boolean) => {
    if (hasAnswered) return;
    
    setHasAnswered(true);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total
    }));
    
    // Track answered questions
    setAnsweredQuestions(prev => {
      const newSet = new Set(prev);
      newSet.add(currentQuestionIndex);
      
      // Check if all questions have been answered
      if (newSet.size === questions.length) {
        setIsCompleted(true);
      }
      
      return newSet;
    });
  }, [hasAnswered, currentQuestionIndex, questions.length]);

  const goToNext = useCallback(() => {
    const nextIndex = currentQuestionIndex === questions.length - 1 ? 0 : currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);
    setHasAnswered(false);
    setStoredProgress(technology, nextIndex);
  }, [currentQuestionIndex, questions.length, technology]);

  const goToPrevious = useCallback(() => {
    const prevIndex = currentQuestionIndex === 0 ? questions.length - 1 : currentQuestionIndex - 1;
    setCurrentQuestionIndex(prevIndex);
    setHasAnswered(false);
    setStoredProgress(technology, prevIndex);
  }, [currentQuestionIndex, questions.length, technology]);

  return {
    technology,
    questions,
    currentQuestionIndex,
    score,
    hasAnswered,
    answeredQuestions,
    isCompleted,
    initializeSession,
    selectAnswer,
    goToNext,
    goToPrevious
  };
}
