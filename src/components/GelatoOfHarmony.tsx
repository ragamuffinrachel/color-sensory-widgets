import { useState } from "react";
import { Sparkles } from "lucide-react";

interface SpiceJar {
  id: string;
  name: string;
  scent: string;
  colorRule: string;
  description: string;
  colors: string[];
  position: { x: number; y: number };
  gifUrl: string;
}

const spiceJars: SpiceJar[] = [
  {
    id: "vanilla",
    name: "Vanilla",
    scent: "Sweet & Comforting",
    colorRule: "Monochromatic Creams",
    description: "Just like vanilla's warm, enveloping sweetness, monochromatic color schemes create comfortable, unified experiences that feel safe and inviting.",
    colors: ["#FDF6E3", "#F5E6C3", "#EDD5A3", "#E5C583"],
    position: { x: 15, y: 25 },
    gifUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop"
  },
  {
    id: "cinnamon", 
    name: "Cinnamon",
    scent: "Warm & Energizing",
    colorRule: "Analogous Reds",
    description: "Cinnamon's fiery warmth mirrors analogous color schemes—neighboring colors that flow together like spice blending into warmth.",
    colors: ["#E74C3C", "#F39C12", "#D35400", "#C0392B"],
    position: { x: 65, y: 25 },
    gifUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=200&h=200&fit=crop"
  },
  {
    id: "mint",
    name: "Mint", 
    scent: "Fresh & Cooling",
    colorRule: "Complementary Blues",
    description: "Mint's refreshing contrast is like complementary colors—opposites that enhance each other, creating vibrant, balanced tension.",
    colors: ["#3498DB", "#F39C12", "#2ECC71", "#E67E22"],
    position: { x: 15, y: 75 },
    gifUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop"
  },
  {
    id: "chili",
    name: "Chili",
    scent: "Bold & Intense", 
    colorRule: "Triadic Spice",
    description: "Chili's bold intensity reflects triadic color schemes—three evenly spaced colors that create vibrant, dynamic compositions full of energy.",
    colors: ["#E74C3C", "#F1C40F", "#9B59B6", "#E74C3C"],
    position: { x: 65, y: 75 },
    gifUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=200&h=200&fit=crop"
  }
];

export const GelatoOfHarmony = () => {
  const [activeJar, setActiveJar] = useState<SpiceJar | null>(null);
  const [hoveredJar, setHoveredJar] = useState<string | null>(null);

  const handleJarInteraction = (jar: SpiceJar) => {
    setActiveJar(activeJar?.id === jar.id ? null : jar);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Gelato of Harmony</h2>
        </div>
        <p className="text-muted-foreground">
          Discover how scents connect to color harmony rules through interactive exploration
        </p>
      </div>

      {/* Main Interaction Area */}
      <div className="relative">
        {/* Spice Rack Background */}
        <div className="relative bg-gradient-to-b from-amber-100 to-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl p-8 min-h-[400px] border-2 border-amber-300/50">
          {/* Shelf Lines */}
          <div className="absolute inset-x-8 top-1/2 h-1 bg-amber-600/30 rounded"></div>
          <div className="absolute inset-x-8 top-1/4 h-1 bg-amber-600/30 rounded"></div>
          <div className="absolute inset-x-8 top-3/4 h-1 bg-amber-600/30 rounded"></div>

          {/* Spice Jars */}
          {spiceJars.map((jar) => (
            <div
              key={jar.id}
              className={`absolute cursor-pointer transition-all duration-300 ${
                hoveredJar === jar.id ? 'scale-110 z-20' : 'z-10'
              }`}
              style={{
                left: `${jar.position.x}%`,
                top: `${jar.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleJarInteraction(jar)}
              onMouseEnter={() => setHoveredJar(jar.id)}
              onMouseLeave={() => setHoveredJar(null)}
            >
              {/* Jar Container */}
              <div className="relative">
                {/* Jar Body */}
                <div 
                  className="w-16 h-20 rounded-lg border-2 border-amber-700/50 shadow-lg transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${jar.colors[0]}, ${jar.colors[1]})`
                  }}
                >
                  {/* Jar Lid */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-amber-800 rounded-full border border-amber-900"></div>
                  
                  {/* Label */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/80 px-2 py-1 rounded text-xs font-medium text-gray-800">
                    {jar.name}
                  </div>
                </div>

                {/* Hover GIF Preview */}
                {hoveredJar === jar.id && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="bg-white rounded-lg shadow-xl p-2 border-2 border-primary/20">
                      <img 
                        src={jar.gifUrl} 
                        alt={`${jar.name} animation`}
                        className="w-12 h-12 rounded object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Sparkle Effect on Hover */}
                {hoveredJar === jar.id && (
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Active Jar Details */}
        {activeJar && (
          <div className="mt-6 bg-card border border-border rounded-lg p-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Scent Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={activeJar.gifUrl} 
                    alt={`${activeJar.name} visual`}
                    className="w-16 h-16 rounded-lg object-cover border-2 border-primary/20"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{activeJar.name}</h3>
                    <p className="text-sm text-muted-foreground">{activeJar.scent}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-primary mb-2">{activeJar.colorRule}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeJar.description}
                  </p>
                </div>
              </div>

              {/* Right: Color Palette */}
              <div className="space-y-4">
                <h4 className="font-medium">Color Harmony Example</h4>
                <div className="grid grid-cols-4 gap-2">
                  {activeJar.colors.map((color, index) => (
                    <div key={index} className="space-y-2">
                      <div 
                        className="w-full h-16 rounded-lg border border-border"
                        style={{ backgroundColor: color }}
                      ></div>
                      <div className="text-xs text-center font-mono text-muted-foreground">
                        {color}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Design Tip:</strong> Use this {activeJar.colorRule.toLowerCase()} approach when you want to evoke the same emotional response as {activeJar.scent.toLowerCase()}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!activeJar && (
          <div className="mt-6 text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Hover or tap</strong> the spice jars above to discover how scents connect to color harmony rules
            </p>
          </div>
        )}
      </div>
    </div>
  );
};