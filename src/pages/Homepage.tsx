import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Mic, AudioWaveform, Brain, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto py-12 md:py-24">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Welcome to Vaani
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-muted-foreground">
          Voice Authentication & AI Network for India
        </p>
        
        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 flex-1 max-w-xs"
            asChild
          >
            <Link to="/detect-deepfake">
              <Shield className="w-5 h-5 mr-2" />
              Detect Deep-Fake
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 flex-1 max-w-xs"
            asChild
          >
            <Link to="/clone-voice">
              <Mic className="w-5 h-5 mr-2" />
              Clone a Voice
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-primary/10 rounded-full">
                <Brain className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">AI-Powered Detection</h3>
            <p className="text-muted-foreground">
              Advanced machine learning algorithms analyze voice patterns to detect deepfakes with high accuracy.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-purple-500/10 rounded-full">
                <AudioWaveform className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Voice Cloning Studio</h3>
            <p className="text-muted-foreground">
              Create high-quality voice clones using our advanced AI technology with preset voices or custom uploads.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border-emerald-500/20">
          <CardContent className="p-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="p-3 bg-emerald-500/10 rounded-full">
                <Lock className="w-8 h-8 text-emerald-500" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your voice data is processed securely with enterprise-grade encryption and privacy protection.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Section */}
      <div className="bg-secondary/50 rounded-lg p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-muted-foreground">
            Join the growing community protecting against voice-based fraud
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-muted-foreground">Voice Samples Analyzed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">98.5%</div>
            <div className="text-muted-foreground">Detection Accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Voices Cloned</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Detection Flow */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-primary">Deepfake Detection</h3>
            <div className="space-y-4">
              <div className="flex items-center text-left">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-4 text-sm font-bold">1</div>
                <span>Upload your audio file or choose from sample audios</span>
              </div>
              <div className="flex items-center text-left">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-4 text-sm font-bold">2</div>
                <span>Our AI analyzes voice patterns and characteristics</span>
              </div>
              <div className="flex items-center text-left">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-4 text-sm font-bold">3</div>
                <span>Get instant results with detailed analysis</span>
              </div>
            </div>
          </div>

          {/* Cloning Flow */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-purple-600">Voice Cloning</h3>
            <div className="space-y-4">
              <div className="flex items-center text-left">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">1</div>
                <span>Choose a preset voice or upload your own</span>
              </div>
              <div className="flex items-center text-left">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">2</div>
                <span>Add your script text or upload a document</span>
              </div>
              <div className="flex items-center text-left">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">3</div>
                <span>Download your generated voice audio</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground border-t pt-8">
        <p>Vaani - Voice Authentication & AI Network for India</p>
        <p>Powered by advanced AI technology for voice security and generation.</p>
      </div>
    </div>
  );
};

export default Homepage;