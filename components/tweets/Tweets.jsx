import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Tweets() {
  return (
    <div className="mt-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-center">
            Share Story
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>Create Story</DialogTitle>
          <DialogDescription>Our this features will be coming soon.</DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Tweets;
