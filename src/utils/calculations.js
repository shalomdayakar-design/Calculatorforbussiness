/**
 * Pure calculation functions for all modules in Small Business Master Calculator
 */

// 1. Buying & Selling Calculator
export const calcBuyingSelling = ({
  numContainers = 1,
  qtyPerContainer = 1,
  purchasePricePerContainer = 0,
  profitMode = 'perContainer', // 'perContainer' | 'totalProfit' | 'percent'
  profitInputValue = 0
}) => {
  const containers = Math.max(0, Number(numContainers) || 0);
  const qtyPer = Math.max(0, Number(qtyPerContainer) || 0);
  const purchasePrice = Math.max(0, Number(purchasePricePerContainer) || 0);
  const profitVal = Number(profitInputValue) || 0;

  const totalQty = containers * qtyPer;
  const totalPurchaseCost = containers * purchasePrice;
  const costPerKg = totalQty > 0 ? totalPurchaseCost / totalQty : 0;
  const costPerGram = costPerKg / 1000;

  let totalProfit = 0;
  let sellingPricePerContainer = purchasePrice;

  if (profitMode === 'perContainer') {
    totalProfit = containers * profitVal;
    sellingPricePerContainer = purchasePrice + profitVal;
  } else if (profitMode === 'totalProfit') {
    totalProfit = profitVal;
    sellingPricePerContainer = containers > 0 ? (totalPurchaseCost + profitVal) / containers : 0;
  } else if (profitMode === 'percent') {
    totalProfit = (totalPurchaseCost * profitVal) / 100;
    sellingPricePerContainer = purchasePrice * (1 + profitVal / 100);
  }

  const totalSellingAmount = totalPurchaseCost + totalProfit;
  const requiredSellingPricePerKg = totalQty > 0 ? totalSellingAmount / totalQty : 0;
  const requiredSellingPricePerGram = requiredSellingPricePerKg / 1000;
  const profitPercent = totalPurchaseCost > 0 ? (totalProfit / totalPurchaseCost) * 100 : 0;

  return {
    containers,
    totalQty,
    totalPurchaseCost,
    costPerKg,
    costPerGram,
    sellingPricePerContainer,
    requiredSellingPricePerKg,
    requiredSellingPricePerGram,
    totalSellingAmount,
    totalProfit,
    profitPercent
  };
};

// 2. Customer ₹10 / ₹20 / ₹50 Calculator (Given selling price per kg & customer ₹)
export const calcCustomerWeight = (sellingPricePerKg, customerAmountRupees) => {
  const rate = Math.max(0, Number(sellingPricePerKg) || 0);
  const amount = Math.max(0, Number(customerAmountRupees) || 0);

  if (rate <= 0 || amount <= 0) {
    return { weightInKg: 0, weightInGrams: 0, costOfProduct: 0 };
  }

  const weightInKg = amount / rate;
  const weightInGrams = weightInKg * 1000;

  return {
    weightInKg,
    weightInGrams,
    amount
  };
};

// 3. Reverse Weight Calculator (Shopkeeper gives X grams at rate ₹/kg)
export const calcReverseWeight = (sellingPricePerKg, weightInGramsInput, costPricePerKg = 0) => {
  const rate = Math.max(0, Number(sellingPricePerKg) || 0);
  const grams = Math.max(0, Number(weightInGramsInput) || 0);
  const costRate = Math.max(0, Number(costPricePerKg) || 0);

  const weightInKg = grams / 1000;
  const customerPriceToCharge = weightInKg * rate;
  const costOfProduct = weightInKg * costRate;
  const profitEarned = customerPriceToCharge - costOfProduct;
  const profitPercent = costOfProduct > 0 ? (profitEarned / costOfProduct) * 100 : 0;

  return {
    weightInKg,
    weightInGrams: grams,
    customerPriceToCharge,
    costOfProduct,
    profitEarned,
    profitPercent
  };
};

// 4. Quantity Pricing Matrix (e.g. ₹700 for 20 kg)
export const calcQuantityPricing = (totalPrice, totalQtyKg) => {
  const price = Math.max(0, Number(totalPrice) || 0);
  const qty = Math.max(0, Number(totalQtyKg) || 0);

  const pricePerKg = qty > 0 ? price / qty : 0;
  const pricePerGram = pricePerKg / 1000;
  const price100g = pricePerGram * 100;
  const price250g = pricePerGram * 250;
  const price500g = pricePerGram * 500;

  return {
    pricePerKg,
    pricePerGram,
    price100g,
    price250g,
    price500g
  };
};

