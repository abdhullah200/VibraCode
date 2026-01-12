"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface MarkedToggleButtonProps {
  markedForRevision?: boolean;
  id: string;
  onToggle?: (id: string) => void;
}

export function MarkedToggleButton({ markedForRevision = false, id, onToggle }: MarkedToggleButtonProps) {
  const [isMarked, setIsMarked] = useState(markedForRevision);

  const handleToggle = () => {
    setIsMarked(!isMarked);
    if (onToggle) {
      onToggle(id);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="flex items-center justify-start w-full p-2 h-auto"
    >
      <Star
        className={`h-4 w-4 mr-2 ${
          isMarked ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
        }`}
      />
      {isMarked ? "Unstar" : "Star"}
    </Button>
  );
}