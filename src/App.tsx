import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LearningObjectivesWidget from "./pages/widgets/LearningObjectivesWidget";
import SipSliderWidget from "./pages/widgets/SipSliderWidget";
import ColorTheoryWidget from "./pages/widgets/ColorTheoryWidget";
import FlavorMetaphorsWidget from "./pages/widgets/FlavorMetaphorsWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/widgets/learning-objectives" element={<LearningObjectivesWidget />} />
          <Route path="/widgets/sip-slider" element={<SipSliderWidget />} />
          <Route path="/widgets/color-theory" element={<ColorTheoryWidget />} />
          <Route path="/widgets/flavor-metaphors" element={<FlavorMetaphorsWidget />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
