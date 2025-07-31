import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";

export const LoreweaveCounter = () => {
  const [loreweaves, setLoreweaves] = useState(0);
  const [addAmount, setAddAmount] = useState(1);

  const addLoreweaves = () => {
    setLoreweaves(prev => prev + addAmount);
  };

  const removeLoreweaves = () => {
    setLoreweaves(prev => Math.max(0, prev - addAmount));
  };

  return (
    <Card className="p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <div className="flex justify-center mb-2">
            <img 
              src="https://pbs.twimg.com/media/GxLBb8XXYAEi64U?format=jpg&name=tiny" 
              alt="Loreweave" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold">Loreweave Tracker</h3>
          <p className="text-muted-foreground">Track your collected Loreweaves</p>
        </div>

        <div className="relative">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-talus flex items-center justify-center text-4xl font-bold text-primary shadow-lg">
            {loreweaves.toLocaleString()}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Add/Remove:</label>
            <Input
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20"
              min="1"
            />
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={addLoreweaves}
              className="talus-button flex-1"
            >
              <Plus className="w-4 h-4 mr-2" />
              Claim
            </Button>
            <Button 
              onClick={removeLoreweaves}
              variant="outline"
              className="flex-1"
            >
              <Minus className="w-4 h-4 mr-2" />
              Spend
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Total Loreweaves: {loreweaves.toLocaleString()}
        </div>
      </div>
    </Card>
  );
};