// 5. Profit & Loss Calculator
export const calcProfitLossModes = ({
  mode = 'modeA', // 'modeA' | 'modeB' | 'modeC' | 'modeD' | 'loss'
  costPrice = 0,
  sellingPrice = 0,
  desiredPercent = 0,
  desiredTotalProfit = 0,
  quantity = 1
}) => {
  const cost = Math.max(0, Number(costPrice) || 0);
  const sell = Math.max(0, Number(sellingPrice) || 0);
  const pct = Number(desiredPercent) || 0;
  const targetProfit = Number(desiredTotalProfit) || 0;
  const qty = Math.max(1, Number(quantity) || 1);

  let finalSelling = sell;
  let unitProfit = 0;
  let totalProfit = 0;
  let markupPct = 0;
  let marginPct = 0;
  let lossVal = 0;
  let lossPct = 0;

  if (mode === 'modeA') {
    // Profit per unit
    unitProfit = sell - cost;
    totalProfit = unitProfit * qty;
    markupPct = cost > 0 ? (unitProfit / cost) * 100 : 0;
    marginPct = sell > 0 ? (unitProfit / sell) * 100 : 0;
  } else if (mode === 'modeB') {
    // Profit percentage
    unitProfit = (cost * pct) / 100;
    finalSelling = cost + unitProfit;
    totalProfit = unitProfit * qty;
    markupPct = pct;
    marginPct = finalSelling > 0 ? (unitProfit / finalSelling) * 100 : 0;
  } else if (mode === 'modeC') {
    // Desired total profit
    totalProfit = targetProfit;
    unitProfit = totalProfit / qty;
    finalSelling = cost + unitProfit;
    markupPct = cost > 0 ? (unitProfit / cost) * 100 : 0;
    marginPct = finalSelling > 0 ? (unitProfit / finalSelling) * 100 : 0;
  } else if (mode === 'modeD') {
    // Margin percentage calculation
    unitProfit = sell - cost;
    totalProfit = unitProfit * qty;
    markupPct = cost > 0 ? (unitProfit / cost) * 100 : 0;
    marginPct = sell > 0 ? (unitProfit / sell) * 100 : 0;
  } else if (mode === 'loss') {
    lossVal = Math.max(0, cost - sell);
    const totalLoss = lossVal * qty;
    lossPct = cost > 0 ? (lossVal / cost) * 100 : 0;
    return {
      costPrice: cost,
      sellingPrice: sell,
      unitLoss: lossVal,
      totalLoss,
      lossPct
    };
  }

  return {
    costPrice: cost,
    sellingPrice: finalSelling,
    unitProfit,
    totalProfit,
    totalSales: finalSelling * qty,
    markupPct,
    marginPct
  };
};

// 6. Wastage & Damage Calculator (Vegetables / Fruits)
export const calcWastage = ({
  purchasedQtyKg = 100,
  purchasePriceTotal = 3000,
  wastagePercent = 10,
  desiredTotalProfit = 500
}) => {
  const qty = Math.max(0, Number(purchasedQtyKg) || 0);
  const cost = Math.max(0, Number(purchasePriceTotal) || 0);
  const wastePct = Math.max(0, Math.min(100, Number(wastagePercent) || 0));
  const profitTarget = Number(desiredTotalProfit) || 0;

  const originalCostPerKg = qty > 0 ? cost / qty : 0;
  const wastageQty = (qty * wastePct) / 100;
  const sellableQty = qty - wastageQty;
  
  // Real cost per kg of sellable product
  const realCostPerKg = sellableQty > 0 ? cost / sellableQty : 0;
  const totalTargetSales = cost + profitTarget;
  const requiredSellingPricePerKg = sellableQty > 0 ? totalTargetSales / sellableQty : 0;

  return {
    purchasedQtyKg: qty,
    purchasePriceTotal: cost,
    originalCostPerKg,
    wastageQty,
    sellableQty,
    realCostPerKg,
    totalTargetSales,
    requiredSellingPricePerKg,
    desiredTotalProfit: profitTarget
  };
};

