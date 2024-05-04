import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";

type Props = {};

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function hub({}: Props) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold my-20">Navigation</h1>
      <div className="flex flex-col space-y-4 mt-3">
        <Link
          to="/form"
          className={`h-20 w-4/5 text-xl mx-auto ${buttonVariants({
            variant: "default",
            size: "default",
          })}`}
        >
          Input Patient Data
        </Link>
        <Link
          to="/patient-data"
          className={`h-20 w-4/5 text-xl mx-auto ${buttonVariants({
            variant: "default",
            size: "default",
          })}`}
        >
          View Patient Data
        </Link>
        <Link
          to="/classifier"
          className={`h-20 w-4/5 text-xl mx-auto ${buttonVariants({
            variant: "default",
            size: "default",
          })}`}
        >
          View Classifier (BETA)
        </Link>
      </div>
    </div>
  );
}

export default hub;
