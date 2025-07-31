import { useState, useEffect } from "react";
import { WelcomeModal } from "@/components/WelcomeModal";
import { LoreweaveCounter } from "@/components/tools/LoreweaveCounter";
import { TallyNameGenerator } from "@/components/tools/TallyNameGenerator";
import { StatusChecker } from "@/components/tools/StatusChecker";
import { ColorPaletteGenerator } from "@/components/tools/ColorPaletteGenerator";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Tool = "loreweave" | "name-generator" | "status-checker" | "color-palette";

interface UserData {
  name: string;
  profession: string;
}

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const tools = [
    {
      id: "loreweave" as Tool,
      title: "Loreweave Tracker",
      description: "Track and manage your collected Loreweaves",
      icon: "💎",
      component: <LoreweaveCounter />
    },
    {
      id: "name-generator" as Tool,
      title: "Tally Name Generator",
      description: "Generate unique Tally identities for the Pond",
      icon: "🐸",
      component: <TallyNameGenerator />
    },
    {
      id: "status-checker" as Tool,
      title: "Pond Status Checker",
      description: "Check if you're part of the Talus ecosystem",
      icon: "🌊",
      component: <StatusChecker />
    },
    {
      id: "color-palette" as Tool,
      title: "Talus Vibe Colors",
      description: "Generate signature Talus color palettes",
      icon: "🎨",
      component: <ColorPaletteGenerator />
    }
  ];

  const handleWelcomeComplete = (data: UserData) => {
    setUserData(data);
    setShowWelcome(false);
  };

  const openTool = (toolId: Tool) => {
    setActiveTool(toolId);
  };

  const closeTool = () => {
    setActiveTool(null);
  };

  const activeTool_obj = tools.find(tool => tool.id === activeTool);

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcome}
        onComplete={handleWelcomeComplete}
      />

      {/* Tool Modal */}
      <Dialog open={!!activeTool} onOpenChange={() => closeTool()}>
        <DialogContent className="max-w-2xl p-0">
          <div className="relative">
            <Button
              onClick={closeTool}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10"
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="p-6">
              {activeTool_obj?.component}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      {userData && !showWelcome && (
        <div className="relative">
          {/* Background Grid */}
          <div className="absolute inset-0 talus-grid opacity-40" />
          
          {/* Hero Section */}
          <div className="relative container mx-auto px-6 py-12">
            <div className="text-center space-y-8 mb-16">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-secondary rounded-full text-sm font-medium flex items-center space-x-2">
                  <img 
                    src="https://pbs.twimg.com/profile_images/1909615998434508800/pIglsX47_400x400.png" 
                    alt="Talus" 
                    className="w-5 h-5 rounded-full"
                  />
                  <span>Talus Vibe Challenge Tools</span>
                </div>
                
                <h1 className="text-5xl font-bold">
                  Welcome, {userData.name}
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Professional tools built for the <strong>Talus ecosystem</strong>. 
                  Perfect for developers participating in the Vibe Coding Challenge.
                </p>
              </div>

              {/* Talus Logo with Orb Background Effect */}
              <div className="logo-orb-container relative mx-auto w-40 h-40">
                {/* Background Orb - Larger for halo effect */}
                <div className="orb-background absolute inset-0">
                  <div className="w-full h-full rounded-full bg-gradient-orb talus-shadow animate-pulse" />
                  <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-talus opacity-30 animate-ping" />
                </div>
                
                {/* Talus Logo - Positioned on top */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <img 
                    src="https://pbs.twimg.com/profile_images/1909615998434508800/pIglsX47_400x400.png" 
                    alt="Talus Logo" 
                    className="talus-logo w-16 h-16 rounded-full shadow-2xl border border-white/40 backdrop-blur-sm bg-white/10"
                  />
                </div>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => openTool(tool.id)}
                  className="tool-card group"
                >
                  <div className="text-center space-y-4">
                    <div className="text-4xl mb-4">{tool.icon}</div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {tool.description}
                    </p>
                    <div className="w-full h-1 bg-gradient-talus rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center mt-16 space-y-6">
              {/* Talus Logo in Footer */}
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src="https://pbs.twimg.com/profile_images/1909615998434508800/pIglsX47_400x400.png" 
                  alt="Talus Logo" 
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-lg font-bold bg-gradient-talus bg-clip-text text-transparent">
                  Built for Talus Vibe Coding Challenge
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-2">
                <div>Tools for the Talus ecosystem • #TallysVibeCode</div>
                <div className="text-xs">
                  "No Frog Left Behind" • Powering the Autonomous AI Economy
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;