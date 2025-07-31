import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Search } from "lucide-react";

export const StatusChecker = () => {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "in-pond" | "not-found">("idle");

  const checkStatus = () => {
    if (!address.trim()) return;
    
    setStatus("checking");
    
    // Simulate API call
    setTimeout(() => {
      // Simple simulation - addresses starting with "0x" are "in the pond"
      const isInPond = address.toLowerCase().startsWith("0x") || address.toLowerCase().includes("tally");
      setStatus(isInPond ? "in-pond" : "not-found");
    }, 1500);
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "checking":
        return (
          <div className="p-6 bg-gradient-talus-subtle rounded-xl border-2 border-accent animate-pulse">
            <div className="text-lg font-medium text-primary">
              Checking the Pond...
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Searching through Lilypad Town
            </div>
          </div>
        );
      case "in-pond":
        return (
          <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200">
            <div className="flex items-center text-green-700 mb-2">
              <CheckCircle className="w-6 h-6 mr-2" />
              <span className="text-lg font-medium">Welcome to the Pond!</span>
            </div>
            <div className="text-sm text-green-600">
              You're officially part of the Talus ecosystem
            </div>
          </div>
        );
      case "not-found":
        return (
          <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
            <div className="flex items-center text-red-700 mb-2">
              <XCircle className="w-6 h-6 mr-2" />
              <span className="text-lg font-medium">Not in the Pond yet</span>
            </div>
            <div className="text-sm text-red-600">
              Join the community - No Frog Left Behind!
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 border-2 border-dashed border-border rounded-xl">
            <div className="text-lg text-muted-foreground">
              Enter your address to check status
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="p-8 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">"No Frog Left Behind"</h3>
          <p className="text-muted-foreground">Check if you're in the Pond</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter wallet address or Tally ID"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-center"
            />
          </div>

          {getStatusDisplay()}

          <Button 
            onClick={checkStatus}
            disabled={!address.trim() || status === "checking"}
            className="talus-button w-full"
          >
            <Search className="w-4 h-4 mr-2" />
            {status === "checking" ? "Checking..." : "Check Status"}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Join the autonomous AI economy
        </div>
      </div>
    </Card>
  );
};