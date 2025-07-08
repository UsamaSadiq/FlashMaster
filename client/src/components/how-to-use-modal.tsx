import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HowToUseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HowToUseModal({ open, onOpenChange }: HowToUseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            How to Use FlashCard Learning
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Getting Started</h4>
            <p className="text-blue-700">
              Select a technology from the homepage to begin learning with interactive flashcards.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Answering Questions</h4>
            <ul className="text-green-700 space-y-1">
              <li>• Click on your chosen answer or use number keys (1, 2, 3)</li>
              <li>• Correct answers turn green, incorrect answers turn red</li>
              <li>• The correct answer is always highlighted if you choose incorrectly</li>
              <li>• You can only select one answer per question</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">Navigation</h4>
            <ul className="text-purple-700 space-y-1">
              <li>• Use Previous/Next buttons or arrow keys (← →)</li>
              <li>• Questions are shuffled randomly for each session</li>
              <li>• Navigation wraps around from last to first question</li>
              <li>• Click "Home" to return to technology selection</li>
            </ul>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">Progress Tracking</h4>
            <p className="text-amber-700">
              Monitor your progress with the question counter and score display at the top of each flashcard.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
