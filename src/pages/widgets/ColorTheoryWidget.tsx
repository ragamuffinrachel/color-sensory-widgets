import { ChalkboardMarquee } from "@/components/ChalkboardMarquee";
import { ColorTheoryExplorer } from "@/components/ColorTheoryExplorer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ColorTheoryWidget = () => {
  const embedCode = `<iframe 
  src="${window.location.origin}/widgets/color-theory" 
  width="100%" 
  height="800" 
  frameborder="0"
  title="Color Theory Explorer Widget">
</iframe>`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ChalkboardMarquee height="medium">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Color Theory Explorer
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive tool for exploring warm vs cool colors and their emotional impact
          </p>
          <div className="flex gap-2 justify-center">
            <span className="px-3 py-1 bg-cool-primary/20 text-cool-primary rounded-full text-sm">
              Color Psychology
            </span>
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
              Interactive Learning
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
            <ColorTheoryExplorer />
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
                    <span>Interactive color palette exploration with real-time mood visualization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Filter by warm vs cool color temperatures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Learn emotional associations and practical applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Educational content about color psychology in design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>Fully responsive design for all devices</span>
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

export default ColorTheoryWidget;