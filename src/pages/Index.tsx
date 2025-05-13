
import { useEffect, useRef, useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { AudioSample } from "@/components/AudioSample";
import { ResultsSection } from "@/components/ResultsSection";
import { celebrities, audioSamples, getDetectionResult } from "@/data/mockData";
import { DetectionResult } from "@/types/DetectionResult";
import { Celebrity } from "@/types/Celebrity";

const Index = () => {
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioSamplesRef = useRef<HTMLDivElement>(null);

  // Function to scroll to audio samples
  const scrollToSamples = () => {
    if (audioSamplesRef.current) {
      audioSamplesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to handle testing an audio sample
  const handleTestSample = async (sampleId: string) => {
    setIsLoading(true);
    setCurrentResult(null);
    
    try {
      const result = await getDetectionResult(sampleId);
      setCurrentResult(result);
    } catch (error) {
      console.error("Error testing audio sample:", error);
      // Here you would handle errors, perhaps with a toast notification
    } finally {
      setIsLoading(false);
    }
  };

  // Get celebrity data for each audio sample
  const getSampleWithCelebrity = (sample: any) => {
    const celebrity = celebrities.find(c => c.id === sample.celebrityId) as Celebrity;
    return { ...sample, celebrity };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <HeroSection onRunTest={scrollToSamples} />
      
      {/* Audio Samples Section */}
      <div ref={audioSamplesRef} className="mt-16 pt-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Audio Samples</h2>
        <p className="text-center text-muted-foreground mb-8">
          Select an audio sample to test if it's a real or fake voice.
        </p>
        
        <div className="grid gap-4">
          {audioSamples.map((sample) => (
            <AudioSample
              key={sample.id}
              id={sample.id}
              name={sample.name}
              audioUrl={sample.audioUrl}
              celebrity={getSampleWithCelebrity(sample).celebrity}
              onTest={handleTestSample}
            />
          ))}
        </div>
      </div>
      
      {/* Results Section */}
      <ResultsSection result={currentResult} isLoading={isLoading} />
      
      {/* Footer */}
      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>Fake Voice Detection Proof-of-Concept</p>
        <p>This application is for demonstration purposes only.</p>
      </div>
    </div>
  );
};

export default Index;