// 7. Loan & Interest Calculator
export const calcLoan = ({
  principal = 10000,
  rate = 12,
  ratePeriod = 'yearly', // 'daily' | 'monthly' | 'yearly'
  type = 'simple', // 'simple' | 'compound' | 'emi'
  durationMonths = 12
}) => {
  const P = Math.max(0, Number(principal) || 0);
  const R = Math.max(0, Number(rate) || 0);
  const M = Math.max(1, Number(durationMonths) || 1);

  // Normalize annual rate
  let annualRate = R;
  if (ratePeriod === 'monthly') annualRate = R * 12;
  if (ratePeriod === 'daily') annualRate = R * 365;

  const monthlyRate = annualRate / 12 / 100;

  let totalInterest = 0;
  let totalRepayment = P;
  let emi = 0;
  let amortization = [];

  if (type === 'simple') {
    const years = M / 12;
    totalInterest = P * (annualRate / 100) * years;
    totalRepayment = P + totalInterest;
    emi = totalRepayment / M;
  } else if (type === 'compound') {
    const years = M / 12;
    totalRepayment = P * Math.pow(1 + annualRate / 100, years);
    totalInterest = totalRepayment - P;
    emi = totalRepayment / M;
  } else if (type === 'emi') {
    if (monthlyRate > 0) {
      emi = (P * monthlyRate * Math.pow(1 + monthlyRate, M)) / (Math.pow(1 + monthlyRate, M) - 1);
      totalRepayment = emi * M;
      totalInterest = totalRepayment - P;

      let balance = P;
      for (let i = 1; i <= M; i++) {
        const monthInterest = balance * monthlyRate;
        const monthPrincipal = emi - monthInterest;
        balance = Math.max(0, balance - monthPrincipal);
        amortization.push({
          month: i,
          principalPaid: monthPrincipal,
          interestPaid: monthInterest,
          balance
        });
      }
    } else {
      emi = P / M;
      totalRepayment = P;
      totalInterest = 0;
    }
  }

  const monthlyApproxInterest = M > 0 ? totalInterest / M : 0;
  const dailyApproxInterest = monthlyApproxInterest / 30;
  const yearlyApproxInterest = monthlyApproxInterest * 12;

  return {
    principal: P,
    annualRate,
    durationMonths: M,
    dailyApproxInterest,
    monthlyInterest: monthlyApproxInterest,
    yearlyInterest: yearlyApproxInterest,
    totalInterest,
    totalRepayment,
    emi,
    amortization
  };
};

// 8. Land & Agriculture Measurement Calculator
export const calcLandArea = (length, width, dimUnit = 'feet', customFactors = {}) => {
  const l = Math.max(0, Number(length) || 0);
  const w = Math.max(0, Number(width) || 0);

  let sqFeet = 0;
  if (dimUnit === 'feet') sqFeet = l * w;
  else if (dimUnit === 'meters') sqFeet = l * w * 10.7639;
  else if (dimUnit === 'yards') sqFeet = l * w * 9;

  // Standard Indian Land Units
  const sqYards = sqFeet / 9;
  const sqMeters = sqFeet / 10.7639;
  const acres = sqFeet / (customFactors.acreToSqFt || 43560);
  const cents = sqFeet / (customFactors.centToSqFt || 435.6);
  const gunthas = sqFeet / (customFactors.gunthaToSqFt || 1089);
  const hectares = sqFeet / 107639.1;
  const grounds = sqFeet / 2400;

  return {
    sqFeet,
    sqYards,
    sqMeters,
    acres,
    cents,
    gunthas,
    hectares,
    grounds
  };
};

// 9. Liquid Volume Calculator
export const calcLiquidPrice = (pricePerLitre, customerAmount, giveMl = 0) => {
  const rate = Math.max(0, Number(pricePerLitre) || 0);
  const amount = Math.max(0, Number(customerAmount) || 0);
  const ml = Math.max(0, Number(giveMl) || 0);

  const volumeToGiveLitres = rate > 0 ? amount / rate : 0;
  const volumeToGiveMl = volumeToGiveLitres * 1000;

  const costForMl = rate > 0 ? (ml / 1000) * rate : 0;

  return {
    pricePerLitre: rate,
    customerAmount: amount,
    volumeToGiveLitres,
    volumeToGiveMl,
    giveMlInput: ml,
    costForMl
  };
};

// 10. Universal Measurement Converter
export const convertMeasurement = (value, fromUnit, toUnit, category) => {
  const val = Number(value) || 0;
  if (fromUnit === toUnit) return val;

  // Weight conversion to base unit (kg)
  const weightFactors = { mg: 0.000001, g: 0.001, kg: 1, tonne: 1000 };
  if (category === 'weight') {
    const baseKg = val * weightFactors[fromUnit];
    return baseKg / weightFactors[toUnit];
  }

  // Length conversion to base unit (meters)
  const lengthFactors = { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.34 };
  if (category === 'length') {
    const baseMeters = val * lengthFactors[fromUnit];
    return baseMeters / lengthFactors[toUnit];
  }

  // Area conversion to base unit (sq ft)
  const areaFactors = { sqft: 1, sqyd: 9, sqm: 10.7639, acre: 43560, cent: 435.6, hectare: 107639.1 };
  if (category === 'area') {
    const baseSqFt = val * areaFactors[fromUnit];
    return baseSqFt / areaFactors[toUnit];
  }

  // Volume conversion to base unit (litres)
  const volumeFactors = { ml: 0.001, litre: 1, m3: 1000, gallon: 3.78541 };
  if (category === 'volume') {
    const baseLitres = val * volumeFactors[fromUnit];
    return baseLitres / volumeFactors[toUnit];
  }

  // Temperature
  if (category === 'temp') {
    let celsius = val;
    if (fromUnit === 'fahrenheit') celsius = (val - 32) * (5 / 9);
    if (fromUnit === 'kelvin') celsius = val - 273.15;

    if (toUnit === 'celsius') return celsius;
    if (toUnit === 'fahrenheit') return (celsius * 9 / 5) + 32;
    if (toUnit === 'kelvin') return celsius + 273.15;
  }

  return val;
};

