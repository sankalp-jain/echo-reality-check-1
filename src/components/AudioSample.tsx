
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, TestTube } from "lucide-react";
import { Celebrity } from "@/types/Celebrity";
import { AudioWaveform } from "./AudioWaveform";

interface AudioSampleProps {
  id: string;
  name: string;
  audioUrl: string;
  celebrity: Celebrity;
  onTest: (id: string) => void;
}

export function AudioSample({ id, name, audioUrl, celebrity, onTest }: AudioSampleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(audioUrl));

  const handlePlay = () => {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      
      audio.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const handleTest = () => {
    onTest(id);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex items-center p-4">
          <div className="flex-shrink-0 mr-4">
            <img 
              src={celebrity.imageUrl} 
              alt={celebrity.name} 
              className="w-12 h-12 rounded-full object-cover" 
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">{celebrity.name}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              className={isPlaying ? "bg-primary text-primary-foreground" : ""} 
              onClick={handlePlay}
            >
              <Play className="w-4 h-4 mr-1" />
              {isPlaying ? "Stop" : "Play"}
            </Button>
            <Button 
              size="sm" 
              onClick={handleTest}
            >
              <TestTube className="w-4 h-4 mr-1" />
              Test
            </Button>
          </div>
        </div>
        {isPlaying && (
          <div className="p-4 pt-0">
            <AudioWaveform isPlaying={isPlaying} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
