import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AGDInputProps {
  id: string;
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  step?: number;
  error?: string;
  placeholder?: string;
}

export function AGDInput({
  id,
  label,
  unit,
  value,
  onChange,
  min,
  max,
  step = 0.1,
  error,
  placeholder
}: AGDInputProps) {
  return (
    <div className="space-y-2">
      <Label 
        htmlFor={id} 
        className="text-sm font-semibold text-foreground flex items-center justify-between"
      >
        <span>{label}</span>
        <span className="text-xs font-normal text-muted-foreground">
          {min} - {max} {unit}
        </span>
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder || `Masukkan ${label}`}
          className={`input-medical pr-16 ${error ? 'border-destructive focus:border-destructive' : ''}`}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
          {unit}
        </span>
      </div>
      {error && (
        <p className="text-xs text-destructive font-medium animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}
