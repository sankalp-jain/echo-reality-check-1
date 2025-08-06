import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AudioSample } from "@/components/AudioSample";
import { ResultsSection } from "@/components/ResultsSection";
import { celebrities, audioSamples, getDetectionResult } from "@/data/mockData";
import { DetectionResult } from "@/types/DetectionResult";
import { Celebrity } from "@/types/Celebrity";
import { Upload, Music } from "lucide-react";

const DetectDeepfake = () => {
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showRunTest, setShowRunTest] = useState(false);
  const sampleAudiosRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to scroll to sample audios
  const scrollToSamples = () => {
    if (sampleAudiosRef.current) {
      sampleAudiosRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setUploadedFile(file);
      
      // Simulate upload delay
      setTimeout(() => {
        setIsUploading(false);
        setShowRunTest(true);
      }, 2000);
    }
  };

  // Function to handle testing uploaded audio
  const handleTestUploadedAudio = async () => {
    if (!uploadedFile) return;
    
    setIsLoading(true);
    setCurrentResult(null);
    
    // Scroll to results section
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    try {
      // Generate a random result for uploaded file
      const result = await getDetectionResult(`uploaded_${uploadedFile.name}`);
      setCurrentResult(result);
    } catch (error) {
      console.error("Error testing uploaded audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle testing a sample audio
  const handleTestSample = async (sampleId: string) => {
    setIsLoading(true);
    setCurrentResult(null);
    
    // Scroll to results section
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    try {
      const result = await getDetectionResult(sampleId);
      setCurrentResult(result);
    } catch (error) {
      console.error("Error testing audio sample:", error);
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
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-6 text-primary">Fake Voice Detector</h1>
        <p className="text-xl mb-8">
          Upload your audio file or try our sample audios to detect if a voice is real or artificially generated.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 flex-1 max-w-xs"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-5 h-5 mr-2" />
          Upload Audio File
        </Button>
        
        <Button 
          size="lg" 
          variant="outline"
          className="text-lg px-8 py-6 flex-1 max-w-xs"
          onClick={scrollToSamples}
        >
          <Music className="w-5 h-5 mr-2" />
          Try Sample Audios
        </Button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".wav,.mp3,.m4a,.ogg"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Upload Status */}
      {isUploading && (
        <Card className="mb-8">
          <CardContent className="p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg font-medium">Uploading your audio file...</p>
          </CardContent>
        </Card>
      )}

      {/* Uploaded File Info and Test Button */}
      {uploadedFile && !isUploading && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">Uploaded File</h3>
                <p className="text-muted-foreground">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {showRunTest && (
                <Button size="lg" onClick={handleTestUploadedAudio}>
                  Run and Test
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      <div ref={resultsRef} className="mb-16">
        <ResultsSection result={currentResult} isLoading={isLoading} />
      </div>

      {/* Sample Audios Section */}
      <div ref={sampleAudiosRef} className="pt-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Sample Audio Files</h2>
        <p className="text-center text-muted-foreground mb-8">
          Select a sample audio to test if it's a real or fake voice.
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
    </div>
  );
};

export default DetectDeepfake;