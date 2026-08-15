import React, { useState } from 'react';
import { MapPin, Save } from 'lucide-react';
import { calcLandArea } from '../../utils/calculations';
import { formatNumber } from '../../utils/formatters';
import { saveToHistory } from '../../utils/storage';
import { translations } from '../../i18n/translations';
import ResultCard from '../Common/ResultCard';

export default function LandCalc({ lang = 'te', customLandFactors }) {
  const t = translations[lang] || translations.te;

  // Clean empty initial state
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [dimUnit, setDimUnit] = useState('feet');

  const result = calcLandArea(length, width, dimUnit, customLandFactors);

  const handleSave = () => {
    saveToHistory({
      type: t.navLand,
      productName: 'పొలం స్థలం కొలత',
      details: `${length || 0} × ${width || 0} ${dimUnit}`,
      sqFeet: `${formatNumber(result.sqFeet, 0)} sq ft`,
      cents: `${formatNumber(result.cents, 2)} సెంట్లు`,
      acres: `${formatNumber(result.acres, 3)} ఎకరాలు`
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold shadow-md">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navLand}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navLandSub}
          </p>
        </div>
      </div>

      <ResultCard
        title={t.totalSquareFeet}
        primaryLabel={t.totalSquareFeet}
        primaryValue={`${formatNumber(result.sqFeet, 0)} SQ FT`}
        badgeText={`${formatNumber(result.cents, 2)} CENTS`}
        badgeColor="green"
        items={[
          { label: t.squareYards, value: `${formatNumber(result.sqYards, 1)} sq yd`, highlight: 'blue' },
          { label: t.squareMeters, value: `${formatNumber(result.sqMeters, 1)} sq m`, highlight: 'blue' },
          { label: t.centsDismil, value: `${formatNumber(result.cents, 2)} cents`, highlight: 'green' },
          { label: t.gunthasGuntas, value: `${formatNumber(result.gunthas, 2)} gunthas`, highlight: 'amber' },
          { label: t.acres, value: `${formatNumber(result.acres, 4)} acres`, highlight: 'green' },
          { label: t.hectares, value: `${formatNumber(result.hectares, 4)} ha`, highlight: 'slate' },
        ]}
        onCopyText={`${t.totalSquareFeet}: ${formatNumber(result.sqFeet, 0)} sq ft`}
        lang={lang}
      />

      <div className="skeuo-calculator-casing p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.lengthLabel}
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.widthLabel}
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="0"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              {t.dimensionUnitLabel}
            </label>
            <select
              value={dimUnit}
              onChange={(e) => setDimUnit(e.target.value)}
              className="skeuo-input w-full cursor-pointer"
            >
              <option value="feet">{t.unitFeet}</option>
              <option value="meters">{t.unitMeters}</option>
              <option value="yards">{t.unitYards}</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={handleSave} className="skeuo-btn skeuo-btn-success flex-1 gap-2">
            <Save className="w-4 h-4" />
            <span>{t.saveResult}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
