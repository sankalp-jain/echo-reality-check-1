import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Check, X, RotateCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RegisterVoice = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    speakers: number;
    richness: 'Good' | 'Bad';
  } | null>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);
  const analysisSectionRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      setAnalysisResult(null);

      toast({
        title: "File uploaded successfully",
        description: `${file.name} is being analyzed.`,
      });

      // Scroll to analysis section
      setTimeout(() => {
        analysisSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);

      // Simulate analysis
      setTimeout(() => {
        const mockResult = {
          speakers: Math.random() > 0.3 ? 1 : 2, // Mostly single speaker
          richness: Math.random() > 0.4 ? 'Good' as const : 'Bad' as const // Mostly good quality
        };
        setAnalysisResult(mockResult);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

  const handleRegisterVoice = () => {
    toast({
      title: "Voice registered successfully!",
      description: "Your voice is now protected against deepfakes.",
    });
  };

  const handleUploadAgain = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    
    // Scroll back to upload section
    setTimeout(() => {
      uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Upload Section */}
      <div ref={uploadSectionRef} className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Register your voice with our platform
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Upload your voice to verify against deepfakes, and get legal usage rights
        </p>

        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                
                {!uploadedFile ? (
                  <>
                    <Input
                      type="file"
                      accept=".wav,.mp3"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="voice-upload"
                    />
                    <label htmlFor="voice-upload" className="cursor-pointer">
                      <Button size="lg" asChild>
                        <span>Upload Your Voice</span>
                      </Button>
                    </label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Accepts .wav and .mp3 files
                    </p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-500 mr-2" />
                      <span className="font-medium">{uploadedFile.name}</span>
                    </div>
                    <Button variant="outline" onClick={handleUploadAgain}>
                      Upload Different File
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analysis Loading */}
      {isAnalyzing && (
        <div ref={analysisSectionRef} className="text-center py-12">
          <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Analyzing the clip…</h3>
          <p className="text-muted-foreground">Detecting voice patterns and quality</p>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && !isAnalyzing && (
        <div ref={analysisSectionRef} className="pt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Voice Analysis Result</h2>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Number of speakers detected:</span>
                  <Badge variant="secondary">{analysisResult.speakers}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="font-medium">Voice richness status:</span>
                  <Badge 
                    variant={analysisResult.richness === 'Good' ? 'default' : 'destructive'}
                    className={analysisResult.richness === 'Good' ? 'bg-green-500' : ''}
                  >
                    {analysisResult.richness}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Conditional Output */}
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                {analysisResult.richness === 'Good' ? (
                  <>
                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                      <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <p className="text-green-700 dark:text-green-300 font-medium">
                        Your voice is eligible for cloning and verification.
                      </p>
                    </div>
                    <Button onClick={handleRegisterVoice} className="w-full" size="lg">
                      Register Your Voice
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                      <X className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <p className="text-red-700 dark:text-red-300 font-medium">
                        Voice sample not rich enough. Please upload another clip.
                      </p>
                    </div>
                    <Button 
                      onClick={handleUploadAgain} 
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Upload Again
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterVoice;