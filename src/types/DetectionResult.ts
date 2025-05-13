
export interface Anomaly {
  feature: string;
  description: string;
  magnitude: number;
}

export interface DetectionResult {
  id: string;
  prediction: "original" | "fake";
  explanation?: string;
  anomalies: Anomaly[];
}
