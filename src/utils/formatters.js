/**
 * Formatting utilities for Small Business Master Calculator
 */

export const formatCurrency = (val, currencySymbol = '₹', decimals = 2) => {
  if (val === undefined || val === null || isNaN(val)) return `${currencySymbol}0.00`;
  const num = Number(val);
  return `${currencySymbol}${num.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}`;
};

export const formatNumber = (val, decimals = 2) => {
  if (val === undefined || val === null || isNaN(val)) return '0';
  const num = Number(val);
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
};

/**
 * Smart weight display for shopkeepers.
 * Example: 0.250 kg -> 250 grams
 * Example: 1.250 kg -> 1 kg 250 grams
 * Example: 0.33333 kg -> 333 g (approx)
 */
export const formatWeightSmart = (weightInKg) => {
  if (!weightInKg || isNaN(weightInKg) || weightInKg <= 0) return '0 grams';
  
  const totalGrams = weightInKg * 1000;
  
  if (totalGrams < 1) {
    const mg = (totalGrams * 1000).toFixed(0);
    return `${mg} mg approx`;
  }
  
  if (totalGrams < 1000) {
    const roundedGrams = Math.round(totalGrams);
    const exactGrams = totalGrams.toFixed(1);
    const isApprox = Math.abs(roundedGrams - totalGrams) > 0.05;
    return isApprox ? `${roundedGrams} grams approx (${exactGrams} g)` : `${roundedGrams} grams`;
  }
  
  const kg = Math.floor(weightInKg);
  const remGrams = Math.round((weightInKg - kg) * 1000);
  
  if (remGrams === 0) {
    return `${kg} kg`;
  }
  
  return `${kg} kg ${remGrams} grams`;
};

/**
 * Volume smart display for liquids (ML and Litres)
 */
export const formatVolumeSmart = (volumeInLitres) => {
  if (!volumeInLitres || isNaN(volumeInLitres) || volumeInLitres <= 0) return '0 ml';
  
  const totalMl = volumeInLitres * 1000;
  if (totalMl < 1000) {
    const roundedMl = Math.round(totalMl);
    const isApprox = Math.abs(roundedMl - totalMl) > 0.05;
    return isApprox ? `${roundedMl} ml approx` : `${roundedMl} ml`;
  }
  
  const L = Math.floor(volumeInLitres);
  const remMl = Math.round((volumeInLitres - L) * 1000);
  if (remMl === 0) return `${L} Litres`;
  return `${L} L ${remMl} ml`;
};

export const formatDate = (date = new Date()) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
