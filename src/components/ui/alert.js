import * as React from "react"
import { cn } from "../lib/utils"
import { cva } from "class-variance-authority"

const alertVariants = cva(
  "relative w-full rounded-lg border border-gray-200 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-900",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900",
        destructive:
          "border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600",
        success:
          "border-green-500/50 text-green-600 [&>svg]:text-green-600",
        warning:
          "border-yellow-500/50 text-yellow-600 [&>svg]:text-yellow-600",
        info:
          "border-sky-500/50 text-sky-600 [&>svg]:text-sky-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }