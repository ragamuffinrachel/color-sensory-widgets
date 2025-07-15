import { ChalkboardMarquee } from "@/components/ChalkboardMarquee";
import { SipSlider } from "@/components/SipSlider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

export default function SipSliderWidget() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-4">
        <Link to="/">
          <Button variant="ghost" className="gap-2 bg-black/20 backdrop-blur-sm text-white hover:bg-black/30">
            <ArrowLeft className="w-4 h-4" />
            Back to Widgets
          </Button>
        </Link>
      </nav>

      {/* Full-screen widget */}
      <SipSlider />

      {/* Widget info overlay (toggleable) */}
      <div className="absolute top-20 right-4 z-50">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-white max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <Coffee className="w-5 h-5" />
            <h3 className="font-semibold">Sip-Slider Widget</h3>
          </div>
          <p className="text-sm opacity-80 mb-3">
            Interactive coffee stirring experience that teaches color temperature and emotional impact through real-time gradient changes.
          </p>
          <div className="text-xs opacity-60">
            Perfect for embedding in eLearning courses about color theory and sensory design.
          </div>
        </div>
      </div>

      {/* Embedding instructions modal overlay */}
      <div className="absolute bottom-4 left-4 z-50">
        <details className="group">
          <summary className="bg-black/20 backdrop-blur-sm rounded-lg p-3 text-white cursor-pointer list-none">
            <span className="text-sm font-medium">📋 Embed Code</span>
          </summary>
          <div className="mt-2 bg-black/30 backdrop-blur-sm rounded-lg p-4 text-white max-w-md">
            <h4 className="font-semibold mb-2 text-sm">Iframe Embed Code:</h4>
            <div className="bg-black/40 p-3 rounded text-xs font-mono overflow-x-auto">
              {`<iframe 
  src="${window.location.href}" 
  width="100%" 
  height="600"
  frameborder="0"
  title="Sip-Slider Color Theory Widget">
</iframe>`}
            </div>
            <p className="text-xs opacity-70 mt-2">
              Recommended minimum height: 600px for optimal experience
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}