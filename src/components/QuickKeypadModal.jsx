import React, { useState } from 'react';
import { Calculator, X, Delete } from 'lucide-react';
import { formatCurrency, formatWeightSmart } from '../utils/formatters';

export default function QuickKeypadModal({ isOpen, onClose, currencySymbol }) {
  // Clean initial empty state
  const [sellingPrice, setSellingPrice] = useState('');
  const [customerAmount, setCustomerAmount] = useState('');
  const [activeInput, setActiveInput] = useState('amount'); // 'price' | 'amount'

  if (!isOpen) return null;

  const rate = Number(sellingPrice) || 0;
  const amt = Number(customerAmount) || 0;
  const weightInKg = rate > 0 ? amt / rate : 0;
  const smartWeight = formatWeightSmart(weightInKg);

  const handleKeyPress = (char) => {
    if (activeInput === 'price') {
      if (char === 'C') setSellingPrice('');
      else if (char === 'DEL') setSellingPrice(sellingPrice.slice(0, -1));
      else setSellingPrice(sellingPrice + char);
    } else {
      if (char === 'C') setCustomerAmount('');
      else if (char === 'DEL') setCustomerAmount(customerAmount.slice(0, -1));
      else setCustomerAmount(customerAmount + char);
    }
  };

  const handlePreset = (presetAmt) => {
    setCustomerAmount(presetAmt.toString());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="skeuo-calculator-casing w-full max-w-md p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base text-slate-100 font-mono">
              త్వరిత కస్టమర్ కీప్యాడ్
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LCD Screen Display */}
        <div className="skeuo-lcd-display space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-emerald-400 opacity-80">
            <span>అమ్మకం రేటు: {currencySymbol}{sellingPrice || '0'}/కిలో</span>
            <span>కస్టమర్ ₹: {currencySymbol}{customerAmount || '0'}</span>
          </div>

          <div className="text-center py-2 border-t border-b border-emerald-950">
            <div className="text-[10px] font-mono text-emerald-400/70 uppercase">కస్టమర్‌కు ఇవ్వాల్సిన బరువు</div>
            <div className="skeuo-lcd-text text-3xl sm:text-4xl text-emerald-400 font-extrabold">
              {smartWeight}
            </div>
          </div>
        </div>

        {/* Input Focus Toggle Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveInput('price')}
            className={`skeuo-btn text-xs py-2 ${
              activeInput === 'price' ? 'skeuo-btn-primary' : 'skeuo-btn-neutral'
            }`}
          >
            రేటు మార్చు ({currencySymbol}/కిలో): {sellingPrice || '0'}
          </button>
          <button
            onClick={() => setActiveInput('amount')}
            className={`skeuo-btn text-xs py-2 ${
              activeInput === 'amount' ? 'skeuo-btn-amber' : 'skeuo-btn-neutral'
            }`}
          >
            రూపాయలు మార్చు: {customerAmount || '0'}
          </button>
        </div>

        {/* Quick Amount Presets */}
        <div className="grid grid-cols-5 gap-1.5">
          {[5, 10, 20, 50, 100].map((preset) => (
            <button
              key={preset}
              onClick={() => handlePreset(preset)}
              className="skeuo-btn skeuo-btn-neutral text-xs py-1.5 font-bold font-mono"
            >
              {currencySymbol}{preset}
            </button>
          ))}
        </div>

        {/* Tactile Keypad */}
        <div className="grid grid-cols-3 gap-2">
          {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'DEL'].map((btn) => (
            <button
              key={btn}
              onClick={() => handleKeyPress(btn)}
              className={`skeuo-btn skeuo-keypad-btn ${
                btn === 'DEL' ? 'skeuo-btn-danger text-sm' : 'skeuo-btn-neutral text-xl'
              }`}
            >
              {btn === 'DEL' ? <Delete className="w-5 h-5 mx-auto" /> : btn}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleKeyPress('C')}
          className="skeuo-btn skeuo-btn-danger w-full py-2 text-xs font-mono"
        >
          రీసెట్ (CLEAR)
        </button>
      </div>
    </div>
  );
}
