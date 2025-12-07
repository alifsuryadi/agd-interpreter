export interface AGDValues {
  pH: number;
  paCO2: number;
  hco3: number;
  paO2: number;
  spO2: number;
}

export interface AGDResult {
  phStatus: {
    label: string;
    status: 'normal' | 'abnormal' | 'warning';
    value: number;
  };
  primaryDisorder: {
    label: string;
    status: 'normal' | 'abnormal' | 'warning';
    type: string;
  };
  compensation: {
    label: string;
    status: 'normal' | 'warning' | 'abnormal';
    type: string;
  };
  oxygenation: {
    label: string;
    status: 'normal' | 'abnormal' | 'warning';
    paO2: number;
    spO2: number;
  };
  conclusion: string;
}

export function interpretAGD(values: AGDValues): AGDResult {
  const { pH, paCO2, hco3, paO2, spO2 } = values;

  // pH Status
  let phStatus: AGDResult['phStatus'];
  if (pH < 7.35) {
    phStatus = { label: 'Asidosis', status: 'abnormal', value: pH };
  } else if (pH > 7.45) {
    phStatus = { label: 'Alkalosis', status: 'abnormal', value: pH };
  } else {
    phStatus = { label: 'Normal', status: 'normal', value: pH };
  }

  // Primary Disorder Detection
  let primaryDisorder: AGDResult['primaryDisorder'];
  let disorderType = '';
  
  const isRespiratoryAcidosis = paCO2 > 45;
  const isRespiratoryAlkalosis = paCO2 < 35;
  const isMetabolicAcidosis = hco3 < 22;
  const isMetabolicAlkalosis = hco3 > 26;

  if (pH < 7.35) {
    // Acidosis
    if (isRespiratoryAcidosis && !isMetabolicAcidosis) {
      disorderType = 'respiratory_acidosis';
      primaryDisorder = { 
        label: 'Asidosis Respiratorik', 
        status: 'abnormal',
        type: 'respiratory'
      };
    } else if (isMetabolicAcidosis && !isRespiratoryAcidosis) {
      disorderType = 'metabolic_acidosis';
      primaryDisorder = { 
        label: 'Asidosis Metabolik', 
        status: 'abnormal',
        type: 'metabolic'
      };
    } else if (isRespiratoryAcidosis && isMetabolicAcidosis) {
      disorderType = 'mixed_acidosis';
      primaryDisorder = { 
        label: 'Asidosis Campuran (Respiratorik + Metabolik)', 
        status: 'abnormal',
        type: 'mixed'
      };
    } else {
      disorderType = 'uncompensated_acidosis';
      primaryDisorder = { 
        label: 'Asidosis (evaluasi lebih lanjut diperlukan)', 
        status: 'warning',
        type: 'unknown'
      };
    }
  } else if (pH > 7.45) {
    // Alkalosis
    if (isRespiratoryAlkalosis && !isMetabolicAlkalosis) {
      disorderType = 'respiratory_alkalosis';
      primaryDisorder = { 
        label: 'Alkalosis Respiratorik', 
        status: 'abnormal',
        type: 'respiratory'
      };
    } else if (isMetabolicAlkalosis && !isRespiratoryAlkalosis) {
      disorderType = 'metabolic_alkalosis';
      primaryDisorder = { 
        label: 'Alkalosis Metabolik', 
        status: 'abnormal',
        type: 'metabolic'
      };
    } else if (isRespiratoryAlkalosis && isMetabolicAlkalosis) {
      disorderType = 'mixed_alkalosis';
      primaryDisorder = { 
        label: 'Alkalosis Campuran (Respiratorik + Metabolik)', 
        status: 'abnormal',
        type: 'mixed'
      };
    } else {
      disorderType = 'uncompensated_alkalosis';
      primaryDisorder = { 
        label: 'Alkalosis (evaluasi lebih lanjut diperlukan)', 
        status: 'warning',
        type: 'unknown'
      };
    }
  } else {
    // Normal pH - check for compensated states
    if (isRespiratoryAcidosis && isMetabolicAlkalosis) {
      disorderType = 'compensated_respiratory_acidosis';
      primaryDisorder = { 
        label: 'Asidosis Respiratorik Terkompensasi', 
        status: 'warning',
        type: 'respiratory'
      };
    } else if (isRespiratoryAlkalosis && isMetabolicAcidosis) {
      disorderType = 'compensated_respiratory_alkalosis';
      primaryDisorder = { 
        label: 'Alkalosis Respiratorik Terkompensasi', 
        status: 'warning',
        type: 'respiratory'
      };
    } else if (isMetabolicAcidosis && isRespiratoryAlkalosis) {
      disorderType = 'compensated_metabolic_acidosis';
      primaryDisorder = { 
        label: 'Asidosis Metabolik Terkompensasi', 
        status: 'warning',
        type: 'metabolic'
      };
    } else if (isMetabolicAlkalosis && isRespiratoryAcidosis) {
      disorderType = 'compensated_metabolic_alkalosis';
      primaryDisorder = { 
        label: 'Alkalosis Metabolik Terkompensasi', 
        status: 'warning',
        type: 'metabolic'
      };
    } else {
      disorderType = 'normal';
      primaryDisorder = { 
        label: 'Tidak ada gangguan primer', 
        status: 'normal',
        type: 'none'
      };
    }
  }

  // Compensation Assessment
  let compensation: AGDResult['compensation'];
  
  if (disorderType === 'normal') {
    compensation = { 
      label: 'Tidak diperlukan', 
      status: 'normal',
      type: 'none'
    };
  } else if (disorderType.includes('mixed')) {
    compensation = { 
      label: 'Tidak dapat dinilai (gangguan campuran)', 
      status: 'warning',
      type: 'mixed'
    };
  } else if (disorderType.includes('compensated')) {
    compensation = { 
      label: 'Kompensasi penuh', 
      status: 'normal',
      type: 'full'
    };
  } else {
    // Check for partial compensation
    const isRespiratoryPrimary = disorderType.includes('respiratory');
    const isMetabolicPrimary = disorderType.includes('metabolic');
    
    if (isRespiratoryPrimary) {
      // Check HCO3 for compensation
      if (disorderType.includes('acidosis') && hco3 > 24) {
        compensation = { 
          label: 'Kompensasi parsial oleh metabolik', 
          status: 'warning',
          type: 'partial'
        };
      } else if (disorderType.includes('alkalosis') && hco3 < 24) {
        compensation = { 
          label: 'Kompensasi parsial oleh metabolik', 
          status: 'warning',
          type: 'partial'
        };
      } else {
        compensation = { 
          label: 'Belum ada kompensasi', 
          status: 'abnormal',
          type: 'none'
        };
      }
    } else if (isMetabolicPrimary) {
      // Check PaCO2 for compensation
      if (disorderType.includes('acidosis') && paCO2 < 40) {
        compensation = { 
          label: 'Kompensasi parsial oleh respiratorik', 
          status: 'warning',
          type: 'partial'
        };
      } else if (disorderType.includes('alkalosis') && paCO2 > 40) {
        compensation = { 
          label: 'Kompensasi parsial oleh respiratorik', 
          status: 'warning',
          type: 'partial'
        };
      } else {
        compensation = { 
          label: 'Belum ada kompensasi', 
          status: 'abnormal',
          type: 'none'
        };
      }
    } else {
      compensation = { 
        label: 'Tidak dapat dinilai', 
        status: 'warning',
        type: 'unknown'
      };
    }
  }

  // Oxygenation Status
  let oxygenation: AGDResult['oxygenation'];
  const isHypoxemic = paO2 < 80 || spO2 < 94;
  
  if (isHypoxemic) {
    let severity = '';
    if (paO2 < 60 || spO2 < 90) {
      severity = 'berat';
    } else {
      severity = 'ringan-sedang';
    }
    oxygenation = {
      label: `Hipoksemia ${severity}`,
      status: 'abnormal',
      paO2,
      spO2
    };
  } else {
    oxygenation = {
      label: 'Oksigenasi adekuat',
      status: 'normal',
      paO2,
      spO2
    };
  }

  // Generate Conclusion
  let conclusion = '';
  
  if (disorderType === 'normal' && !isHypoxemic) {
    conclusion = 'Hasil analisa gas darah dalam batas normal dengan oksigenasi yang adekuat.';
  } else {
    const parts: string[] = [];
    
    if (primaryDisorder.label !== 'Tidak ada gangguan primer') {
      parts.push(primaryDisorder.label.toLowerCase());
    }
    
    if (compensation.type === 'partial') {
      parts.push('dengan kompensasi parsial');
    } else if (compensation.type === 'full') {
      parts.push('dengan kompensasi penuh');
    } else if (compensation.type === 'none' && primaryDisorder.type !== 'none') {
      parts.push('tanpa kompensasi');
    }
    
    if (isHypoxemic) {
      parts.push(`disertai ${oxygenation.label.toLowerCase()}`);
    }
    
    if (parts.length > 0) {
      conclusion = `Pasien mengalami ${parts.join(' ')}.`;
    } else {
      conclusion = 'Evaluasi klinis lebih lanjut diperlukan.';
    }
  }

  return {
    phStatus,
    primaryDisorder,
    compensation,
    oxygenation,
    conclusion
  };
}

export function formatResultText(result: AGDResult, values: AGDValues): string {
  return `INTERPRETASI ANALISA GAS DARAH (AGD)
═══════════════════════════════════

📊 NILAI INPUT:
• pH: ${values.pH.toFixed(2)}
• PaCO₂: ${values.paCO2} mmHg
• HCO₃⁻: ${values.hco3} mEq/L
• PaO₂: ${values.paO2} mmHg
• SpO₂: ${values.spO2}%

📋 HASIL INTERPRETASI:

1. Status Asam-Basa: ${result.phStatus.label}
   (pH ${values.pH < 7.35 ? '< 7.35' : values.pH > 7.45 ? '> 7.45' : '7.35-7.45'})

2. Gangguan Primer: ${result.primaryDisorder.label}

3. Kompensasi: ${result.compensation.label}

4. Oksigenasi: ${result.oxygenation.label}
   (PaO₂: ${values.paO2} mmHg, SpO₂: ${values.spO2}%)

═══════════════════════════════════
📝 KESIMPULAN:
${result.conclusion}
═══════════════════════════════════

Catatan: Interpretasi ini bersifat panduan dan harus dikonfirmasi dengan kondisi klinis pasien.`;
}
