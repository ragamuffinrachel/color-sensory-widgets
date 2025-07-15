import { useState, useRef } from "react";
import { Coffee, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ColorBottle {
  id: string;
  label: string;
  hex: string;
  type: "base" | "accent" | "neutral";
  color: string;
}

interface PaletteMood {
  id: string;
  name: string;
  description: string;
  requiredColors: {
    base: string;
    accent: string;
    neutral: string;
  };
}

const colorBottles: ColorBottle[] = [
  { id: "red-base", label: "#E74C3C", hex: "#E74C3C", type: "base", color: "#E74C3C" },
  { id: "orange-accent", label: "#F39C12", hex: "#F39C12", type: "accent", color: "#F39C12" },
  { id: "brown-neutral", label: "#8B4513", hex: "#8B4513", type: "neutral", color: "#8B4513" },
  { id: "blue-base", label: "#3498DB", hex: "#3498DB", type: "base", color: "#3498DB" },
  { id: "purple-accent", label: "#9B59B6", hex: "#9B59B6", type: "accent", color: "#9B59B6" },
  { id: "gray-neutral", label: "#7F8C8D", hex: "#7F8C8D", type: "neutral", color: "#7F8C8D" },
  { id: "green-base", label: "#27AE60", hex: "#27AE60", type: "base", color: "#27AE60" },
  { id: "yellow-accent", label: "#F1C40F", hex: "#F1C40F", type: "accent", color: "#F1C40F" },
  { id: "beige-neutral", label: "#D2B48C", hex: "#D2B48C", type: "neutral", color: "#D2B48C" }
];

const paletteMoods: PaletteMood[] = [
  {
    id: "energetic-autumn",
    name: "Energetic Autumn",
    description: "Warm, vibrant, and full of life - perfect for active lifestyle brands",
    requiredColors: {
      base: "#E74C3C",
      accent: "#F39C12", 
      neutral: "#8B4513"
    }
  },
  {
    id: "serene-ocean",
    name: "Serene Ocean",
    description: "Calm, trustworthy, and professional - ideal for healthcare or finance",
    requiredColors: {
      base: "#3498DB",
      accent: "#9B59B6",
      neutral: "#7F8C8D"
    }
  },
  {
    id: "natural-growth",
    name: "Natural Growth",
    description: "Fresh, organic, and sustainable - great for eco-friendly brands",
    requiredColors: {
      base: "#27AE60",
      accent: "#F1C40F",
      neutral: "#D2B48C"
    }
  }
];

export const PalettePairingLab = () => {
  const { toast } = useToast();
  const [selectedBottles, setSelectedBottles] = useState<{
    base: ColorBottle | null;
    accent: ColorBottle | null;
    neutral: ColorBottle | null;
  }>({
    base: null,
    accent: null,
    neutral: null
  });
  const [currentMood, setCurrentMood] = useState<PaletteMood>(paletteMoods[0]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [steamAnimation, setSteamAnimation] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent, bottle: ColorBottle) => {
    e.dataTransfer.setData("application/json", JSON.stringify(bottle));
  };

  const handleDrop = (e: React.DragEvent, slotType: "base" | "accent" | "neutral") => {
    e.preventDefault();
    const bottleData = JSON.parse(e.dataTransfer.getData("application/json")) as ColorBottle;
    
    setSelectedBottles(prev => ({
      ...prev,
      [slotType]: bottleData
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const checkPalette = () => {
    if (!selectedBottles.base || !selectedBottles.accent || !selectedBottles.neutral) {
      toast({
        title: "Incomplete palette",
        description: "Please fill all three slots before checking your palette.",
        variant: "destructive"
      });
      return;
    }

    const isCorrect = 
      selectedBottles.base.hex === currentMood.requiredColors.base &&
      selectedBottles.accent.hex === currentMood.requiredColors.accent &&
      selectedBottles.neutral.hex === currentMood.requiredColors.neutral;

    if (isCorrect) {
      setIsSuccess(true);
      setSteamAnimation(true);
      toast({
        title: "Perfect blend! ☕",
        description: `You've created the ${currentMood.name} mood palette!`,
      });
    } else {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setSelectedBottles({ base: null, accent: null, neutral: null });
      }, 600);
      toast({
        title: "Not quite right",
        description: "The colors don't create the target mood. Try a different combination!",
        variant: "destructive"
      });
    }
  };

  const resetPalette = () => {
    setSelectedBottles({ base: null, accent: null, neutral: null });
    setIsSuccess(false);
    setSteamAnimation(false);
    setCurrentMood(paletteMoods[Math.floor(Math.random() * paletteMoods.length)]);
  };

  const removeBottle = (slotType: "base" | "accent" | "neutral") => {
    setSelectedBottles(prev => ({
      ...prev,
      [slotType]: null
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Coffee className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Palette Pairing Lab</h2>
        </div>
        <p className="text-muted-foreground">
          Drag syrup bottles into the latte cup to create the perfect color mood
        </p>
      </div>

      {/* Target Mood */}
      <div className="bg-card border border-border rounded-lg p-4 text-center">
        <h3 className="text-xl font-semibold mb-2">Target Mood: {currentMood.name}</h3>
        <p className="text-sm text-muted-foreground">{currentMood.description}</p>
      </div>

      {/* Latte Cup Area */}
      <div className="relative flex justify-center">
        <div className="relative">
          {/* Cup SVG */}
          <svg width="300" height="350" viewBox="0 0 300 350" className="drop-shadow-lg">
            {/* Cup Body */}
            <path
              d="M75 100 L75 280 Q75 320 110 320 L190 320 Q225 320 225 280 L225 100 Z"
              fill="#F5F5F5"
              stroke="#D1D5DB"
              strokeWidth="2"
            />
            
            {/* Handle */}
            <path
              d="M225 150 Q260 150 260 185 Q260 220 225 220"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="3"
            />

            {/* Cup Content - Color Mixing Area */}
            {selectedBottles.base && (
              <rect
                x="85"
                y="280"
                width="130"
                height="30"
                fill={selectedBottles.base.color}
                opacity="0.8"
              />
            )}
            {selectedBottles.accent && (
              <rect
                x="85"
                y="250"
                width="130"
                height="30"
                fill={selectedBottles.accent.color}
                opacity="0.7"
              />
            )}
            {selectedBottles.neutral && (
              <rect
                x="85"
                y="220"
                width="130"
                height="30"
                fill={selectedBottles.neutral.color}
                opacity="0.6"
              />
            )}

            {/* Steam Animation */}
            {steamAnimation && (
              <g className="animate-pulse">
                <circle cx="130" cy="90" r="3" fill="#E5E7EB" opacity="0.6">
                  <animate attributeName="cy" values="90;70;90" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="85" r="2" fill="#E5E7EB" opacity="0.5">
                  <animate attributeName="cy" values="85;65;85" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="170" cy="88" r="2.5" fill="#E5E7EB" opacity="0.4">
                  <animate attributeName="cy" values="88;68;88" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
              </g>
            )}
          </svg>

          {/* Drop Zones */}
          <div className="absolute inset-0">
            {/* Base Drop Zone */}
            <div
              className={`absolute border-2 border-dashed rounded-lg transition-all duration-300 ${
                selectedBottles.base ? 'border-transparent' : 'border-warm-primary/50 hover:border-warm-primary'
              } ${isShaking ? 'animate-bounce' : ''}`}
              style={{ left: '85px', top: '280px', width: '130px', height: '30px' }}
              onDrop={(e) => handleDrop(e, 'base')}
              onDragOver={handleDragOver}
              onClick={() => selectedBottles.base && removeBottle('base')}
            >
              {!selectedBottles.base && (
                <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                  Base Color
                </div>
              )}
            </div>

            {/* Accent Drop Zone */}
            <div
              className={`absolute border-2 border-dashed rounded-lg transition-all duration-300 ${
                selectedBottles.accent ? 'border-transparent' : 'border-accent/50 hover:border-accent'
              } ${isShaking ? 'animate-bounce' : ''}`}
              style={{ left: '85px', top: '250px', width: '130px', height: '30px' }}
              onDrop={(e) => handleDrop(e, 'accent')}
              onDragOver={handleDragOver}
              onClick={() => selectedBottles.accent && removeBottle('accent')}
            >
              {!selectedBottles.accent && (
                <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                  Accent Color
                </div>
              )}
            </div>

            {/* Neutral Drop Zone */}
            <div
              className={`absolute border-2 border-dashed rounded-lg transition-all duration-300 ${
                selectedBottles.neutral ? 'border-transparent' : 'border-cool-primary/50 hover:border-cool-primary'
              } ${isShaking ? 'animate-bounce' : ''}`}
              style={{ left: '85px', top: '220px', width: '130px', height: '30px' }}
              onDrop={(e) => handleDrop(e, 'neutral')}
              onDragOver={handleDragOver}
              onClick={() => selectedBottles.neutral && removeBottle('neutral')}
            >
              {!selectedBottles.neutral && (
                <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                  Neutral Color
                </div>
              )}
            </div>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg animate-fade-in">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">{currentMood.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button 
          onClick={checkPalette}
          disabled={isSuccess}
          className="min-w-32"
        >
          Check Blend
        </Button>
        <Button 
          variant="outline" 
          onClick={resetPalette}
          className="min-w-32"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          New Challenge
        </Button>
      </div>

      {/* Color Bottles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center">Syrup Bottles</h3>
        <div className="grid grid-cols-3 md:grid-cols-9 gap-4 justify-items-center">
          {colorBottles.map((bottle) => (
            <div
              key={bottle.id}
              draggable
              onDragStart={(e) => handleDragStart(e, bottle)}
              className="cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
            >
              {/* Bottle SVG */}
              <svg width="40" height="80" viewBox="0 0 40 80" className="drop-shadow-md">
                {/* Bottle Body */}
                <rect
                  x="8"
                  y="20"
                  width="24"
                  height="50"
                  rx="4"
                  fill={bottle.color}
                  stroke="#374151"
                  strokeWidth="1"
                />
                
                {/* Bottle Neck */}
                <rect
                  x="14"
                  y="10"
                  width="12"
                  height="15"
                  fill={bottle.color}
                  stroke="#374151"
                  strokeWidth="1"
                />
                
                {/* Bottle Cap */}
                <rect
                  x="12"
                  y="5"
                  width="16"
                  height="8"
                  rx="2"
                  fill="#6B7280"
                  stroke="#374151"
                  strokeWidth="1"
                />
                
                {/* Label */}
                <rect
                  x="10"
                  y="35"
                  width="20"
                  height="20"
                  fill="white"
                  stroke="#D1D5DB"
                  strokeWidth="0.5"
                  opacity="0.9"
                />
              </svg>
              
              {/* Hex Code Label */}
              <div className="text-xs text-center mt-1 font-mono">
                {bottle.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground">
          <strong>Drag</strong> bottles into the cup slots, then click <strong>"Check Blend"</strong> to see if your combination creates the target mood!
        </p>
      </div>
    </div>
  );
};