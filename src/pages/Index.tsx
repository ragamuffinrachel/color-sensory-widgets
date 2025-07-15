import { ChalkboardMarquee } from "@/components/ChalkboardMarquee";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Palette, Coffee, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const widgets = [
  {
    id: "learning-objectives",
    title: "Learning Objectives",
    description: "Interactive unfolding menu displaying course learning objectives with smooth animations",
    icon: Target,
    color: "warm",
    path: "/widgets/learning-objectives",
    status: "ready"
  },
  {
    id: "sip-slider",
    title: "Sip-Slider",
    description: "Interactive coffee stirring experience with real-time gradient changes to explore color temperature",
    icon: Coffee,
    color: "warm",
    path: "/widgets/sip-slider",
    status: "ready"
  },
  {
    id: "color-theory",
    title: "Color Theory Explorer", 
    description: "Interactive tool for exploring warm vs cool colors and their emotional impact",
    icon: Palette,
    color: "cool", 
    path: "/widgets/color-theory",
    status: "ready"
  },
  {
    id: "flavor-metaphors",
    title: "Flavor Metaphors",
    description: "Match taste sensations to design principles through interactive gameplay",
    icon: Coffee,
    color: "neutral",
    path: "/widgets/flavor-metaphors", 
    status: "ready"
  },
  {
    id: "gelato-harmony",
    title: "Gelato of Harmony",
    description: "Hover spice jars to discover how scents connect to color harmony rules",
    icon: Coffee,
    color: "warm",
    path: "/widgets/gelato-harmony",
    status: "ready"
  },
  {
    id: "palette-pairing",
    title: "Palette Pairing Lab", 
    description: "Drag syrup bottles into a latte cup to create perfect color moods",
    icon: Palette,
    color: "cool",
    path: "/widgets/palette-pairing",
    status: "ready"
  }
];

const Index = () => {
  const getCardStyles = (color: string) => {
    switch (color) {
      case "warm":
        return "border-warm-primary/30 hover:border-warm-primary/60 hover:bg-warm-primary/5";
      case "cool":
        return "border-cool-primary/30 hover:border-cool-primary/60 hover:bg-cool-primary/5";
      default:
        return "border-accent/30 hover:border-accent/60 hover:bg-accent/5";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ChalkboardMarquee height="tall">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-primary animate-glow-pulse" />
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground">
              eLearning Widgets
            </h1>
          </div>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Interactive widgets for a micro-course blending color theory with sensory play
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <span className="px-4 py-2 bg-warm-primary/20 text-warm-primary rounded-full">
              Color Theory
            </span>
            <span className="px-4 py-2 bg-cool-primary/20 text-cool-primary rounded-full">
              Sensory Learning
            </span>
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full">
              Interactive Design
            </span>
          </div>
        </div>
      </ChalkboardMarquee>

      {/* Widgets Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Available Widgets
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each widget is designed to be embedded into your eLearning course platform. 
              Click to preview and get embedding instructions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {widgets.map((widget) => {
              const Icon = widget.icon;
              return (
                <Card
                  key={widget.id}
                  className={`group transition-all duration-300 ${getCardStyles(widget.color)} ${
                    widget.status === "ready" 
                      ? "hover:scale-105 hover:shadow-lg cursor-pointer" 
                      : "opacity-60 cursor-not-allowed"
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <Icon className="w-8 h-8 text-current opacity-80" />
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        widget.status === "ready" 
                          ? "bg-primary/20 text-primary" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {widget.status === "ready" ? "Ready" : "Coming Soon"}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-current transition-colors">
                      {widget.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {widget.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {widget.status === "ready" ? (
                      <Link to={widget.path}>
                        <Button className="w-full group-hover:scale-105 transition-transform">
                          View Widget
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="w-full">
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Information Section */}
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto p-8 bg-card border border-border rounded-lg">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                About This Project
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                This collection of interactive widgets is designed for an innovative eLearning course 
                that combines color theory education with sensory play experiences. Each widget is 
                fully responsive and can be embedded into any learning management system or course platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
