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

export type GroupedOption = {
  value: string;
  label: string;
};

export type OptionGroup = {
  key: string;
  label: string;
  items: GroupedOption[];
};

export function GroupedMultiSelectField({
  label,
  placeholder,
  values,
  onChange,
  groups,
  itemLabel = "items",
  error,
}: {
  label?: string;
  placeholder: string;
  values: string[];
  onChange: (values: string[]) => void;
  groups: OptionGroup[];
  itemLabel?: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const isGrouped = groups.length > 1;
  const allOptions = groups.flatMap((g) => g.items);

  function toggle(value: string) {
    onChange(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);
  }

  function labelFor(value: string) {
    return allOptions.find((o) => o.value === value)?.label ?? value;
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
                  ? labelFor(values[0])
                  : `${values.length} ${itemLabel} selected`}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 text-black/80 shrink-0 opacity-50" />
            </Button>
          }
        />

        <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="center" alignOffset={-50} side="bottom" sideOffset={-50}>
          <Command>
            <CommandList>
              {groups.map((group) => (
                <CommandGroup key={group.key} heading={isGrouped ? group.label : undefined}>
                  {group.items.map((item) => {
                    const checked = values.includes(item.value);
                    return (
                      <CommandItem
                        key={item.value}
                        onSelect={() => toggle(item.value)}
                        className="cursor-pointer"
                      >
                        <Check className={cn("mr-2 h-4 w-4", checked ? "opacity-100" : "opacity-0")} />
                        {item.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {values.map((v) => (
            <Badge key={v} variant="secondary" className="gap-1.5 pr-1.5 rounded-lga text-popover text-sm">
              {labelFor(v)}
              <button
                type="button"
                onClick={() => toggle(v)}
                aria-label={`Remove ${labelFor(v)}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
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