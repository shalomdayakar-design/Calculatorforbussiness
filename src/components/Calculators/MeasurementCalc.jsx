import React, { useState } from 'react';
import { Ruler, Save, ArrowRightLeft } from 'lucide-react';
import { convertMeasurement } from '../../utils/calculations';
import { formatNumber } from '../../utils/formatters';
import ResultCard from '../Common/ResultCard';

export default function MeasurementCalc({ lang }) {
  const [category, setCategory] = useState('weight');
  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('g');

  const unitOptions = {
    weight: [
      { id: 'mg', label: 'Milligram (mg)' },
      { id: 'g', label: 'Gram (g)' },
      { id: 'kg', label: 'Kilogram (kg)' },
      { id: 'tonne', label: 'Tonne (t)' },
    ],
    length: [
      { id: 'mm', label: 'Millimeter (mm)' },
      { id: 'cm', label: 'Centimeter (cm)' },
      { id: 'm', label: 'Meter (m)' },
      { id: 'km', label: 'Kilometer (km)' },
      { id: 'inch', label: 'Inch (in)' },
      { id: 'foot', label: 'Foot (ft)' },
      { id: 'yard', label: 'Yard (yd)' },
      { id: 'mile', label: 'Mile (mi)' },
    ],
    area: [
      { id: 'sqft', label: 'Square Feet (sq ft)' },
      { id: 'sqyd', label: 'Square Yards (sq yd)' },
      { id: 'sqm', label: 'Square Meters (sq m)' },
      { id: 'acre', label: 'Acres (ac)' },
      { id: 'cent', label: 'Cents (ct)' },
      { id: 'hectare', label: 'Hectares (ha)' },
    ],
    volume: [
      { id: 'ml', label: 'Milliliter (ml)' },
      { id: 'litre', label: 'Litre (L)' },
      { id: 'm3', label: 'Cubic Meter (m³)' },
      { id: 'gallon', label: 'Gallon (gal)' },
    ],
    temp: [
      { id: 'celsius', label: 'Celsius (°C)' },
      { id: 'fahrenheit', label: 'Fahrenheit (°F)' },
      { id: 'kelvin', label: 'Kelvin (K)' },
    ]
  };

  const convertedValue = convertMeasurement(inputValue, fromUnit, toUnit, category);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const opts = unitOptions[cat];
    if (opts && opts.length >= 2) {
      setFromUnit(opts[0].id);
      setToUnit(opts[1].id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-slate-600 flex items-center justify-center text-white font-bold shadow-md">
          <Ruler className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            Universal Measurement Converter
          </h2>
          <p className="text-xs text-slate-400">
            Convert Weight, Length, Area, Volume, Temperature units instantly
          </p>
        </div>
      </div>

      {/* Category selector buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
        {[
          { id: 'weight', label: 'Weight' },
          { id: 'length', label: 'Length' },
          { id: 'area', label: 'Area' },
          { id: 'volume', label: 'Volume' },
          { id: 'temp', label: 'Temp' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`skeuo-btn text-xs py-2 px-2.5 font-bold ${
              category === cat.id ? 'skeuo-btn-primary' : 'skeuo-btn-neutral'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <ResultCard
        title="CONVERSION RESULT"
        primaryLabel={`${inputValue} ${fromUnit.toUpperCase()} EQUALS`}
        primaryValue={`${formatNumber(convertedValue, 4)} ${toUnit.toUpperCase()}`}
        badgeText={category.toUpperCase()}
        badgeColor="blue"
        onCopyText={`${inputValue} ${fromUnit} = ${convertedValue} ${toUnit}`}
      />

      <div className="skeuo-calculator-casing p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              Enter Value
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="1"
              className="skeuo-input w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              From Unit
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="skeuo-input w-full cursor-pointer"
            >
              {(unitOptions[category] || []).map((u) => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              To Unit
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="skeuo-input w-full cursor-pointer"
            >
              {(unitOptions[category] || []).map((u) => (
                <option key={u.id} value={u.id}>{u.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={handleSwap}
            className="skeuo-btn skeuo-btn-neutral gap-2 text-xs"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Swap Units</span>
          </button>
        </div>
      </div>
    </div>
  );
}
