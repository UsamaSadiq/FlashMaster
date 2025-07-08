import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

interface TechnologyCardProps {
  technology: string;
  questionCount: number;
}

export default function TechnologyCard({ technology, questionCount }: TechnologyCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(`/flashcard/${encodeURIComponent(technology)}`);
  };

  return (
    <Card 
      className="cursor-pointer border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">{technology.charAt(0)}</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">{technology}</h3>
          <p className="text-slate-600">{questionCount} questions</p>
        </div>
      </CardContent>
    </Card>
  );
}
