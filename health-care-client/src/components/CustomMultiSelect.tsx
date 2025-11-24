"use client";

import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

export interface MultiItem {
  id: string;
  title: string;
  selected?: boolean;
}

export interface CustomMultiSelectProps<T extends MultiItem = MultiItem> {
  defaultItems: T[];
  setSelectedItems: Dispatch<SetStateAction<string[]>>;
  isEdit?: boolean;
  className?: string;
}

export default function CustomMultiSelect<T extends MultiItem>({
  defaultItems,
  setSelectedItems,
  isEdit = false,
  className,
}: CustomMultiSelectProps<T>) {
  const normalizedDefaultItems = useMemo(() => {
    return isEdit
      ? defaultItems
      : defaultItems.map((item) => ({ ...item, selected: false }));
  }, [defaultItems, isEdit]);

  const [items, setItems] = useState(normalizedDefaultItems);

  // sync selected IDs to parent
  useEffect(() => {
    const selectedIds = items.filter((i) => i.selected).map((i) => i.id);
    setSelectedItems(selectedIds);
  }, [items, setSelectedItems]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
    );
  };

  return (
    <div className={cn("relative pl-4 border rounded-sm overflow-hidden", className)}>
      <div className="bg-linear-to-b from-60% from-background to-transparent w-full h-6 absolute left-0 top-0" />
      <div className="bg-linear-to-t from-60% from-background to-transparent w-full h-6 absolute left-0 bottom-0" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto custom-scrollbar pr-4">
        <div className="py-2 w-full md:col-span-2" />

        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={cn("text-left border border-input/60 rounded-full py-1 px-3", {
              "bg-accent text-accent-foreground": item.selected,
            })}
          >
            <span className="mt-0.5 inline-block">{item.title}</span>
          </button>
        ))}

        <div className="py-2 w-full md:col-span-2" />
      </div>
    </div>
  );
}
