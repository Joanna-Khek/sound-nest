import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface TooltipProps {
  tooltipDescriptions: { [key: string]: string };
  label: string;
  name: string;
}

export default function TooltipComponent({
  tooltipDescriptions,
  label,
  name,
}: TooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="link"
            className="text-sm font-medium text-gray-700 min-w-[150px] justify-center"
          >
            {label}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="w-fit max-w-[300px] break-words p-2">
          <p>{tooltipDescriptions[name] || "No description available."}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
