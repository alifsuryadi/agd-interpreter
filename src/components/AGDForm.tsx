import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AGDInput } from "./AGDInput";
import { AGDResultCard } from "./AGDResult";
import { interpretAGD, AGDValues, AGDResult } from "@/lib/agb-interpreter";
import { Activity, Stethoscope, BookOpen } from "lucide-react";

interface FormValues {
  pH: string;
  paCO2: string;
  hco3: string;
  paO2: string;
  spO2: string;
}

interface FormErrors {
  pH?: string;
  paCO2?: string;
  hco3?: string;
  paO2?: string;
  spO2?: string;
}

const STORAGE_KEY = 'agd-form-values';

const initialValues: FormValues = {
  pH: '',
  paCO2: '',
  hco3: '',
  paO2: '',
  spO2: ''
};

export function AGDForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<AGDResult | null>(null);
  const [parsedValues, setParsedValues] = useState<AGDValues | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setValues(parsed);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // Ignore localStorage errors
    }
  }, [values]);

  const validateField = (name: keyof FormValues, value: string): string | undefined => {
    if (!value.trim()) {
      return 'Nilai harus diisi';
    }

    const num = parseFloat(value);
    if (isNaN(num)) {
      return 'Masukkan angka yang valid';
    }

    const ranges: Record<keyof FormValues, [number, number, string]> = {
      pH: [6.8, 7.8, 'pH harus antara 6.80-7.80'],
      paCO2: [10, 100, 'PaCO₂ harus antara 10-100 mmHg'],
      hco3: [5, 50, 'HCO₃ harus antara 5-50 mEq/L'],
      paO2: [20, 500, 'PaO₂ harus antara 20-500 mmHg'],
      spO2: [50, 100, 'SpO₂ harus antara 50-100%']
    };

    const [min, max, message] = ranges[name];
    if (num < min || num > max) {
      return message;
    }

    return undefined;
  };

  const handleChange = (name: keyof FormValues) => (value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(values) as Array<keyof FormValues>).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) {
      return;
    }

    const agdValues: AGDValues = {
      pH: parseFloat(values.pH),
      paCO2: parseFloat(values.paCO2),
      hco3: parseFloat(values.hco3),
      paO2: parseFloat(values.paO2),
      spO2: parseFloat(values.spO2)
    };

    const interpretation = interpretAGD(agdValues);
    setParsedValues(agdValues);
    setResult(interpretation);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setResult(null);
    setParsedValues(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  if (result && parsedValues) {
    return (
      <AGDResultCard 
        result={result} 
        values={parsedValues} 
        onReset={handleReset} 
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Header */}
      <div className="medical-card gradient-medical text-primary-foreground mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Interpretasi AGD</h1>
              <p className="text-sm opacity-90">Analisa Gas Darah</p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            asChild
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Link to="/petunjuk">
              <BookOpen className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Input Card */}
      <div className="medical-card space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Masukkan Nilai AGD</h2>
        </div>

        <AGDInput
          id="pH"
          label="pH"
          unit=""
          value={values.pH}
          onChange={handleChange('pH')}
          min={6.8}
          max={7.8}
          step={0.01}
          error={errors.pH}
          placeholder="7.40"
        />

        <AGDInput
          id="paCO2"
          label="PaCO₂"
          unit="mmHg"
          value={values.paCO2}
          onChange={handleChange('paCO2')}
          min={10}
          max={100}
          step={1}
          error={errors.paCO2}
          placeholder="40"
        />

        <AGDInput
          id="hco3"
          label="HCO₃⁻"
          unit="mEq/L"
          value={values.hco3}
          onChange={handleChange('hco3')}
          min={5}
          max={50}
          step={0.1}
          error={errors.hco3}
          placeholder="24"
        />

        <AGDInput
          id="paO2"
          label="PaO₂"
          unit="mmHg"
          value={values.paO2}
          onChange={handleChange('paO2')}
          min={20}
          max={500}
          step={1}
          error={errors.paO2}
          placeholder="95"
        />

        <AGDInput
          id="spO2"
          label="SpO₂"
          unit="%"
          value={values.spO2}
          onChange={handleChange('spO2')}
          min={50}
          max={100}
          step={1}
          error={errors.spO2}
          placeholder="98"
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full btn-medical gradient-medical">
        <Activity className="w-5 h-5 mr-2" />
        Interpretasikan AGD
      </Button>

      {/* Reference Card */}
      <div className="medical-card bg-muted/30">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Nilai Normal</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">pH:</span>
            <span className="font-medium">7.35 - 7.45</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">PaCO₂:</span>
            <span className="font-medium">35 - 45 mmHg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">HCO₃⁻:</span>
            <span className="font-medium">22 - 26 mEq/L</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">PaO₂:</span>
            <span className="font-medium">80 - 100 mmHg</span>
          </div>
          <div className="flex justify-between col-span-2">
            <span className="text-muted-foreground">SpO₂:</span>
            <span className="font-medium">≥ 94%</span>
          </div>
        </div>
      </div>
    </form>
  );
}
