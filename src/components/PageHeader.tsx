import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  children?: ReactNode;
  className?: string;
};

export default function PageHeader({
  title,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn("mb-8 flex gap-4 items-center justify-between", className)}
    >
      <h1 className="text-2xl font-semibold">{title}</h1>
      {children && <div>{children}</div>}
    </div>
  );
}
