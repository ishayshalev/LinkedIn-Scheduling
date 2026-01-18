import * as React from "react"

import { cn } from "@/lib/utils"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

function Label({ className, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-sm leading-none font-medium select-none",
        className
      )}
      {...props}
    />
  )
}

export { Label }
