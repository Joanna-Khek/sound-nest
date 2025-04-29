import { Slider } from "@/components/ui/slider";
import { TooltipComponent } from "@/components/common";

interface Config {
  label: string;
  value: number;
  max_value: number;
  min_value: number;
  step: number;
  name: string;
}

interface SliderBarProps {
  config: Config[];
  tooltipDescriptions: { [key: string]: string };
  onValueChange: (name: string, value: number) => void; // Callback for value changes
}

export default function SliderBar({
  config,
  tooltipDescriptions,
  onValueChange,
}: SliderBarProps) {
  return (
    <div className="space-y-4">
      {config.map(({ label, value, max_value, min_value, step, name }) => (
        <div key={name} className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <TooltipComponent
              tooltipDescriptions={tooltipDescriptions}
              label={label}
              name={name}
            />
            <div className="flex-1 flex items-center gap-4">
              <Slider
                value={[value]}
                min={min_value}
                max={max_value}
                step={step}
                onValueChange={(values) => onValueChange(name, values[0])}
              />
              <span className="text-sm text-gray-700 min-w-[4rem] border border-gray-300 rounded-md px-2 py-1 bg-gray-50 text-center">
                {value.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
