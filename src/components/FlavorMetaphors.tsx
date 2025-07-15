import { useState, useEffect } from "react";
import { Coffee, CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FlavorPrinciple {
  id: string;
  flavor: string;
  principle: string;
  description: string;
  color: string;
  examples: string[];
}

interface GameState {
  currentFlavor: FlavorPrinciple | null;
  options: FlavorPrinciple[];
  score: number;
  total: number;
  isCorrect: boolean | null;
  gameComplete: boolean;
}

const flavorPrinciples: FlavorPrinciple[] = [
  {
    id: "bitter-contrast",
    flavor: "Bitter",
    principle: "Contrast",
    description: "Just as bitter flavors create sharp, distinct sensations that stand out, contrast in design creates visual tension that draws attention and defines hierarchy.",
    color: "hsl(25, 6%, 20%)",
    examples: ["Dark text on light backgrounds", "Bold headlines vs body text", "Bright accent colors against neutral palettes"]
  },
  {
    id: "sweet-harmony",
    flavor: "Sweet",
    principle: "Harmony",
    description: "Sweet flavors are pleasing and comfortable, just like harmonious design elements that work together seamlessly to create visual unity and flow.",
    color: "hsl(340, 82%, 85%)",
    examples: ["Complementary color schemes", "Consistent typography scales", "Balanced proportions and spacing"]
  },
  {
    id: "umami-balance",
    flavor: "Umami",
    principle: "Balance",
    description: "Umami provides depth and completeness to flavor profiles, similar to how balanced design creates stability and sophisticated visual weight distribution.",
    color: "hsl(45, 29%, 58%)",
    examples: ["Equal visual weight distribution", "Symmetrical and asymmetrical balance", "Proportion between content and white space"]
  }
];

export const FlavorMetaphors = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    currentFlavor: null,
    options: [],
    score: 0,
    total: 0,
    isCorrect: null,
    gameComplete: false
  });
  const [showExplanation, setShowExplanation] = useState(false);

  const initializeGame = () => {
    const shuffled = [...flavorPrinciples].sort(() => Math.random() - 0.5);
    setGameState({
      currentFlavor: shuffled[0],
      options: [...flavorPrinciples].sort(() => Math.random() - 0.5),
      score: 0,
      total: 0,
      isCorrect: null,
      gameComplete: false
    });
    setShowExplanation(false);
  };

  const handleAnswer = (selectedPrinciple: FlavorPrinciple) => {
    const isCorrect = selectedPrinciple.id === gameState.currentFlavor?.id;
    const newScore = isCorrect ? gameState.score + 1 : gameState.score;
    const newTotal = gameState.total + 1;

    setGameState(prev => ({
      ...prev,
      score: newScore,
      total: newTotal,
      isCorrect,
      gameComplete: newTotal >= flavorPrinciples.length
    }));

    setShowExplanation(true);

    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: `${gameState.currentFlavor?.flavor} perfectly matches ${selectedPrinciple.principle}!`,
      });
    } else {
      toast({
        title: "Not quite right",
        description: `Try thinking about how ${gameState.currentFlavor?.flavor} relates to design principles.`,
        variant: "destructive"
      });
    }
  };

  const nextQuestion = () => {
    const remaining = flavorPrinciples.filter(fp => 
      !gameState.currentFlavor || fp.id !== gameState.currentFlavor.id
    );
    
    if (remaining.length > 0) {
      const next = remaining[Math.floor(Math.random() * remaining.length)];
      setGameState(prev => ({
        ...prev,
        currentFlavor: next,
        options: [...flavorPrinciples].sort(() => Math.random() - 0.5),
        isCorrect: null
      }));
      setShowExplanation(false);
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  useEffect(() => {
    initializeGame();
  }, []);

  if (gameState.gameComplete) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 text-center space-y-6">
        <div className="space-y-4">
          <Trophy className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-3xl font-bold text-foreground">Game Complete!</h2>
          <p className="text-xl text-muted-foreground">
            You scored {gameState.score} out of {gameState.total}
          </p>
          
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">What You've Learned</h3>
            <div className="grid gap-4">
              {flavorPrinciples.map((fp) => (
                <div key={fp.id} className="text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: fp.color }}
                    />
                    <span className="font-medium">{fp.flavor} = {fp.principle}</span>
                  </div>
                  <p className="text-sm text-muted-foreground ml-7">
                    {fp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={resetGame} className="mt-6">
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Coffee className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Flavor Metaphors</h2>
        </div>
        <p className="text-muted-foreground">
          Match taste sensations to design principles
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <span>Score: {gameState.score}/{gameState.total}</span>
          <span>Progress: {gameState.total}/{flavorPrinciples.length}</span>
        </div>
      </div>

      {gameState.currentFlavor && (
        <>
          {/* Current Flavor */}
          <Card className="text-center">
            <CardHeader>
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: gameState.currentFlavor.color }}
              >
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">{gameState.currentFlavor.flavor}</CardTitle>
              <CardDescription>
                Which design principle does this flavor represent?
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Options */}
          {!showExplanation && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gameState.options.map((principle) => (
                <Card
                  key={principle.id}
                  className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  onClick={() => handleAnswer(principle)}
                >
                  <CardContent className="p-6 text-center">
                    <div 
                      className="w-12 h-12 rounded-full mx-auto mb-3"
                      style={{ backgroundColor: principle.color }}
                    />
                    <h3 className="font-semibold text-lg mb-2">{principle.principle}</h3>
                    <p className="text-sm text-muted-foreground">
                      Click to select
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Explanation */}
          {showExplanation && gameState.currentFlavor && (
            <Card className={`${gameState.isCorrect ? 'border-green-500' : 'border-red-500'}`}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  {gameState.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )}
                  <CardTitle>
                    {gameState.currentFlavor.flavor} = {gameState.currentFlavor.principle}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{gameState.currentFlavor.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2">Examples in Design:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {gameState.currentFlavor.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>

                {gameState.total < flavorPrinciples.length ? (
                  <Button onClick={nextQuestion} className="w-full">
                    Next Flavor
                  </Button>
                ) : (
                  <Button onClick={() => setGameState(prev => ({ ...prev, gameComplete: true }))} className="w-full">
                    View Results
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};