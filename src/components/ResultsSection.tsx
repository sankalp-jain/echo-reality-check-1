
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, CircleX, ChartLine, Waveform, ChartBar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetectionResult } from "@/types/DetectionResult";

interface ResultsSectionProps {
  result: DetectionResult | null;
  isLoading: boolean;
}

export function ResultsSection({ result, isLoading }: ResultsSectionProps) {
  const [activeTab, setActiveTab] = useState("waveform");
  const [anomalyData, setAnomalyData] = useState<{ name: string, value: number }[]>([]);
  
  useEffect(() => {
    if (result && result.prediction === "fake") {
      setAnomalyData(result.anomalies.map(a => ({
        name: a.feature,
        value: a.magnitude
      })));
    }
  }, [result]);

  if (isLoading) {
    return (
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Analyzing Audio Sample...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-8">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-12 bg-primary rounded-full animate-wave"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center space-x-2">
            {result.prediction === "original" ? (
              <CircleCheck className="w-6 h-6 text-success" />
            ) : (
              <CircleX className="w-6 h-6 text-destructive" />
            )}
            <CardTitle>
              {result.prediction === "original" ? "Original Voice" : "Fake Voice"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {result.prediction === "fake" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Why this voice is detected as fake:</h3>
                <p>{result.explanation}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Anomalous Audio Features:</h3>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {result.anomalies.map((anomaly, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                      <div className="flex flex-col">
                        <span className="font-medium">{anomaly.feature}</span>
                        <span className="text-sm text-muted-foreground">{anomaly.description}</span>
                      </div>
                      <div className={`text-lg font-bold ${anomaly.magnitude > 0 ? 'text-destructive' : 'text-success'}`}>
                        {anomaly.magnitude > 0 ? '+' : ''}{anomaly.magnitude}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Visual Representation:</h3>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 w-full mb-4">
                    <TabsTrigger value="waveform">
                      <Waveform className="w-4 h-4 mr-1" /> Waveform
                    </TabsTrigger>
                    <TabsTrigger value="spectrogram">
                      <ChartLine className="w-4 h-4 mr-1" /> Spectrogram
                    </TabsTrigger>
                    <TabsTrigger value="features">
                      <ChartBar className="w-4 h-4 mr-1" /> Features
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="waveform" className="h-64 border rounded-md p-4">
                    <div className="h-full flex items-center justify-center">
                      <div className="w-full h-32 relative">
                        {Array.from({ length: 100 }).map((_, i) => {
                          const height = Math.sin(i * 0.2) * 25 + (Math.random() * 10);
                          return (
                            <div 
                              key={i} 
                              className="absolute bg-primary"
                              style={{
                                height: `${Math.abs(height)}px`,
                                width: '3px',
                                left: `${i * 5}px`,
                                bottom: height > 0 ? '50%' : 'auto',
                                top: height <= 0 ? '50%' : 'auto',
                                opacity: 0.7
                              }}
                            />
                          );
                        })}
                        <div className="absolute w-full h-[1px] bg-muted-foreground top-1/2"></div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="spectrogram" className="h-64 border rounded-md p-4">
                    <div className="h-full flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-primary/5 via-primary/30 to-primary/10 rounded-md overflow-hidden">
                        {Array.from({ length: 20 }).map((_, y) => (
                          <div key={y} className="flex h-[5%]">
                            {Array.from({ length: 40 }).map((_, x) => {
                              const intensity = Math.random();
                              return (
                                <div 
                                  key={`${x}-${y}`} 
                                  className="w-[2.5%] h-full" 
                                  style={{ 
                                    background: `rgba(0, 123, 255, ${intensity})`,
                                  }}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="features" className="h-64 border rounded-md p-4">
                    <div className="h-full flex items-end justify-around">
                      {anomalyData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center w-1/6">
                          <div 
                            className={`w-full ${Math.abs(item.value) > 10 ? 'bg-destructive' : 'bg-primary'}`}
                            style={{ 
                              height: `${Math.min(Math.abs(item.value) * 2, 80)}%`,
                              transition: 'height 0.5s ease-out' 
                            }}
                          ></div>
                          <div className="text-xs mt-2 text-center font-medium">{item.name}</div>
                          <div className={`text-xs ${item.value > 10 ? 'text-destructive' : ''}`}>
                            {item.value}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
          
          {result.prediction === "original" && (
            <div className="py-4 text-center">
              <p className="text-success text-lg mb-4">
                This voice sample appears to be genuine.
              </p>
              <p>
                Our analysis shows that this audio contains natural voice characteristics 
                and does not exhibit anomalies typically found in AI-generated voices.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
