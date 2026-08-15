import React, { useState } from 'react';
import { ShoppingBag, Save, RotateCcw } from 'lucide-react';
import { calcBuyingSelling } from '../../utils/calculations';
import { formatCurrency, formatNumber, formatWeightSmart } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function BuyingSellingCalc({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;

  // Clean empty initial state
  const [productName, setProductName] = useState('');
  const [containerType, setContainerType] = useState('Box');
  const [customUnit, setCustomUnit] = useState('');
  const [numContainers, setNumContainers] = useState('');
  const [qtyPerContainer, setQtyPerContainer] = useState('');
  const [qtyUnit, setQtyUnit] = useState('kg');
  const [purchasePricePerContainer, setPurchasePricePerContainer] = useState('');
  const [profitMode, setProfitMode] = useState('perContainer'); // perContainer | totalProfit | percent
  const [profitInputValue, setProfitInputValue] = useState('');

  const getContainerLabel = (typeKey) => {
    switch (typeKey) {
      case 'Box': return t.unitBox;
      case 'Bag': return t.unitBag;
      case 'Sack': return t.unitSack;
      case 'Bundle': return t.unitBundle;
      case 'Packet': return t.unitPacket;
      case 'Basket': return t.unitBasket;
      case 'Crate': return t.unitCrate;
      case 'Piece': return t.unitPiece;
      case 'Dozen': return t.unitDozen;
      case 'Pair': return t.unitPair;
      default: return customUnit || t.custom;
    }
  };

  const activeUnitName = containerType === 'Custom' ? (customUnit || t.custom) : getContainerLabel(containerType);

  const result = calcBuyingSelling({
    numContainers,
    qtyPerContainer,
    purchasePricePerContainer,
    profitMode,
    profitInputValue
  });

  const handleSave = () => {
    saveToHistory({
      type: t.navBuyingSelling,
      productName: productName || 'సరుకు',
      details: `${numContainers || 0} ${activeUnitName}s × ${qtyPerContainer || 0} ${qtyUnit}`,
      purchaseCost: result.totalPurchaseCost,
      sellingPrice: result.totalSellingAmount,
      profit: result.totalProfit,
      sellingPricePerKg: result.requiredSellingPricePerKg
    });
  };

  const handleReset = () => {
    setProductName('');
    setNumContainers('');
    setQtyPerContainer('');
    setPurchasePricePerContainer('');
    setProfitInputValue('');
    setCustomUnit('');
  };

  const copyText = `${t.productNameLabel}: ${productName || 'సరుకు'}
${t.totalPurchaseCost}: ${formatCurrency(result.totalPurchaseCost, currencySymbol)}
${t.totalQuantity}: ${result.totalQty} ${qtyUnit} (${formatWeightSmart(result.totalQty)})
${t.sellingPricePerContainer} ${activeUnitName}: ${formatCurrency(result.sellingPricePerContainer, currencySymbol)}
${t.requiredSellingPricePerKg}: ${formatCurrency(result.requiredSellingPricePerKg, currencySymbol)}
${t.pricePerGram}: ${formatCurrency(result.requiredSellingPricePerGram, currencySymbol, 4)}
${t.totalRevenue}: ${formatCurrency(result.totalSellingAmount, currencySymbol)}
${t.expectedProfit}: ${formatCurrency(result.totalProfit, currencySymbol)} (${formatNumber(result.profitPercent, 1)}%)`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navBuyingSelling}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navBuyingSellingSub}
          </p>
        </div>
      </div>

      {/* Result Display Card */}
      <ResultCard
        title={t.summaryTitle}
        primaryLabel={`${t.requiredSellingPricePerUnit} ${qtyUnit.toUpperCase()}`}
        primaryValue={formatCurrency(result.requiredSellingPricePerKg, currencySymbol)}
        badgeText={`${formatNumber(result.profitPercent, 1)}% PROFIT`}
        badgeColor="green"
        items={[
          { label: `${t.sellingPricePerContainer} ${activeUnitName.toUpperCase()}`, value: formatCurrency(result.sellingPricePerContainer, currencySymbol), highlight: 'green' },
          { label: t.pricePerGram, value: formatCurrency(result.requiredSellingPricePerGram, currencySymbol, 4), highlight: 'blue' },
          { label: t.totalPurchaseCost, value: formatCurrency(result.totalPurchaseCost, currencySymbol), highlight: 'amber' },
          { label: t.totalRevenue, value: formatCurrency(result.totalSellingAmount, currencySymbol), highlight: 'blue' },
          { label: t.expectedProfit, value: formatCurrency(result.totalProfit, currencySymbol), highlight: 'green' },
          { label: t.totalQuantity, value: `${result.totalQty} ${qtyUnit}`, highlight: 'amber' },
        ]}
        currencySymbol={currencySymbol}
        onCopyText={copyText}
        lang={lang}
      />

      {/* Input Casing */}
      <div className="skeuo-calculator-casing p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.productNameLabel}
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="ఉదా. ఆపిల్స్, టమోటాలు"
              className="skeuo-input w-full"
            />
          </div>

          {/* Container / Unit Selection */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.containerTypeLabel}
            </label>
            <select
              value={containerType}
              onChange={(e) => setContainerType(e.target.value)}
              className="skeuo-input w-full cursor-pointer"
            >
              <option value="Box">{t.unitBox}</option>
              <option value="Bag">{t.unitBag}</option>
              <option value="Sack">{t.unitSack}</option>
              <option value="Bundle">{t.unitBundle}</option>
              <option value="Packet">{t.unitPacket}</option>
              <option value="Basket">{t.unitBasket}</option>
              <option value="Crate">{t.unitCrate}</option>
              <option value="Piece">{t.unitPiece}</option>
              <option value="Dozen">{t.unitDozen}</option>
              <option value="Pair">{t.unitPair}</option>
              <option value="Custom">{t.unitCustom}</option>
            </select>
            {containerType === 'Custom' && (
              <input
                type="text"
                value={customUnit}
                onChange={(e) => setCustomUnit(e.target.value)}
                placeholder="కస్టమ్ కొలత పేరు"
                className="skeuo-input w-full mt-2"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Number of Containers */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.numberOfContainersLabel} ({activeUnitName})
            </label>
            <input
              type="number"
              value={numContainers}
              onChange={(e) => setNumContainers(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          {/* Qty per Container */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.qtyPerContainerLabel}
            </label>
            <input
              type="number"
              value={qtyPerContainer}
              onChange={(e) => setQtyPerContainer(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          {/* Unit of Qty */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.unitOfQuantityLabel}
            </label>
            <select
              value={qtyUnit}
              onChange={(e) => setQtyUnit(e.target.value)}
              className="skeuo-input w-full cursor-pointer"
            >
              <option value="kg">{t.unitKg}</option>
              <option value="gram">{t.unitGrams}</option>
              <option value="piece">{t.unitPieces}</option>
              <option value="litre">{t.unitLitres}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Purchase Price per Container */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.purchasePricePerContainerLabel} ({currencySymbol})
            </label>
            <input
              type="number"
              value={purchasePricePerContainer}
              onChange={(e) => setPurchasePricePerContainer(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          {/* Profit Target */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.desiredProfitTargetLabel}
            </label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setProfitMode('perContainer')}
                className={`text-xs py-1.5 px-2.5 rounded-lg font-bold border ${
                  profitMode === 'perContainer' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                లాభం/{activeUnitName}
              </button>
              <button
                type="button"
                onClick={() => setProfitMode('totalProfit')}
                className={`text-xs py-1.5 px-2.5 rounded-lg font-bold border ${
                  profitMode === 'totalProfit' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                మొత్తం లాభం
              </button>
              <button
                type="button"
                onClick={() => setProfitMode('percent')}
                className={`text-xs py-1.5 px-2.5 rounded-lg font-bold border ${
                  profitMode === 'percent' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                లాభం %
              </button>
            </div>
            <input
              type="number"
              value={profitInputValue}
              onChange={(e) => setProfitInputValue(e.target.value)}
              placeholder={profitMode === 'percent' ? '0%' : '0'}
              className="skeuo-input w-full"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="skeuo-btn skeuo-btn-success flex-1 gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{t.saveToHistory}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="skeuo-btn skeuo-btn-neutral gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.reset}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