// 11. Quick 10-Second Selling Price Calculator
export const calcQuickSellingPrice = (purchaseTotal, qtyKg, targetProfitTotal) => {
  const cost = Math.max(0, Number(purchaseTotal) || 0);
  const qty = Math.max(0, Number(qtyKg) || 0);
  const profit = Number(targetProfitTotal) || 0;

  const totalSales = cost + profit;
  const sellingPricePerKg = qty > 0 ? totalSales / qty : 0;
  const costPerKg = qty > 0 ? cost / qty : 0;

  return {
    cost,
    qty,
    profit,
    totalSales,
    costPerKg,
    sellingPricePerKg
  };
};

// 12. Daily Business & Net Profit Calculator
export const calcDailyBusiness = (salesArg = 0, purchasesArg = 0, expensesListArg = []) => {
  let sales = salesArg;
  let purchases = purchasesArg;
  let expensesList = expensesListArg;

  if (typeof salesArg === 'object' && salesArg !== null) {
    sales = salesArg.sales || 0;
    purchases = salesArg.purchases || 0;
    expensesList = salesArg.expensesList || [];
  }

  const totalPurchases = Math.max(0, Number(purchases) || 0);
  const totalSales = Math.max(0, Number(sales) || 0);
  
  const totalExpenses = Array.isArray(expensesList) 
    ? expensesList.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
    : 0;
  const netProfit = totalSales - totalPurchases - totalExpenses;
  const profitMarginPct = totalSales > 0 ? (netProfit / totalSales) * 100 : 0;

  return {
    totalPurchases,
    totalSales,
    totalExpenses,
    netProfit,
    profitMarginPct
  };
};

// 13. Break-Even Calculator
export const calcBreakEven = ({ purchaseCostUnit = 0, fixedExpenses = 0, variableCostUnit = 0, quantity = 1, desiredProfit = 0 }) => {
  const costUnit = Math.max(0, Number(purchaseCostUnit) || 0);
  const fixed = Math.max(0, Number(fixedExpenses) || 0);
  const variableUnit = Math.max(0, Number(variableCostUnit) || 0);
  const qty = Math.max(1, Number(quantity) || 1);
  const profitTarget = Number(desiredProfit) || 0;

  const totalVariableCost = (costUnit + variableUnit) * qty;
  const totalCost = fixed + totalVariableCost;
  
  const breakEvenPricePerUnit = qty > 0 ? totalCost / qty : 0;
  const requiredSalesForProfit = totalCost + profitTarget;
  const requiredPricePerUnit = qty > 0 ? requiredSalesForProfit / qty : 0;

  return {
    totalCost,
    fixedExpenses: fixed,
    totalVariableCost,
    breakEvenPricePerUnit,
    noLossSellingPricePerUnit: breakEvenPricePerUnit,
    requiredSalesForProfit,
    requiredPricePerUnit,
    targetSellingPricePerUnit: requiredPricePerUnit,
    totalCosts: totalCost
  };
};

export const calcBreakEvenPrice = calcBreakEven;

// 14. Multi-Product Basket Calculator
export const calcMultiProductBasket = (items = []) => {
  let totalInvestment = 0;
  let totalRevenue = 0;
  let totalProfit = 0;

  items.forEach((item) => {
    const containers = Number(item.numContainers) || 0;
    const pricePerContainer = Number(item.unitPrice) || 0;
    const profitPerContainer = Number(item.targetProfitPerContainer) || 0;

    const itemCost = containers * pricePerContainer;
    const itemProfit = containers * profitPerContainer;
    const itemRevenue = itemCost + itemProfit;

    totalInvestment += itemCost;
    totalProfit += itemProfit;
    totalRevenue += itemRevenue;
  });

  return {
    totalInvestment,
    totalRevenue,
    totalProfit
  };
};

// 15. Invoice Totals Calculator
export const calcInvoiceTotals = (items = [], discountAmount = 0) => {
  const subtotal = items.reduce((sum, item) => {
    const qty = Number(item.qty) || 0;
    const rate = Number(item.rate) || 0;
    return sum + qty * rate;
  }, 0);

  const discount = Math.max(0, Number(discountAmount) || 0);
  const grandTotal = Math.max(0, subtotal - discount);

  return {
    subtotal,
    discount,
    grandTotal
  };
};

