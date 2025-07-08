interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  score: {
    correct: number;
    total: number;
  };
}

export default function ProgressBar({ currentQuestion, totalQuestions, score }: ProgressBarProps) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-slate-700">
          Score: {score.correct}/{score.total}
        </span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
