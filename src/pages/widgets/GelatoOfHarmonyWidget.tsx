import { ChalkboardMarquee } from "@/components/ChalkboardMarquee";
import { GelatoOfHarmony } from "@/components/GelatoOfHarmony";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const GelatoOfHarmonyWidget = () => {
  const embedCode = `<iframe 
  src="${window.location.origin}/widgets/gelato-harmony" 
  width="100%" 
  height="700" 
  frameborder="0"
  title="Gelato of Harmony Widget">
</iframe>`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ChalkboardMarquee height="medium">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Gelato of Harmony
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how scents connect to color harmony rules through interactive spice exploration
          </p>
          <div className="flex gap-2 justify-center">
            <span className="px-3 py-1 bg-warm-primary/20 text-warm-primary rounded-full text-sm">
              Sensory Learning
            </span>
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
              Color Harmony
            </span>
          </div>
        </div>
      </ChalkboardMarquee>

      {/* Widget Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="mb-6">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Widgets
              </Button>
            </Link>
          </div>

          {/* Main Widget */}
          <div className="mb-12 bg-card border border-border rounded-lg p-6">
            <GelatoOfHarmony />
          </div>

          {/* Embedding Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Embed This Widget
                </CardTitle>
                <CardDescription>
                  Copy and paste this code into your eLearning platform or website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm text-muted-foreground whitespace-pre-wrap break-all">
                    {embedCode}
                  </code>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => navigator.clipboard.writeText(embedCode)}
                >
                  Copy Embed Code
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Widget Features
                </CardTitle>
                <CardDescription>
                  What learners will experience with this widget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Interactive spice rack with hover/tap animations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Visual connections between scents and color harmony rules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Real-time color palette demonstrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Detailed explanations of design principles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Mobile-responsive touch interactions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GelatoOfHarmonyWidget;