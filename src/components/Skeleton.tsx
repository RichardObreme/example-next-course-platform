import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

type SkeletonButtonProps = {
  className?: string;
};

export function SkeletonButton({ className }: SkeletonButtonProps) {
  return (
    <div
      className={cn(
        buttonVariants({
          variant: "secondary",
          className: "pointer-events-none animate-pulse w-24",
        }),
        className
      )}
    />
  );
}
