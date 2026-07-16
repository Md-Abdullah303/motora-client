import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/app/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#00D2FF] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#00D2FF]/20 text-[#00D2FF]",
        secondary: "border-transparent bg-[#0055FF]/20 text-[#0055FF]",
        destructive: "border-transparent bg-red-500/20 text-red-400",
        outline: "text-gray-300 border-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
