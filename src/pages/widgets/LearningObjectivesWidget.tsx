import { ChalkboardMarquee } from "@/components/ChalkboardMarquee";
import { LearningObjectives } from "@/components/LearningObjectives";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function LearningObjectivesWidget() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="p-4 border-b border-border">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Widgets
          </Button>
        </Link>
      </nav>

      {/* Hero Marquee */}
      <ChalkboardMarquee height="tall">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Learning Objectives
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Interactive widget for displaying course learning objectives with an elegant unfolding animation
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <span className="px-3 py-1 bg-warm-primary/20 text-warm-primary rounded-full">
              Color Theory
            </span>
            <span className="px-3 py-1 bg-cool-primary/20 text-cool-primary rounded-full">
              Sensory Learning
            </span>
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full">
              Interactive Design
            </span>
          </div>
        </div>
      </ChalkboardMarquee>

      {/* Widget Demo */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Widget Demo
            </h2>
            <p className="text-muted-foreground">
              Click the button below to reveal the learning objectives with a smooth unfolding animation
            </p>
          </div>

          {/* The actual widget */}
          <LearningObjectives />

          {/* Embedding Instructions */}
          <div className="mt-16 p-6 bg-card border border-border rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Embedding Instructions
            </h3>
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                To embed this widget in your eLearning course, use this iframe:
              </p>
              <div className="bg-muted p-4 rounded font-mono text-muted-foreground overflow-x-auto">
                {`<iframe 
  src="${window.location.href}" 
  width="100%" 
  height="400"
  frameborder="0"
  title="Learning Objectives Widget">
</iframe>`}
              </div>
              <p className="text-muted-foreground text-xs">
                Adjust the height value (400) based on your content needs. The widget is fully responsive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}