import { ArrowLeft, BookOpen, Activity, Stethoscope, Heart, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface GuideCardProps {
  number: number;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function GuideCard({ number, title, icon, children }: GuideCardProps) {
  return (
    <div className="medical-card animate-fade-in" style={{ animationDelay: `${number * 50}ms` }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl gradient-medical flex items-center justify-center text-primary-foreground font-bold text-sm">
          {number}
        </div>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-semibold text-foreground">{title}</h2>
        </div>
      </div>
      <div className="text-sm text-foreground/90 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

interface ValueRowProps {
  condition: string;
  result: string;
  variant?: 'acidosis' | 'alkalosis' | 'normal' | 'warning';
}

function ValueRow({ condition, result, variant = 'normal' }: ValueRowProps) {
  const colors = {
    acidosis: 'bg-destructive/10 text-destructive border-destructive/20',
    alkalosis: 'bg-primary/10 text-primary border-primary/20',
    normal: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20'
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${colors[variant]}`}>
      <code className="font-mono text-sm font-medium">{condition}</code>
      <span className="text-sm font-semibold">→ {result}</span>
    </div>
  );
}

const PetunjukAGD = () => {
  return (
    <>
      <Helmet>
        <title>Petunjuk Interpretasi AGD | Panduan Analisa Gas Darah</title>
        <meta 
          name="description" 
          content="Panduan langkah demi langkah untuk interpretasi Analisa Gas Darah (AGD). Pelajari cara menganalisis pH, PaCO₂, HCO₃, dan status oksigenasi." 
        />
      </Helmet>
      <main className="min-h-screen bg-background">
        <div className="container max-w-md mx-auto px-4 py-6 pb-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" asChild className="shrink-0">
              <Link to="/">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Petunjuk Interpretasi AGD</h1>
              <p className="text-sm text-muted-foreground">Panduan langkah demi langkah</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Step 1: Urutan Interpretasi */}
            <GuideCard 
              number={1} 
              title="Urutan Interpretasi"
              icon={<BookOpen className="w-5 h-5 text-primary" />}
            >
              <ol className="space-y-2 list-decimal list-inside">
                <li className="py-1.5 px-3 bg-muted/50 rounded-lg">Cek pH darah</li>
                <li className="py-1.5 px-3 bg-muted/50 rounded-lg">Tentukan gangguan primer (PaCO₂ / HCO₃)</li>
                <li className="py-1.5 px-3 bg-muted/50 rounded-lg">Nilai kompensasi</li>
                <li className="py-1.5 px-3 bg-muted/50 rounded-lg">Nilai oksigenasi</li>
                <li className="py-1.5 px-3 bg-muted/50 rounded-lg">Buat kesimpulan</li>
              </ol>
            </GuideCard>

            {/* Step 2: pH */}
            <GuideCard 
              number={2} 
              title="Status pH"
              icon={<Activity className="w-5 h-5 text-primary" />}
            >
              <p className="mb-3 text-muted-foreground">Nilai normal pH: <strong className="text-foreground">7.35 - 7.45</strong></p>
              <div className="space-y-2">
                <ValueRow condition="pH < 7.35" result="Asidosis" variant="acidosis" />
                <ValueRow condition="pH > 7.45" result="Alkalosis" variant="alkalosis" />
                <ValueRow condition="pH 7.35-7.45" result="Normal" variant="normal" />
              </div>
            </GuideCard>

            {/* Step 3: Gangguan Primer */}
            <GuideCard 
              number={3} 
              title="Gangguan Primer"
              icon={<Stethoscope className="w-5 h-5 text-primary" />}
            >
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Respiratorik (PaCO₂)
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">Normal: 35-45 mmHg</p>
                  <div className="space-y-2">
                    <ValueRow condition="PaCO₂ > 45" result="Asidosis Respiratorik" variant="acidosis" />
                    <ValueRow condition="PaCO₂ < 35" result="Alkalosis Respiratorik" variant="alkalosis" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Metabolik (HCO₃)
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">Normal: 22-26 mEq/L</p>
                  <div className="space-y-2">
                    <ValueRow condition="HCO₃ < 22" result="Asidosis Metabolik" variant="acidosis" />
                    <ValueRow condition="HCO₃ > 26" result="Alkalosis Metabolik" variant="alkalosis" />
                  </div>
                </div>
              </div>
            </GuideCard>

            {/* Step 4: Kompensasi */}
            <GuideCard 
              number={4} 
              title="Kompensasi"
              icon={<CheckCircle className="w-5 h-5 text-primary" />}
            >
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Gangguan Respiratorik</p>
                  <p className="text-muted-foreground">→ Lihat HCO₃ untuk kompensasi metabolik</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium text-foreground mb-1">Gangguan Metabolik</p>
                  <p className="text-muted-foreground">→ Lihat PaCO₂ untuk kompensasi respiratorik</p>
                </div>
                <div className="border-t border-border pt-3 mt-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Tingkat Kompensasi
                  </p>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-destructive"></span>
                      <span><strong>Tidak ada:</strong> pH abnormal, kompensator normal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-warning"></span>
                      <span><strong>Parsial:</strong> pH abnormal, kompensator berubah</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success"></span>
                      <span><strong>Penuh:</strong> pH normal, kedua parameter abnormal</span>
                    </li>
                  </ul>
                </div>
              </div>
            </GuideCard>

            {/* Step 5: Oksigenasi */}
            <GuideCard 
              number={5} 
              title="Status Oksigenasi"
              icon={<Heart className="w-5 h-5 text-primary" />}
            >
              <p className="mb-3 text-muted-foreground">
                Normal: PaO₂ ≥80 mmHg, SpO₂ ≥94%
              </p>
              <div className="space-y-2">
                <ValueRow condition="PaO₂ < 80 mmHg" result="Hipoksemia" variant="warning" />
                <ValueRow condition="SpO₂ < 94%" result="Hipoksemia" variant="warning" />
              </div>
              <div className="mt-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                <p className="text-sm text-warning font-medium">
                  ⚠️ Jika salah satu atau keduanya terpenuhi → Hipoksemia
                </p>
              </div>
            </GuideCard>

            {/* Step 6: Contoh Kesimpulan */}
            <GuideCard 
              number={6} 
              title="Contoh Kesimpulan"
              icon={<FileText className="w-5 h-5 text-primary" />}
            >
              <div className="space-y-3">
                <div className="p-3 bg-secondary/50 rounded-lg border border-secondary">
                  <p className="text-sm italic text-foreground">
                    "Asidosis respiratorik akut dengan hipoksemia."
                  </p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg border border-secondary">
                  <p className="text-sm italic text-foreground">
                    "Alkalosis metabolik terkompensasi parsial."
                  </p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-lg border border-secondary">
                  <p className="text-sm italic text-foreground">
                    "Asidosis metabolik tanpa kompensasi, oksigenasi adekuat."
                  </p>
                </div>
              </div>
            </GuideCard>

            {/* CTA Button */}
            <Button asChild className="w-full btn-medical gradient-medical mt-6">
              <Link to="/">
                <Activity className="w-5 h-5 mr-2" />
                Mulai Interpretasi AGD
              </Link>
            </Button>
          </div>

          {/* Footer */}
          <footer className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Panduan ini bersifat ringkas untuk membantu interpretasi cepat.
              <br />
              Selalu konfirmasi dengan literatur dan kondisi klinis.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default PetunjukAGD;
