"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function MultiSelectField({
  label,
  placeholder,
  values,
  onChange,
  items,
  error,
}: {
  label?: string;
  placeholder: string;
  values: string[];
  onChange: (values: string[]) => void;
  items: string[];
  error?: string;
}) {
  const [open, setOpen] = useState(false);

  function toggle(item: string) {
    onChange(values.includes(item) ? values.filter((v) => v !== item) : [...values, item]);
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="h-auto min-h-11 w-full justify-between font-normal"
            >
              <span className={cn("truncate text-left text-black/80", values.length === 0 && "text-muted-foreground")}>
                {values.length === 0
                  ? placeholder
                  : values.length === 1
                  ? values[0]
                  : `${values.length} services selected`}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 text-black/80 shrink-0 opacity-50" />
            </Button>
          }
        />

        <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="center" alignOffset={-50} side='bottom' sideOffset={-50}>
          <Command>
            <CommandList>
              <CommandGroup>
                {items.map((item) => {
                  const checked = values.includes(item);
                  return (
                    <CommandItem
                      key={item}
                      onSelect={() => toggle(item)}
                      className="cursor-pointer"
                    >
                      <Check className={cn("mr-2 h-4 w-4", checked ? "opacity-100" : "opacity-0")} />
                      {item}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map((v) => (
            <Badge key={v} variant="brand" className="gap-1.5 pr-1.5 rounded-lga text-popover text-sm">
              {v}
              <button
                type="button"
                onClick={() => toggle(v)}
                aria-label={`Remove ${v}`}
                className="text-popover transition-colors hover:text-popover/90"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}