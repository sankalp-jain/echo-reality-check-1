import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Play, Upload, Download, Mic, Pause } from "lucide-react";

const famousVoices = [
  {
    id: "amit_shah_clone.mp3",
    name: "Amit Shah",
    type: "Politician",
    imageUrl: "/politician/Amit-Shah.jpg"
  },
  {
    id: "ml_khattar_clone.mp3", 
    name: "ML Khattar",
    type: "Politician",
    imageUrl: "/politician/MLKhattar.jpg"
  },
  {
    id: "narendra_modi_clone.mp3",
    name: "Narendra Modi", 
    type: "Politician",
    imageUrl: "/politician/NaMo.jpeg"
  },
  {
    id: "nayab_singh_saini_clone.mp3",
    name: "Nayab Singh Saini",
    type: "Politician", 
    imageUrl: "/politician/Nayab_Singh_Saini_2023.jpg"
  },
  {
    id: "aditya_nath_yogi_clone.mp3",
    name: "Aditya Nath Yogi",
    type: "Politician",
    imageUrl: "/politician/yogi.jpeg"
  }
];

const CloneVoice = () => {
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [script, setScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadedVoice, setUploadedVoice] = useState<File | null>(null);
  const [uploadResponse, setUploadResponse] = useState<any>(null);
  const [cloneResponse, setCloneResponse] = useState<any>(null);
  const [isUploadingVoice, setIsUploadingVoice] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  
  const scriptSectionRef = useRef<HTMLDivElement>(null);
  const outputSectionRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle voice selection
  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
    // Scroll to script section
    if (scriptSectionRef.current) {
      scriptSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle voice file upload
  const handleVoiceUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingVoice(true);
      setUploadedVoice(file);
      
      try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('file', file);
        
        // Call the backend API
        const response = await fetch('https://cleancommit-voice-clone.hf.space/upload-clone-audio', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('Upload successful:', result);
        
        // Validate the response
        if (result.error) {
          throw new Error(result.error);
        }
        
        if (!result.filename) {
          throw new Error('No filename received from server');
        }
        
        // Store the upload response
        setUploadResponse(result);
        
        // Scroll to script section
        if (scriptSectionRef.current) {
          scriptSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to upload file. Please try again.';
        alert(`Upload failed: ${errorMessage}`);
      } finally {
        setIsUploadingVoice(false);
      }
    }
  };

  // Handle file upload for script
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setScript(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  // Handle audio playback
  const handleAudioPlay = () => {
    if (!generatedAudio) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(generatedAudio);
        audioRef.current.onended = () => setIsPlaying(false);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Handle audio download
  const handleAudioDownload = () => {
    if (!generatedAudio || !cloneResponse?.output_filename) return;
    
    const link = document.createElement('a');
    link.href = generatedAudio;
    link.download = cloneResponse.output_filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if ((!selectedVoice && !uploadedVoice) || !script.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // Determine the sample_id based on selection or upload
      let sampleId: string;
      if (selectedVoice) {
        // For preset voices, use the voice ID as sample_id
        sampleId = selectedVoice;
      } else if (uploadedVoice && uploadResponse) {
        // For uploaded voice, use the filename from backend response
        sampleId = uploadResponse.filename;
      } else {
        throw new Error('No voice selected or uploaded');
      }
      
      // Call the clone-voice API
      const response = await fetch(`https://cleancommit-voice-clone.hf.space/clone-voice?sample_id=${encodeURIComponent(sampleId)}&text=${encodeURIComponent(script)}`);
      
      if (!response.ok) {
        throw new Error(`Clone failed: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Clone successful:', result);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      if (!result.output_filename) {
        throw new Error('No output filename received from server');
      }
      
      // Store the clone response
      setCloneResponse(result);
      
      // Set the generated audio URL for playback
      const audioUrl = `https://cleancommit-voice-clone.hf.space/clone/${result.output_filename}`;
      setGeneratedAudio(audioUrl);
      
      // Scroll to output section
      if (outputSectionRef.current) {
        outputSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error cloning voice:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to clone voice. Please try again.';
      alert(`Clone failed: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Voice Cloning Studio
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Create amazing voice clones with our advanced AI technology.
        </p>
        
        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 flex-1 max-w-xs"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload a Voice
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 flex-1 max-w-xs"
            onClick={() => setShowPresets(true)}
          >
            <Mic className="w-5 h-5 mr-2" />
            Use Preset
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".wav,.mp3,.m4a,.ogg"
          onChange={handleVoiceUpload}
          className="hidden"
        />
      </div>

      {/* Upload Status */}
      {isUploadingVoice && (
        <Card className="mb-8">
          <CardContent className="p-6 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-lg font-medium">Uploading your voice file...</p>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Voice Info */}
      {uploadedVoice && !isUploadingVoice && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">Uploaded Voice</h3>
                <p className="text-muted-foreground">
                  {uploadResponse?.filename || uploadedVoice.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Size: {uploadResponse?.file_size ? 
                    (uploadResponse.file_size / 1024 / 1024).toFixed(2) : 
                    (uploadedVoice.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {uploadResponse?.file_path && (
                  <p className="text-xs text-muted-foreground">
                    Path: {uploadResponse.file_path}
                  </p>
                )}
              </div>
              <div className="text-green-600 font-medium">
                ✓ Ready to use
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Famous Voices Grid */}
      {showPresets && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Choose the voice you want to clone</h2>
          <p className="text-center text-muted-foreground mb-8">
            Pick from iconic voices you love. Tap to preview and proceed.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {famousVoices.map((voice) => (
              <Card 
                key={voice.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedVoice === voice.id ? 'ring-2 ring-primary' : ''
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
      )}

      {/* Upload Script Section */}
      <div ref={scriptSectionRef} className="mb-12 pt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Upload or paste your script</h2>
          <p className="text-lg text-muted-foreground">
            {selectedVoice ? "Your selected voice will speak this for you" : 
             uploadedVoice ? "Your uploaded voice will speak this for you" :
             "Add your script to continue"}
          </p>
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

          <div className="max-w-2xl mx-auto">
            <Button 
              size="lg" 
              className="w-full text-lg py-6" 
              onClick={handleSubmit}
              disabled={(!selectedVoice && !uploadedVoice) || !script.trim()}
            >
              Generate Voice Clone
            </Button>
          </div>
        </div>
      </div>

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
                    onClick={handleAudioPlay}
                    className="w-16 h-16 rounded-full"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>
                  <p className="mt-4 text-sm text-muted-foreground">Generated Voice</p>
                  {cloneResponse?.output_filename && (
                    <p className="text-xs text-muted-foreground mt-2">
                      File: {cloneResponse.output_filename}
                    </p>
                  )}
                </div>
                
                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={handleAudioDownload}
                  disabled={!generatedAudio}
                >
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