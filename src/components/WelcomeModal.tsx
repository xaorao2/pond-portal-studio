import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WelcomeModalProps {
  isOpen: boolean;
  onComplete: (data: { name: string; profession: string }) => void;
}

export const WelcomeModal = ({ isOpen, onComplete }: WelcomeModalProps) => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");

  const handleSubmit = () => {
    if (name.trim() && profession) {
      onComplete({ name: name.trim(), profession });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-talus flex items-center justify-center text-2xl font-bold">
            🐸
          </div>
          <DialogTitle className="text-2xl font-bold">
            Welcome to the Talus Vibe Challenge Tools
          </DialogTitle>
          <DialogDescription className="text-base">
            Built for the Talus community by developers, for developers. 
            Let's get you started on your creative coding journey!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession">Your Role</Label>
            <Select value={profession} onValueChange={setProfession}>
              <SelectTrigger>
                <SelectValue placeholder="Select your profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="hobbyist">Hobbyist</SelectItem>
                <SelectItem value="founder">Founder</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!name.trim() || !profession}
            className="talus-button w-full mt-6"
          >
            Enter the Pond
          </Button>
        </div>

        <div className="text-xs text-center text-muted-foreground mt-4">
          "No Frog Left Behind" - Build the vibe with us
        </div>
      </DialogContent>
    </Dialog>
  );
};