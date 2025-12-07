# 🩺 **AGD Interpretation Tool**

Website mobile-first untuk membantu pengguna menginterpretasikan **Analisa Gas Darah (AGD) / Arterial Blood Gas (ABG)** secara otomatis berdasarkan nilai pH, PaCO₂, HCO₃, PaO₂, dan SpO₂.

Aplikasi ini cocok untuk mahasiswa kedokteran, tenaga kesehatan, dan klinisi yang ingin melakukan interpretasi cepat AGD secara akurat.

---

## ⚙️ **Fitur Utama**

* ✏️ Input nilai AGD (pH, PaCO₂, HCO₃, PaO₂, SpO₂)
* 🤖 Interpretasi otomatis:

  * Status asam–basa
  * Gangguan primer (respiratorik/metabolik)
  * Tingkat kompensasi
  * Status oksigenasi
  * Kesimpulan klinis
* 📚 Halaman **Petunjuk Interpretasi AGD**
* 📱 UI mobile-first dan responsif
* 💾 (Opsional) Penyimpanan local history
* 🌐 Website dapat digunakan tanpa login

---

## 🧠 **Cara Kerja Interpretasi AGD**

Website menggunakan alur interpretasi berikut:

### 1️⃣ Tentukan status pH

* < 7.35 → Asidosis
* > 7.45 → Alkalosis

### 2️⃣ Tentukan gangguan primer

**Respiratorik:**

* PaCO₂ > 45 → Asidosis respiratorik
* PaCO₂ < 35 → Alkalosis respiratorik

**Metabolik:**

* HCO₃ < 22 → Asidosis metabolik
* HCO₃ > 26 → Alkalosis metabolik

### 3️⃣ Evaluasi kompensasi

* Respiratorik → lihat perubahan HCO₃
* Metabolik → lihat perubahan PaCO₂
* Output: tidak ada, parsial, atau penuh

### 4️⃣ Nilai oksigenasi

* PaO₂ < 80 → hipoksemia
* SpO₂ < 94% → hipoksemia

### 5️⃣ Hasil Akhir

Sistem membuat kesimpulan otomatis dalam format:

```
Interpretasi AGD:
- Status asam–basa
- Gangguan primer
- Kompensasi
- Oksigenasi

Kesimpulan: (contoh: Asidosis respiratorik akut dengan hipoksemia)
```

---

## 🖥️ **Teknologi yang Digunakan**

(Tergantung hasil Lovable, bisa edit sesuai stack)

* ⚛️ React / Next.js
* 🎨 Tailwind CSS
* 📱 Mobile-first layout
* 🔧 Custom AGD interpretation engine (JavaScript)
* 📁 LocalStorage (opsional)

---

## 📱 **Tampilan**

* Mobile-first
* Tampilan desktop responsif (menggunakan breakpoint Tailwind)
* Card-based layout
* Warna tema medis (putih + biru lembut)

---

## 📂 **Struktur Halaman**

* `/` — Halaman utama (form input AGD)
* `/petunjuk` — Panduan interpretasi AGD
* (opsional) `/history` — Riwayat interpretasi

---

## 🚀 **Cara Menjalankan (Jika pakai Next.js / React)**

```bash
npm install
npm run dev
```

Akses di:

```
http://localhost:3000
```

---

## 📦 **Build**

```bash
npm run build
npm run start
```

---

## 🧪 **Contoh Input & Output**

**Input:**

* pH: 7.25
* PaCO₂: 60
* HCO₃: 24
* PaO₂: 70
* SpO₂: 90%

**Output:**

```
Asidosis respiratorik akut dengan hipoksemia.
```

---

## 🤝 **Kontribusi**

Pull requests dan saran interpretasi AGD tambahan dipersilakan.

---

## 📜 **Lisensi**

Free to use for educational and clinical training purposes.
