import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Play, Pause } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const famousVoices = [
  {
    id: "1",
    name: "Morgan Freeman",
    type: "Actor",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2", 
    name: "David Attenborough",
    type: "Narrator",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Oprah Winfrey", 
    type: "Media Personality",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Samuel L. Jackson",
    type: "Actor", 
    imageUrl: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Joe Rogan",
    type: "Podcaster",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "6",
    name: "Neil deGrasse Tyson",
    type: "Scientist",
    imageUrl: "/placeholder.svg"
  }
];

const CloneVoice = () => {
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [script, setScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const scriptSectionRef = useRef<HTMLDivElement>(null);
  const outputSectionRef = useRef<HTMLDivElement>(null);

  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
    setTimeout(() => {
      scriptSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setScript(e.target?.result as string);
      };
      reader.readAsText(file);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been loaded.`,
      });
    }
  };

  const handleSubmit = async () => {
    if (!script.trim() || !selectedVoice) {
      toast({
        title: "Missing information",
        description: "Please select a voice and provide a script.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate processing time
    setTimeout(() => {
      setGeneratedAudio("/placeholder.svg"); // Mock audio URL
      setIsGenerating(false);
      outputSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      toast({
        title: "Voice generated successfully!",
        description: "Your cloned voice is ready to play.",
      });
    }, 3000);
  };

  const selectedVoiceData = famousVoices.find(v => v.id === selectedVoice);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Voice Selection Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Choose the voice you want to clone
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Pick from iconic voices you love. Tap to preview and proceed.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {famousVoices.map((voice) => (
            <Card 
              key={voice.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                selectedVoice === voice.id ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => handleVoiceSelect(voice.id)}
            >
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={voice.imageUrl} alt={voice.name} />
                  <AvatarFallback>{voice.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-2">{voice.name}</h3>
                <Badge variant="secondary" className="mb-4">{voice.type}</Badge>
                <Button 
                  variant={selectedVoice === voice.id ? "default" : "outline"}
                  className="w-full"
                >
                  {selectedVoice === voice.id ? "Selected" : "Select"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upload Script Section */}
      {selectedVoice && (
        <div ref={scriptSectionRef} className="mb-12 pt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Upload or paste your script</h2>
            <p className="text-lg text-muted-foreground">
              Your selected voice will speak this for you
            </p>
            {selectedVoiceData && (
              <p className="text-primary font-medium">
                Selected: {selectedVoiceData.name}
              </p>
            )}
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Upload Script File</label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <Input
                  type="file"
                  accept=".txt,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="script-upload"
                />
                <label htmlFor="script-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>Choose File (.txt, .docx)</span>
                  </Button>
                </label>
              </div>
            </div>

            <div className="text-center text-muted-foreground">or</div>

            <div>
              <label className="block text-sm font-medium mb-2">Paste your script</label>
              <Textarea
                placeholder="Type or paste your script here..."
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <Button 
              onClick={handleSubmit} 
              disabled={!script.trim() || isGenerating}
              className="w-full h-12 text-lg"
            >
              {isGenerating ? "Generating..." : "Submit"}
            </Button>
          </div>
        </div>
      )}

      {/* Loading Animation */}
      {isGenerating && (
        <div className="text-center py-12">
          <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Your new voice is getting generated…</h3>
          <p className="text-muted-foreground">This may take a few moments</p>
        </div>
      )}

      {/* Output Section */}
      {generatedAudio && !isGenerating && (
        <div ref={outputSectionRef} className="pt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Your Voice is Ready!</h2>
            <p className="text-lg text-muted-foreground">
              Listen to your generated voice clone
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="bg-secondary/50 rounded-lg p-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <p className="mt-4 text-sm text-muted-foreground">Generated Voice</p>
                </div>
                
                <Button className="w-full" variant="default">
                  <Download className="w-4 h-4 mr-2" />
                  Download Audio
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloneVoice;