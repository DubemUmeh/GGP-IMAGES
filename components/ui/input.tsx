import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"
import { todayUTCDateString, nowUTCTimeString } from "@/lib/date"

type InputProps = React.ComponentProps<"input"> & {
  /**
   * For type="time" inputs: pass true when the paired date field is set to
   * today (Ghana/UTC+0), so past clock times get blocked too. Ignored for
   * every other input type. Has no effect if `min` is explicitly provided.
   */
  isToday?: boolean
}

function Input({ className, type, min, isToday, ...props }: InputProps) {
  let resolvedMin = min

  // Every date input defaults to "no past dates" unless the caller
  // explicitly overrides `min` (e.g. a date-of-birth field would pass
  // min={undefined} deliberately — but since we can't distinguish that from
  // "not set", callers needing an open past range should pass min="").
  if (type === "date" && resolvedMin === undefined) {
    resolvedMin = todayUTCDateString()
  }

  // Time inputs have no date context of their own, so the past-time floor
  // only applies when the caller tells us the paired date is today.
  if (type === "time" && resolvedMin === undefined && isToday) {
    resolvedMin = nowUTCTimeString()
  }

  return (
    <InputPrimitive
      type={type}
      min={resolvedMin}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }