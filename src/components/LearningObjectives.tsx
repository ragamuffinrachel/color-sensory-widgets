import { useState } from "react";
import { ChevronDown, Target, Palette, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Objective {
  id: string;
  text: string;
  icon: React.ElementType;
  colorType: "warm" | "cool" | "neutral";
}

const objectives: Objective[] = [
  {
    id: "emotional-impact",
    text: "Identify the emotional impact of warm vs. cool hues.",
    icon: Palette,
    colorType: "warm"
  },
  {
    id: "flavor-metaphors", 
    text: "Match flavor metaphors (bitter, sweet, umami) to design principles (contrast, harmony, balance).",
    icon: Coffee,
    colorType: "neutral"
  },
  {
    id: "color-palette",
    text: "Create a balanced 3-color palette that communicates a given mood.",
    icon: Target,
    colorType: "cool"
  }
];

export function LearningObjectives() {
  const [isOpen, setIsOpen] = useState(false);

  const getObjectiveStyles = (colorType: string) => {
    switch (colorType) {
      case "warm":
        return "border-l-warm-primary bg-warm-primary/5 hover:bg-warm-primary/10";
      case "cool":
        return "border-l-cool-primary bg-cool-primary/5 hover:bg-cool-primary/10";
      default:
        return "border-l-accent bg-accent/5 hover:bg-accent/10";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className={cn(
          "w-full justify-between text-left p-6 h-auto",
          "bg-card hover:bg-card/80 border-border",
          "transition-all duration-300 group",
          isOpen && "rounded-b-none shadow-glow"
        )}
      >
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Learning Objectives
            </h3>
            <p className="text-sm text-muted-foreground">
              What you'll master in this color theory journey
            </p>
          </div>
        </div>
        <ChevronDown className={cn(
          "w-5 h-5 text-muted-foreground transition-transform duration-300",
          isOpen && "rotate-180"
        )} />
      </Button>

      {/* Unfolding Menu */}
      <div className={cn(
        "overflow-hidden transition-all duration-500 ease-out",
        "bg-card border-x border-b border-border rounded-b-lg",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <div
                  key={objective.id}
                  className={cn(
                    "relative p-4 rounded-lg border-l-4 transition-all duration-300",
                    "animate-chalk-write",
                    getObjectiveStyles(objective.colorType)
                  )}
                  style={{
                    animationDelay: isOpen ? `${index * 150}ms` : "0ms",
                    animationFillMode: "both"
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Icon className="w-5 h-5 text-current opacity-80" />
                    </div>
                    <p className="text-foreground leading-relaxed">
                      {objective.text}
                    </p>
                  </div>
                  
                  {/* Decorative number */}
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-current/10 flex items-center justify-center">
                    <span className="text-xs font-medium opacity-60">
                      {index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Progress through these objectives as you learn</span>
              <div className="flex gap-1">
                {objectives.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-muted transition-colors duration-300"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}