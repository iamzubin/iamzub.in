import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline"
  size?: "sm" | "default"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center text-sm font-black uppercase tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
          variant === "default" &&
            "bg-brutalist-fg text-white hover:bg-neon-yellow hover:text-black border-2 border-brutalist-fg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-neon-yellow dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
          variant === "outline" &&
            "border-2 border-brutalist-fg bg-transparent hover:bg-brutalist-fg hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
          variant === "ghost" &&
            "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 px-3 py-1.5",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
