
import { useEffect, useState } from "react";

interface AudioWaveformProps {
  isPlaying: boolean;
}

export function AudioWaveform({ isPlaying }: AudioWaveformProps) {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    if (isPlaying) {
      // Generate random heights for bars
      const numberOfBars = 30;
      const generateBars = () => {
        const newBars = Array.from({ length: numberOfBars }, () => 
          Math.floor(Math.random() * 30) + 5
        );
        setBars(newBars);
      };
      
      // Update bars every 100ms to simulate audio playing
      const interval = setInterval(generateBars, 100);
      
      return () => clearInterval(interval);
    } else {
      setBars(Array(30).fill(3)); // Default small bars when not playing
    }
  }, [isPlaying]);

  return (
    <div className="audio-waveform h-12 mt-2">
      {bars.map((height, index) => (
        <div 
          key={index} 
          style={{ height: `${height}px` }} 
          className="transition-all duration-100"
        />
      ))}
    </div>
  );
}
