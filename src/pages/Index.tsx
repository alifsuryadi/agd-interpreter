import { AGDForm } from "@/components/AGDForm";
import { Helmet } from "react-helmet-async";

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
        <div className="container max-w-md mx-auto px-4 py-6 pb-10">
          <AGDForm />
          
          {/* Footer */}
          <footer className="mt-8 text-center">
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
