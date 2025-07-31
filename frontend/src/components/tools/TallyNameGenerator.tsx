import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const prefixes = [
  "Lily", "Pond", "Frog", "Leap", "Aqua", "Jade", "Moss", "Sage", "Mint", "Teal",
  "Ripple", "Splash", "Bubble", "Stream", "Flow", "Drift", "Glide", "Swift"
];

const suffixes = [
  "pad", "hop", "jump", "leap", "splash", "dive", "swim", "float", "glide",
  "legend", "pioneer", "forward", "master", "sage", "keeper", "guardian", "champion"
];

export const TallyNameGenerator = () => {
  const [generatedName, setGeneratedName] = useState("");
  const { toast } = useToast();

  const generateName = () => {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    setGeneratedName(`${prefix}${suffix}`);
  };

  const copyToClipboard = () => {
    if (generatedName) {
      navigator.clipboard.writeText(generatedName);
      toast({
        title: "Copied!",
        description: "Tally name copied to clipboard",
      });
    }
  };

  return (
    <Card className="p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Tally Name Generator</h3>
          <p className="text-muted-foreground">Generate your unique Tally identity</p>
        </div>

        <div className="space-y-4">
          {generatedName ? (
            <div className="p-6 bg-gradient-talus-subtle rounded-xl border-2 border-accent">
              <div className="text-3xl font-bold text-primary mb-2">
                {generatedName}
              </div>
              <div className="text-sm text-muted-foreground">
                Your Tally Identity
              </div>
            </div>
          ) : (
            <div className="p-6 border-2 border-dashed border-border rounded-xl">
              <div className="text-lg text-muted-foreground">
                Click generate to create your Tally name
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <Button 
              onClick={generateName}
              className="talus-button flex-1"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Generate Name
            </Button>
            {generatedName && (
              <Button 
                onClick={copyToClipboard}
                variant="outline"
                size="icon"
              >
                <Copy className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          "No Frog Left Behind" - Join the Pond
        </div>
      </div>
    </Card>
  );
};