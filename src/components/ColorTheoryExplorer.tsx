import { useState } from "react";
import { Palette, Heart, Zap, Snowflake, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  temperature: "warm" | "cool";
  emotion: string;
  description: string;
  icon: React.ComponentType<any>;
}

const colorPalettes: ColorPalette[] = [
  {
    id: "sunset",
    name: "Sunset Warmth",
    colors: ["hsl(14, 91%, 65%)", "hsl(25, 95%, 53%)", "hsl(45, 93%, 47%)"],
    temperature: "warm",
    emotion: "Energetic & Optimistic",
    description: "Creates feelings of excitement, energy, and happiness. Perfect for call-to-action elements.",
    icon: Sun
  },
  {
    id: "cozy",
    name: "Cozy Embrace",
    colors: ["hsl(16, 25%, 38%)", "hsl(30, 67%, 94%)", "hsl(25, 76%, 31%)"],
    temperature: "warm",
    emotion: "Comfortable & Secure",
    description: "Evokes feelings of comfort, security, and intimacy. Ideal for hospitality brands.",
    icon: Heart
  },
  {
    id: "ocean",
    name: "Ocean Depths",
    colors: ["hsl(200, 100%, 28%)", "hsl(195, 53%, 79%)", "hsl(187, 85%, 43%)"],
    temperature: "cool",
    emotion: "Calm & Professional",
    description: "Promotes trust, stability, and professionalism. Great for corporate communications.",
    icon: Snowflake
  },
  {
    id: "electric",
    name: "Electric Cool",
    colors: ["hsl(210, 100%, 56%)", "hsl(270, 95%, 75%)", "hsl(180, 100%, 50%)"],
    temperature: "cool",
    emotion: "Innovative & Dynamic",
    description: "Suggests innovation, technology, and forward-thinking. Perfect for tech brands.",
    icon: Zap
  }
];

export const ColorTheoryExplorer = () => {
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null);
  const [activeTemperature, setActiveTemperature] = useState<"warm" | "cool" | "all">("all");

  const filteredPalettes = activeTemperature === "all" 
    ? colorPalettes 
    : colorPalettes.filter(p => p.temperature === activeTemperature);

  const getBackgroundGradient = () => {
    if (!selectedPalette) return "bg-gradient-to-br from-background to-muted";
    
    const colors = selectedPalette.colors.join(", ");
    return `bg-gradient-to-br from-[${selectedPalette.colors[0]}] via-[${selectedPalette.colors[1]}] to-[${selectedPalette.colors[2]}]`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Palette className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Color Theory Explorer</h2>
        </div>
        <p className="text-muted-foreground">
          Discover how warm and cool colors impact emotions and user experience
        </p>
      </div>

      {/* Temperature Filter */}
      <div className="flex justify-center gap-2">
        <Button
          variant={activeTemperature === "all" ? "default" : "outline"}
          onClick={() => setActiveTemperature("all")}
          size="sm"
        >
          All Colors
        </Button>
        <Button
          variant={activeTemperature === "warm" ? "default" : "outline"}
          onClick={() => setActiveTemperature("warm")}
          size="sm"
          className="text-warm-primary border-warm-primary/30 hover:bg-warm-primary/10"
        >
          Warm
        </Button>
        <Button
          variant={activeTemperature === "cool" ? "default" : "outline"}
          onClick={() => setActiveTemperature("cool")}
          size="sm"
          className="text-cool-primary border-cool-primary/30 hover:bg-cool-primary/10"
        >
          Cool
        </Button>
      </div>

      {/* Selected Palette Display */}
      {selectedPalette && (
        <div 
          className={`rounded-lg p-8 text-center transition-all duration-500 ${getBackgroundGradient()}`}
          style={{
            background: `linear-gradient(135deg, ${selectedPalette.colors.join(", ")})`
          }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <selectedPalette.icon className="w-5 h-5" />
              <h3 className="text-xl font-semibold text-gray-900">{selectedPalette.name}</h3>
            </div>
            <p className="text-lg font-medium text-gray-800 mb-2">{selectedPalette.emotion}</p>
            <p className="text-sm text-gray-700">{selectedPalette.description}</p>
          </div>
        </div>
      )}

      {/* Color Palette Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPalettes.map((palette) => {
          const Icon = palette.icon;
          return (
            <Card
              key={palette.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedPalette?.id === palette.id 
                  ? "ring-2 ring-primary shadow-lg" 
                  : "hover:shadow-md"
              } ${
                palette.temperature === "warm" 
                  ? "border-warm-primary/30 hover:border-warm-primary/60" 
                  : "border-cool-primary/30 hover:border-cool-primary/60"
              }`}
              onClick={() => setSelectedPalette(palette)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  <CardTitle className="text-lg">{palette.name}</CardTitle>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    palette.temperature === "warm" 
                      ? "bg-warm-primary/20 text-warm-primary" 
                      : "bg-cool-primary/20 text-cool-primary"
                  }`}>
                    {palette.temperature}
                  </span>
                </div>
                <CardDescription className="font-medium">
                  {palette.emotion}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1 mb-3">
                  {palette.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex-1 h-12 rounded border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {palette.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Educational Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="border-warm-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warm-primary">
              <Sun className="w-5 h-5" />
              Warm Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Warm colors (reds, oranges, yellows) are associated with energy, passion, and comfort.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Create feelings of excitement and energy</li>
              <li>• Draw attention and encourage action</li>
              <li>• Perfect for call-to-action buttons</li>
              <li>• Ideal for food, entertainment, and lifestyle brands</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-cool-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cool-primary">
              <Snowflake className="w-5 h-5" />
              Cool Colors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Cool colors (blues, greens, purples) are associated with calm, trust, and professionalism.
            </p>
            <ul className="text-sm space-y-1">
              <li>• Promote feelings of trust and reliability</li>
              <li>• Create calming, peaceful environments</li>
              <li>• Excellent for corporate and healthcare brands</li>
              <li>• Help reduce visual fatigue in interfaces</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};