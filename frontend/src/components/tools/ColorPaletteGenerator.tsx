import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Palette, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const talusPalettes = [
  {
    name: "Classic Talus",
    colors: ["#7DD3FC", "#F0ABFC", "#FEF08A"],
    gradient: "linear-gradient(135deg, #7DD3FC 0%, #F0ABFC 50%, #FEF08A 100%)"
  },
  {
    name: "Pond Vibes",
    colors: ["#67E8F9", "#A78BFA", "#34D399"],
    gradient: "linear-gradient(135deg, #67E8F9 0%, #A78BFA 50%, #34D399 100%)"
  },
  {
    name: "Loreweave Glow",
    colors: ["#60A5FA", "#EC4899", "#FBBF24"],
    gradient: "linear-gradient(135deg, #60A5FA 0%, #EC4899 50%, #FBBF24 100%)"
  },
  {
    name: "Lilypad Dream",
    colors: ["#22D3EE", "#D946EF", "#84CC16"],
    gradient: "linear-gradient(135deg, #22D3EE 0%, #D946EF 50%, #84CC16 100%)"
  }
];

export const ColorPaletteGenerator = () => {
  const [currentPalette, setCurrentPalette] = useState(talusPalettes[0]);
  const { toast } = useToast();

  const generatePalette = () => {
    const randomIndex = Math.floor(Math.random() * talusPalettes.length);
    setCurrentPalette(talusPalettes[randomIndex]);
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Copied!",
      description: `Color ${color} copied to clipboard`,
    });
  };

  const copyGradient = () => {
    navigator.clipboard.writeText(currentPalette.gradient);
    toast({
      title: "Copied!",
      description: "Gradient CSS copied to clipboard",
    });
  };

  return (
    <Card className="p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Talus Vibe Colors</h3>
          <p className="text-muted-foreground">Generate signature color palettes</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="text-lg font-medium">{currentPalette.name}</div>
            
            {/* Gradient Preview */}
            <div 
              className="w-full h-24 rounded-xl shadow-lg"
              style={{ background: currentPalette.gradient }}
            />

            {/* Individual Colors */}
            <div className="grid grid-cols-3 gap-2">
              {currentPalette.colors.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div 
                    className="w-full h-16 rounded-lg cursor-pointer hover:scale-105 transition-transform border-2 border-border shadow-sm"
                    style={{ backgroundColor: color }}
                    onClick={() => copyColor(color)}
                  />
                  <div className="text-xs font-mono text-center">{color}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={generatePalette}
              className="talus-button flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Palette
            </Button>
            <Button 
              onClick={copyGradient}
              variant="outline"
              size="icon"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Perfect for Talus-themed projects
        </div>
      </div>
    </Card>
  );
};