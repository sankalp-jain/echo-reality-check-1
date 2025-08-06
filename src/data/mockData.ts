
import { Celebrity } from "@/types/Celebrity";
import { DetectionResult } from "@/types/DetectionResult";

// Mock celebrities
export const celebrities: Celebrity[] = [
  {
    id: "cel1",
    name: "Emma Johnson",
    imageUrl: "https://source.unsplash.com/random/100x100/?woman"
  },
  {
    id: "cel2",
    name: "Michael Chen",
    imageUrl: "https://source.unsplash.com/random/100x100/?man"
  },
  {
    id: "cel3",
    name: "Sofia Rodriguez",
    imageUrl: "https://source.unsplash.com/random/100x100/?actress"
  },
  {
    id: "cel4",
    name: "David Williams",
    imageUrl: "https://source.unsplash.com/random/100x100/?actor"
  },
  {
    id: "cel5",
    name: "Olivia Garcia",
    imageUrl: "https://source.unsplash.com/random/100x100/?singer"
  }
];

// Mock audio samples
export const audioSamples = [
  {
    id: "sample1",
    name: "Sample 1 - Original",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3",
    celebrityId: "cel1"
  },
  {
    id: "sample2",
    name: "Sample 1 - Fake A",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/956/956-preview.mp3",
    celebrityId: "cel1"
  },
  {
    id: "sample3",
    name: "Sample 1 - Fake B",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
    celebrityId: "cel1"
  },
  {
    id: "sample4",
    name: "Sample 2 - Original",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2/2-preview.mp3",
    celebrityId: "cel2"
  },
  {
    id: "sample5",
    name: "Sample 2 - Fake",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/1018/1018-preview.mp3",
    celebrityId: "cel2"
  },
  {
    id: "sample6",
    name: "Sample 3 - Original A",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3",
    celebrityId: "cel3"
  },
  {
    id: "sample7",
    name: "Sample 3 - Original B",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/931/931-preview.mp3",
    celebrityId: "cel3"
  },
  {
    id: "sample8",
    name: "Sample 3 - Fake",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/240/240-preview.mp3",
    celebrityId: "cel3"
  },
  {
    id: "sample9",
    name: "Sample 4 - Original",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3",
    celebrityId: "cel4"
  },
  {
    id: "sample10",
    name: "Sample 4 - Fake A",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/981/981-preview.mp3",
    celebrityId: "cel4"
  },
  {
    id: "sample11",
    name: "Sample 4 - Fake B",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/770/770-preview.mp3",
    celebrityId: "cel4"
  },
  {
    id: "sample12",
    name: "Sample 5 - Original A",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/618/618-preview.mp3",
    celebrityId: "cel5"
  },
  {
    id: "sample13",
    name: "Sample 5 - Original B",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/1026/1026-preview.mp3",
    celebrityId: "cel5"
  },
  {
    id: "sample14",
    name: "Sample 5 - Fake A",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/978/978-preview.mp3",
    celebrityId: "cel5"
  },
  {
    id: "sample15",
    name: "Sample 5 - Fake B",
    audioUrl: "https://assets.mixkit.co/active_storage/sfx/1031/1031-preview.mp3",
    celebrityId: "cel5"
  }
];

