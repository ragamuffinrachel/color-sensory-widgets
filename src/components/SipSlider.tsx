import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SipSliderProps {
  className?: string;
}

export function SipSlider({ className }: SipSliderProps) {
  const [spoonPosition, setSpoonPosition] = useState(0); // 0 to 1 (left to right)
  const [isDragging, setIsDragging] = useState(false);
  const cupRef = useRef<HTMLDivElement>(null);
  const spoonRef = useRef<HTMLDivElement>(null);

  // Convert spoon position to gradient colors
  const getBackgroundGradient = useCallback((position: number) => {
    // Warm colors (left side): deep amber to burnt sienna
    // Cool colors (right side): teal to soft aqua
    const warmStart = "25, 85%, 45%"; // Deep amber
    const warmEnd = "15, 75%, 35%";   // Burnt sienna
    const coolStart = "180, 70%, 45%"; // Teal
    const coolEnd = "190, 60%, 70%";   // Soft aqua

    // Interpolate between warm and cool based on position
    const warmInfluence = 1 - position;
    const coolInfluence = position;

    // Create a gradient that transitions smoothly
    const leftColor = `hsl(${warmStart})`;
    const centerWarm = `hsl(${warmEnd})`;
    const centerCool = `hsl(${coolStart})`;
    const rightColor = `hsl(${coolEnd})`;

    // Position-based gradient with smooth transition
    const gradientPosition = position * 100;
    
    return `linear-gradient(135deg, 
      ${leftColor} 0%, 
      ${centerWarm} ${Math.max(0, gradientPosition - 20)}%, 
      ${centerCool} ${Math.min(100, gradientPosition + 20)}%, 
      ${rightColor} 100%)`;
  }, []);

  // Handle mouse/touch drag events
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !cupRef.current) return;

    const cupRect = cupRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const relativeX = clientX - cupRect.left;
    const cupWidth = cupRect.width;
    
    // Calculate position as percentage, clamped between 0 and 1
    const newPosition = Math.max(0, Math.min(1, relativeX / cupWidth));
    setSpoonPosition(newPosition);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners for drag
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleDragMove);
      document.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Get mood description based on position
  const getMoodDescription = useCallback((position: number) => {
    if (position < 0.25) return "Cozy & Energetic";
    if (position < 0.5) return "Balanced & Warm";
    if (position < 0.75) return "Calm & Refreshing";
    return "Peaceful & Serene";
  }, []);

  // Get temperature description
  const getTemperature = useCallback((position: number) => {
    const warmness = Math.round((1 - position) * 100);
    const coolness = Math.round(position * 100);
    return position < 0.5 
      ? `${warmness}% Warm` 
      : `${coolness}% Cool`;
  }, []);

  return (
    <div 
      className={cn("relative w-full h-screen overflow-hidden transition-all duration-300", className)}
      style={{ 
        background: getBackgroundGradient(spoonPosition)
      }}
    >
      {/* Mood indicator */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="text-center bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 text-white">
          <div className="text-lg font-semibold">
            {getMoodDescription(spoonPosition)}
          </div>
          <div className="text-sm opacity-80">
            {getTemperature(spoonPosition)}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <p className="text-white/80 text-sm bg-black/10 backdrop-blur-sm rounded-lg px-4 py-2">
          Drag the spoon to stir and feel the café's mood change
        </p>
      </div>

      {/* Coffee steam effect */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-8 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${-10 + i * 10}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>

      {/* Coffee cup container */}
      <div 
        ref={cupRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-80 h-20 z-20"
      >
        {/* Coffee cup */}
        <div className="relative w-full h-full">
          {/* Cup body */}
          <div className="absolute bottom-0 w-full h-16 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-3xl border-4 border-amber-800 shadow-lg">
            {/* Coffee surface */}
            <div className="absolute top-2 left-2 right-2 h-3 bg-gradient-to-r from-amber-900 to-amber-800 rounded-full opacity-90">
              {/* Coffee ripples */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full" />
            </div>
          </div>
          
          {/* Cup handle */}
          <div className="absolute right-0 top-4 w-6 h-8 border-4 border-amber-800 rounded-r-full bg-transparent" />
          
          {/* Stirring track visualization */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-amber-600/30 rounded-full" />
        </div>

        {/* Draggable spoon */}
        <div
          ref={spoonRef}
          className={cn(
            "absolute top-1/2 transform -translate-y-1/2 cursor-grab active:cursor-grabbing",
            "transition-transform duration-100 z-30",
            isDragging && "scale-110 drop-shadow-lg"
          )}
          style={{
            left: `${spoonPosition * 100}%`,
            transform: `translateY(-50%) translateX(-50%) rotate(${-15 + spoonPosition * 30}deg)`
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* Spoon */}
          <div className="relative">
            {/* Spoon handle */}
            <div className="w-12 h-1.5 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full shadow-md" />
            {/* Spoon bowl */}
            <div className="absolute -left-2 -top-0.5 w-4 h-3 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full shadow-lg" />
            {/* Highlight */}
            <div className="absolute -left-1 -top-0.5 w-1 h-1 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>

      {/* Color temperature labels */}
      <div className="absolute bottom-32 left-8 z-20">
        <div className="text-white/80 text-sm font-medium bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
          Warm Colors
          <div className="text-xs opacity-70">Energetic • Cozy</div>
        </div>
      </div>
      
      <div className="absolute bottom-32 right-8 z-20">
        <div className="text-white/80 text-sm font-medium bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
          Cool Colors
          <div className="text-xs opacity-70">Calm • Refreshing</div>
        </div>
      </div>
    </div>
  );
}