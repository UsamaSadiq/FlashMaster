import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import TechnologyCard from "@/components/technology-card";
import HowToUseModal from "@/components/how-to-use-modal";
import { loadFlashcardData } from "@/lib/static-data-loader";
import type { FlashcardData } from "@shared/schema";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const { data: flashcardData, isLoading } = useQuery<FlashcardData>({
    queryKey: ["flashcards"],
    queryFn: loadFlashcardData,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-bold text-slate-800">FlashCard Learning</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowModal(true)}
                className="text-slate-600 hover:text-slate-900"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-16 w-16 bg-slate-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-slate-200 rounded mx-auto mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-slate-800">FlashCard Learning</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowModal(true)}
              className="text-slate-600 hover:text-slate-900"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Choose Your Technology</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select a technology to start learning with interactive flashcards. 
            Test your knowledge with multiple-choice questions and track your progress.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcardData && Object.entries(flashcardData).map(([technology, questions]) => (
            <TechnologyCard
              key={technology}
              technology={technology}
              questionCount={Object.keys(questions).length}
            />
          ))}
        </div>
      </main>

      <HowToUseModal open={showModal} onOpenChange={setShowModal} />
    </div>
  );
}
