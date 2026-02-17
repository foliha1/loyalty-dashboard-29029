import { Info } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface EPsLabelProps {
  showInfo?: boolean;
  className?: string;
}

export const EPsLabel = ({ showInfo = false, className }: EPsLabelProps) => {
  if (!showInfo) {
    return <span className={className}>EPs</span>;
  }

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      EPs
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-200 focus:outline-none"
            aria-label="What are EPs?"
          >
            <Info size={12} />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-[18px] px-4 py-3 text-xs text-white/90 max-w-[240px] shadow-lg"
        >
          EPs (Elevation Points) are earned through events, coaching, and apparel purchases.
        </TooltipContent>
      </Tooltip>
    </span>
  );
};
