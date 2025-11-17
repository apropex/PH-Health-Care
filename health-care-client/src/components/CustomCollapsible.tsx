"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CustomCollapsibleProps {
  buttonTitle: string;
  items: string[];
  className?: string;
  itemClass?: string;
}

export default function CustomCollapsible({
  buttonTitle,
  items,
  className,
  itemClass,
}: CustomCollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("flex flex-col gap-2", className)}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold">{buttonTitle}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle Button</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="flex flex-col gap-2">
        {items.map((item, i) => (
          <p
            key={i}
            className={cn("rounded-md border px-4 py-2 font-mono text-sm", itemClass)}
          >
            {item}
          </p>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
