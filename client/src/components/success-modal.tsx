import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Home } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  technology: string;
  score: {
    correct: number;
    total: number;
  };
  onGoHome: () => void;
}

export default function SuccessModal({ open, technology, score, onGoHome }: SuccessModalProps) {
  const percentage = Math.round((score.correct / score.total) * 100);

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-md text-center [&>button]:hidden">
        <DialogHeader>
          <div className="mx-auto mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-800 mb-2">
              Congratulations!
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              You've completed all questions for {technology}!
            </DialogDescription>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Your Results</h3>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {score.correct}/{score.total}
            </div>
            <div className="text-sm text-slate-600">
              {percentage}% Correct
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button
              onClick={onGoHome}
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}