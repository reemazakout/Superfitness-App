import { cn } from "@/lib/utils/cn";

type HeadingTitle = {
  className: string;
  children: React.ReactNode;
};
export default function HeadingTitle({ className, children }: HeadingTitle) {
  return (
    // TODO: edit style
    <div
      className={cn(
        "text-xl lg:text-[40px] font-bold font-baloo text-foreground leading-snug",
        className
      )}
    >
      {children}
    </div>
  );
}
