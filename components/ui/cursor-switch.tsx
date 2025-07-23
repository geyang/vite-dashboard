"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { useCursor } from "@/components/highlight-cursor/cursor-context"
import { cn } from "@/lib/utils"

const CursorSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, id: propId, onMouseEnter, onMouseMove, onMouseLeave, ...props }, ref) => {
  const {
    registerHoveredElement,
    unregisterHoveredElement,
    updateElementDimensions,
  } = useCursor()

  const generatedId = React.useId()
  const id = propId || `cursor-switch-${generatedId}`
  const thumbRef = React.useRef<HTMLSpanElement>(null)

  const handleMouseEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (thumbRef.current) {
      const elementRect = thumbRef.current.getBoundingClientRect()
      registerHoveredElement(id, elementRect)
    }
    onMouseEnter?.(event as any)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (thumbRef.current) {
      const elementRect = thumbRef.current.getBoundingClientRect()
      updateElementDimensions(elementRect)
    }
    onMouseMove?.(event as any)
  }

  const handleMouseLeave = (event: React.MouseEvent<HTMLSpanElement>) => {
    unregisterHoveredElement()
    onMouseLeave?.(event as any)
  }

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
      id={id}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        ref={thumbRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 cursor-pointer"
        )}
      />
    </SwitchPrimitives.Root>
  )
})

CursorSwitch.displayName = "CursorSwitch"

export { CursorSwitch }
