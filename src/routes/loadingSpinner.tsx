// components/ui/spinner.tsx
import { cn } from "@/lib/utils/cn";

interface SpinnerProps {
  className?: string;
  size?: number;
}

export default function Spinner({ className, size = 40 }: SpinnerProps) {
  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-4 border-solid border-flame border-t-transparent",
        className
      )}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}
