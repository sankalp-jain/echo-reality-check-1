
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onRunTest: () => void;
}

export function HeroSection({ onRunTest }: HeroSectionProps) {
  return (
    <div className="text-center max-w-3xl mx-auto py-12 md:py-24">
      <h1 className="text-4xl font-bold mb-6 text-primary">Fake Voice Detector</h1>
      <p className="text-xl mb-8">
        Now you can check and recognize if the voice you are hearing is actually a real voice or not.
      </p>
      <Button 
        size="lg" 
        onClick={onRunTest} 
        className="text-lg px-8 py-6 animate-pulse"
      >
        Run and Test
      </Button>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-secondary/50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Advanced Analysis</h3>
          <p className="text-muted-foreground">Our AI-powered system analyzes multiple audio features to detect synthetic voices.</p>
        </div>
        <div className="bg-secondary/50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Visual Results</h3>
          <p className="text-muted-foreground">View detailed visualizations of audio patterns to understand detection results.</p>
        </div>
        <div className="bg-secondary/50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Instant Detection</h3>
          <p className="text-muted-foreground">Get immediate results on whether a voice sample is authentic or artificially generated.</p>
        </div>
      </div>
    </div>
  );
}
