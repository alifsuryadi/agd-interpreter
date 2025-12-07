import { AGDForm } from "@/components/AGDForm";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BookOpen, Stethoscope } from "lucide-react";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Interpretasi AGD | Analisa Gas Darah</title>
        <meta 
          name="description" 
          content="Kalkulator interpretasi Analisa Gas Darah (AGD/ABG) otomatis. Masukkan nilai pH, PaCO₂, HCO₃, PaO₂, dan SpO₂ untuk mendapatkan interpretasi lengkap." 
        />
      </Helmet>
      <main className="min-h-screen bg-background">
        {/* Desktop Header - hidden on mobile */}
        <header className="hidden lg:block border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-medical flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">AGD Interpreter</h1>
                  <p className="text-xs text-muted-foreground">Analisa Gas Darah</p>
                </div>
              </div>
              <Link 
                to="/petunjuk" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <BookOpen className="w-4 h-4" />
                Petunjuk Interpretasi
              </Link>
            </div>
          </div>
        </header>

        <div className="container max-w-md lg:max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-10 pb-10">
          {/* Desktop Layout with sidebar info */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Form - Center on desktop */}
            <div className="lg:col-span-6 lg:col-start-4">
              <AGDForm />
            </div>

            {/* Side Info Cards - Desktop only */}
            <div className="hidden lg:block lg:col-span-3 lg:col-start-1 lg:row-start-1 space-y-4">
              <div className="medical-card sticky top-24">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Tentang Alat Ini
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Kalkulator ini membantu interpretasi hasil Analisa Gas Darah (AGD) secara otomatis berdasarkan nilai yang dimasukkan.
                </p>
                <Link 
                  to="/petunjuk" 
                  className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                >
                  Lihat Petunjuk Lengkap →
                </Link>
              </div>

              <div className="medical-card">
                <h3 className="font-semibold text-foreground mb-3">Kapan Menggunakan?</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span>Evaluasi status asam-basa pasien</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span>Menilai fungsi respirasi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span>Monitoring pasien kritis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                    <span>Pendidikan dan pembelajaran</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right sidebar - Desktop only */}
            <div className="hidden lg:block lg:col-span-3 space-y-4">
              <div className="medical-card sticky top-24">
                <h3 className="font-semibold text-foreground mb-3">Nilai Referensi</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">pH</span>
                    <span className="font-medium text-foreground">7.35 - 7.45</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">PaCO₂</span>
                    <span className="font-medium text-foreground">35 - 45 mmHg</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">HCO₃⁻</span>
                    <span className="font-medium text-foreground">22 - 26 mEq/L</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">PaO₂</span>
                    <span className="font-medium text-foreground">80 - 100 mmHg</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">SpO₂</span>
                    <span className="font-medium text-foreground">≥ 94%</span>
                  </div>
                </div>
              </div>

              <div className="medical-card bg-secondary/30">
                <h3 className="font-semibold text-secondary-foreground mb-2 text-sm">Catatan Penting</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Hasil interpretasi ini bersifat panduan dan harus dikonfirmasi dengan kondisi klinis pasien serta penilaian dokter.
                </p>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="mt-8 lg:mt-12 text-center">
            <p className="text-xs text-muted-foreground">
              Alat bantu interpretasi AGD untuk tenaga kesehatan.
              <br />
              Selalu konfirmasi dengan kondisi klinis pasien.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default Index;