// Mock detection results
export const mockResults: Record<string, DetectionResult> = {
  sample1: {
    id: "sample1",
    prediction: "original",
    anomalies: []
  },
  sample2: {
    id: "sample2",
    prediction: "fake",
    explanation: "The voice has unnatural patterns in pitch variation and formants that suggest AI synthesis.",
    anomalies: [
      {
        feature: "Spectral Centroid",
        description: "Average frequency of the sound spectrum",
        magnitude: 15
      },
      {
        feature: "MFCC Variance",
        description: "Consistency in vocal tract characteristics",
        magnitude: -8
      },
      {
        feature: "Pitch Jitter",
        description: "Cycle-to-cycle variation in pitch",
        magnitude: 23
      },
      {
        feature: "Formant Stability",
        description: "Stability in resonant frequencies",
        magnitude: -12
      },
      {
        feature: "Signal Entropy",
        description: "Predictability of signal patterns",
        magnitude: 7
      }
    ]
  },
  sample3: {
    id: "sample3",
    prediction: "fake",
    explanation: "The sample shows artificial smoothness in frequency transitions and lacks natural microvariation.",
    anomalies: [
      {
        feature: "Harmonic Ratio",
        description: "Balance of harmonic to noise components",
        magnitude: 19
      },
      {
        feature: "Spectral Flux",
        description: "Rate of change of power spectrum",
        magnitude: -14
      },
      {
        feature: "Voice Onset Time",
        description: "Timing of vocal fold activation",
        magnitude: 10
      },
      {
        feature: "Breathiness",
        description: "Amount of audible breath in voice",
        magnitude: -17
      },
      {
        feature: "Temporal Consistency",
        description: "Regularity of timing patterns",
        magnitude: 16
      }
    ]
  },
  sample4: {
    id: "sample4",
    prediction: "original",
    anomalies: []
  },
  sample5: {
    id: "sample5",
    prediction: "fake",
    explanation: "The voice exhibits unusual consistency in energy distribution across frequencies.",
    anomalies: [
      {
        feature: "Spectral Rolloff",
        description: "Frequency below which 85% of energy is concentrated",
        magnitude: 12
      },
      {
        feature: "Shimmer",
        description: "Variation in amplitude between cycles",
        magnitude: -9
      },
      {
        feature: "F0 Contour",
        description: "Pattern of fundamental frequency over time",
        magnitude: 18
      },
      {
        feature: "Spectral Contrast",
        description: "Level difference in adjacent frequency bands",
        magnitude: -11
      },
      {
        feature: "Articulation Rate",
        description: "Speed of speech sound production",
        magnitude: 6
      }
    ]
  },
  sample6: {
    id: "sample6",
    prediction: "original",
    anomalies: []
  },
  sample7: {
    id: "sample7",
    prediction: "original",
    anomalies: []
  },
  sample8: {
    id: "sample8",
    prediction: "fake",
    explanation: "The voice shows unusual patterns in spectral characteristics inconsistent with human speech production.",
    anomalies: [
      {
        feature: "Zero Crossing Rate",
        description: "Frequency of signal sign changes",
        magnitude: 14
      },
      {
        feature: "Formant Bandwidth",
        description: "Width of resonant frequency bands",
        magnitude: -13
      },
      {
        feature: "Spectral Entropy",
        description: "Complexity of spectral distribution",
        magnitude: 20
      },
      {
        feature: "Harmonic Structure",
        description: "Pattern of harmonic frequencies",
        magnitude: -7
      }
    ]
  },
  sample9: {
    id: "sample9",
    prediction: "original",
    anomalies: []
  },
  sample10: {
    id: "sample10",
    prediction: "fake",
    explanation: "The sample displays artificial consistency in certain frequency bands and unnatural transitions.",
    anomalies: [
      {
        feature: "Spectral Flatness",
        description: "Tonality versus noise-like quality",
        magnitude: 16
      },
      {
        feature: "F1-F2 Transitions",
        description: "Movement between first formants",
        magnitude: -15
      },
      {
        feature: "Temporal Modulation",
        description: "Rhythm of amplitude fluctuations",
        magnitude: 11
      },
      {
        feature: "Spectral Tilt",
        description: "Distribution of energy across spectrum",
        magnitude: -8
      }
    ]
  }
};

// Function to simulate API call
export const getDetectionResult = (sampleId: string): Promise<DetectionResult> => {
  return new Promise((resolve, reject) => {
    // Assuming the backend API is hosted at 'http://localhost:8000/explain' or another endpoint
    fetch(`https://cleancommit-voice-clone.hf.space/explain?audio_path=${sampleId}`)
      .then((response) => {
        if (!response.ok) {
          // Handle HTTP errors
          reject(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the data structure returned is in the format expected for DetectionResult
        resolve({
          id: data.id,
          prediction: data.prediction,
          explanation: data.explanation,
          anomalies: data.anomalies || []
        });
      })
      .catch((error) => {
        // Handle network or parsing errors
        reject(`Failed to fetch detection result: ${error}`);
      });
  });
};
