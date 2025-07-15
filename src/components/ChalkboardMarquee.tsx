import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChalkboardMarqueeProps {
  children: ReactNode;
  className?: string;
  height?: "tall" | "medium" | "short";
}

export function ChalkboardMarquee({ 
  children, 
  className,
  height = "tall"
}: ChalkboardMarqueeProps) {
  const heightClasses = {
    tall: "h-80 lg:h-96",
    medium: "h-64 lg:h-72", 
    short: "h-48 lg:h-56"
  };

  return (
    <div className={cn(
      "relative overflow-hidden bg-gradient-to-b from-background to-card",
      "border-b border-border shadow-lg",
      heightClasses[height],
      className
    )}>
      {/* Chalkboard texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center p-8">
        <div className="text-center max-w-4xl mx-auto">
          {children}
        </div>
      </div>

      {/* Chalk dust effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chalk-dust to-transparent opacity-30" />
    </div>
  );
}