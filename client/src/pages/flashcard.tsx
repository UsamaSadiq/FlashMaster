import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Home, HelpCircle } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useHashLocation } from "wouter/use-hash-location";
import FlashcardDisplay from "@/components/flashcard-display";
import ProgressBar from "@/components/progress-bar";
import HowToUseModal from "@/components/how-to-use-modal";
import SuccessModal from "@/components/success-modal";
import { useFlashcardSession } from "@/hooks/use-flashcard-session";
import type { FlashcardData } from "@shared/schema";

export default function Flashcard() {
  const { technology: rawTechnology } = useParams<{ technology: string }>();
  const technology = rawTechnology ? decodeURIComponent(rawTechnology) : "";
  const [, setLocation] = useHashLocation();
  const [showModal, setShowModal] = useState(false);

  const { data: flashcardData, isLoading } = useQuery<FlashcardData>({
    queryKey: ["/api/flashcards"],
  });

  const {
    currentQuestionIndex,
    questions,
    score,
    hasAnswered,
    answeredQuestions,
    isCompleted,
    goToNext,
    goToPrevious,
    selectAnswer,
    initializeSession
  } = useFlashcardSession();

  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize session when data is loaded
  useEffect(() => {
    if (flashcardData && technology && flashcardData[technology]) {
      initializeSession(technology, flashcardData[technology]);
    }
  }, [flashcardData, technology, initializeSession]);

  // Handle answer selection with auto-advance
  const handleSelectAnswer = useCallback((answer: string, isCorrect: boolean) => {
    selectAnswer(answer, isCorrect);
    setIsAutoAdvancing(true);
    
    // Auto-advance after 1.5 seconds
    setTimeout(() => {
      setIsTransitioning(true);
      
      // Start slide out animation
      setTimeout(() => {
        setIsAutoAdvancing(false);
        goToNext();
        
        // Complete transition after card changes
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }, 500);
    }, 1500);
  }, [selectAnswer, goToNext]);

  // Reset states when question changes
  useEffect(() => {
    setIsAutoAdvancing(false);
    setIsTransitioning(false);
  }, [currentQuestionIndex]);

  // Handle completion
  useEffect(() => {
    if (isCompleted) {
      // Show success modal after a brief delay
      setTimeout(() => {
        // Auto-redirect to home after 3 seconds
        setTimeout(() => {
          setLocation("/");
        }, 3000);
      }, 500);
    }
  }, [isCompleted, setLocation]);

  // Handle going home from success modal
  const handleGoHome = useCallback(() => {
    setLocation("/");
  }, [setLocation]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showModal) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case '1':
        case '2':
        case '3':
          e.preventDefault();
          const index = parseInt(e.key) - 1;
          if (questions.length > 0 && !hasAnswered && flashcardData && technology && !isAutoAdvancing) {
            const currentQuestion = questions[currentQuestionIndex];
            const answers = flashcardData[technology][currentQuestion];
            const answerKeys = Object.keys(answers);
            if (answerKeys[index]) {
              handleSelectAnswer(answerKeys[index], answers[answerKeys[index]] === 'right');
            }
          }
          break;
        case 'Escape':
          setShowModal(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal, hasAnswered, questions, currentQuestionIndex, flashcardData, technology, goToPrevious, goToNext, handleSelectAnswer, isAutoAdvancing]);

  if (isLoading || !flashcardData || !technology || !flashcardData[technology]) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-bold text-slate-800">FlashCard Learning</h1>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowModal(true)}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <HelpCircle className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setLocation("/")}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Home
                </Button>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="animate-pulse">
            <CardContent className="p-8">
              <div className="h-6 bg-slate-200 rounded mb-4"></div>
              <div className="h-8 bg-slate-200 rounded mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 bg-slate-200 rounded"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-bold text-slate-800">FlashCard Learning</h1>
              <Button
                variant="outline"
                onClick={() => setLocation("/")}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Home
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">No questions available</h2>
              <p className="text-slate-600">No flashcards found for {technology}.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswers = flashcardData[technology][currentQuestion];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-slate-800">FlashCard Learning</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowModal(true)}
                className="text-slate-600 hover:text-slate-900"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setLocation("/")}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBar
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          score={score}
        />

        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-md transition-all duration-200 flex items-center justify-center group hover:shadow-lg"
            aria-label="Previous question"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-slate-800" />
          </button>

          {/* Flashcard */}
          <div className="flex-1 mx-16">
            <div 
              key={`${technology}-${currentQuestionIndex}`}
              className={`flashcard-container ${isTransitioning ? 'flashcard-slide-out' : 'flashcard-slide-in'}`}
            >
              <FlashcardDisplay
                technology={technology}
                question={currentQuestion}
                answers={currentAnswers}
                hasAnswered={hasAnswered}
                onSelectAnswer={handleSelectAnswer}
              />
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-md transition-all duration-200 flex items-center justify-center group hover:shadow-lg"
            aria-label="Next question"
          >
            <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-slate-800" />
          </button>
        </div>

        <div className="flex justify-center mt-8">
          <span className="text-sm text-slate-500">Use ← → arrows or number keys</span>
        </div>
      </main>

      <HowToUseModal open={showModal} onOpenChange={setShowModal} />
      <SuccessModal 
        open={isCompleted} 
        technology={technology || ""} 
        score={score} 
        onGoHome={handleGoHome} 
      />
    </div>
  );
}
