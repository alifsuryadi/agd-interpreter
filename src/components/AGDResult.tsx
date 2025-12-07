import { Copy, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AGDResult as AGDResultType, AGDValues, formatResultText } from "@/lib/agb-interpreter";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface AGDResultProps {
  result: AGDResultType;
  values: AGDValues;
  onReset: () => void;
}

function StatusBadge({ status, label }: { status: 'normal' | 'abnormal' | 'warning'; label: string }) {
  const statusClasses = {
    normal: 'status-badge status-normal',
    abnormal: 'status-badge status-abnormal',
    warning: 'status-badge status-warning'
  };

  return (
    <span className={statusClasses[status]}>
      {label}
    </span>
  );
}

function ResultRow({ 
  title, 
  value, 
  status, 
  detail 
}: { 
  title: string; 
  value: string; 
  status: 'normal' | 'abnormal' | 'warning';
  detail?: string;
}) {
  return (
    <div className="py-4 border-b border-border/50 last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-base font-semibold text-foreground">{value}</p>
          {detail && (
            <p className="text-xs text-muted-foreground mt-1">{detail}</p>
          )}
        </div>
        <StatusBadge status={status} label={status === 'normal' ? 'Normal' : status === 'warning' ? 'Perhatian' : 'Abnormal'} />
      </div>
    </div>
  );
}

export function AGDResultCard({ result, values, onReset }: AGDResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = formatResultText(result, values);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Berhasil disalin!",
        description: "Hasil interpretasi telah disalin ke clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Gagal menyalin",
        description: "Tidak dapat menyalin ke clipboard.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="medical-card gradient-medical text-primary-foreground">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Hasil Interpretasi</h2>
            <p className="text-sm opacity-90">Analisa Gas Darah</p>
          </div>
        </div>
      </div>

      {/* Values Summary */}
      <div className="medical-card">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Nilai Input</h3>
        <div className="grid grid-cols-5 gap-2 text-center">
          <div className="p-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">pH</p>
            <p className="text-sm font-bold text-foreground">{values.pH.toFixed(2)}</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">PaCO₂</p>
            <p className="text-sm font-bold text-foreground">{values.paCO2}</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">HCO₃</p>
            <p className="text-sm font-bold text-foreground">{values.hco3}</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">PaO₂</p>
            <p className="text-sm font-bold text-foreground">{values.paO2}</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <p className="text-xs text-muted-foreground">SpO₂</p>
            <p className="text-sm font-bold text-foreground">{values.spO2}%</p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="medical-card">
        <ResultRow
          title="Status Asam-Basa"
          value={result.phStatus.label}
          status={result.phStatus.status}
          detail={`pH: ${values.pH.toFixed(2)}`}
        />
        <ResultRow
          title="Gangguan Primer"
          value={result.primaryDisorder.label}
          status={result.primaryDisorder.status}
        />
        <ResultRow
          title="Kompensasi"
          value={result.compensation.label}
          status={result.compensation.status}
        />
        <ResultRow
          title="Status Oksigenasi"
          value={result.oxygenation.label}
          status={result.oxygenation.status}
          detail={`PaO₂: ${values.paO2} mmHg | SpO₂: ${values.spO2}%`}
        />
      </div>

      {/* Conclusion */}
      <div className="medical-card bg-secondary/50 border-secondary">
        <h3 className="text-sm font-semibold text-secondary-foreground mb-2">Kesimpulan</h3>
        <p className="text-base font-medium text-foreground leading-relaxed">
          {result.conclusion}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={handleCopy}
          className="h-12 font-semibold"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Tersalin!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Salin Hasil
            </>
          )}
        </Button>
        <Button
          variant="secondary"
          onClick={onReset}
          className="h-12 font-semibold"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Input Baru
        </Button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground px-4">
        Hasil interpretasi ini bersifat panduan dan harus dikonfirmasi dengan kondisi klinis pasien.
      </p>
    </div>
  );
}
