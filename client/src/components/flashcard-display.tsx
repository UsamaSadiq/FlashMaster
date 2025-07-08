import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface FlashcardDisplayProps {
  technology: string;
  question: string;
  answers: Record<string, "right" | "wrong">;
  hasAnswered: boolean;
  onSelectAnswer: (answer: string, isCorrect: boolean) => void;
}

export default function FlashcardDisplay({
  technology,
  question,
  answers,
  hasAnswered,
  onSelectAnswer
}: FlashcardDisplayProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsTransitioning(false);
  }, [question]);

  const handleAnswerClick = (answer: string) => {
    if (hasAnswered) return;
    
    const isCorrect = answers[answer] === "right";
    setSelectedAnswer(answer);
    setShowFeedback(true);
    onSelectAnswer(answer, isCorrect);
  };

  const getButtonClassName = (answer: string) => {
    let baseClass = "w-full p-4 text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all duration-200 justify-center";
    
    if (hasAnswered) {
      if (answer === selectedAnswer) {
        if (answers[answer] === "right") {
          baseClass += " bg-green-100 border-green-500 text-green-800";
        } else {
          baseClass += " bg-red-100 border-red-500 text-red-800";
        }
      } else if (answers[answer] === "right" && selectedAnswer && answers[selectedAnswer] === "wrong") {
        baseClass += " bg-green-100 border-green-500 text-green-800";
      }
    }
    
    return baseClass;
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-sm font-medium text-blue-600 mb-2">{technology.toUpperCase()}</h3>
          <h2 className="text-xl font-semibold text-slate-800 leading-relaxed">
            {question}
          </h2>
        </div>
        
        <div className="space-y-4 px-4">
          {Object.keys(answers).map((answer) => (
            <Button
              key={answer}
              variant="ghost"
              className={getButtonClassName(answer)}
              onClick={() => handleAnswerClick(answer)}
              disabled={hasAnswered}
            >
              <span className="text-slate-700 text-center w-full">{answer}</span>
            </Button>
          ))}
        </div>
        
        {showFeedback && (
          <div className={`mt-6 p-4 rounded-lg text-center ${
            selectedAnswer && answers[selectedAnswer] === "right"
              ? "bg-green-100 border border-green-300"
              : "bg-red-100 border border-red-300"
          }`}>
            <p className={`font-medium ${
              selectedAnswer && answers[selectedAnswer] === "right"
                ? "text-green-800"
                : "text-red-800"
            }`}>
              {selectedAnswer && answers[selectedAnswer] === "right"
                ? "Correct! Well done!"
                : "Incorrect. The correct answer is highlighted above."
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
