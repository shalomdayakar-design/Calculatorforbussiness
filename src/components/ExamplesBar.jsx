import React from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function ExamplesBar({ isOpen, onClose, onSelectExample, currencySymbol }) {
  if (!isOpen) return null;

  const examples = [
    {
      id: 'ex1',
      title: 'ఉదాహరణ 1: ఆపిల్ బాక్స్ లాభం',
      desc: '3 ఆపిల్ బాక్సులు @ ₹700/బాక్స్, బాక్స్‌కు 20 కిలోలు, ₹200 లాభం → కిలో అమ్మకం ధర ₹45/కిలో',
      targetNav: 'buyingSelling',
      data: {
        numContainers: 3,
        qtyPerContainer: 20,
        purchasePricePerContainer: 700,
        profitMode: 'perContainer',
        profitInputValue: 200,
        containerType: 'Box',
        productName: 'ఆపిల్స్'
      }
    },
    {
      id: 'ex2',
      title: 'ఉదాహరణ 2: ₹10 కస్టమర్ బరువు',
      desc: 'అమ్మకం ధర ₹40/కిలో, కస్టమర్ ₹10కి అడిగారు → ఇవ్వాల్సింది 250 గ్రాములు',
      targetNav: 'customerCalc',
      data: {
        sellingPricePerKg: 40,
        customerAmount: 10
      }
    },
    {
      id: 'ex3',
      title: 'ఉదాహరణ 3: ₹20 బరువు లెక్కింపు',
      desc: 'అమ్మకం ధర ₹80/కిలో, కస్టమర్ 250 గ్రాములు అడిగారు → వసూలు చేయాల్సినది ₹20',
      targetNav: 'reverseWeight',
      data: {
        sellingPricePerKg: 80,
        weightGrams: 250
      }
    },
    {
      id: 'ex4',
      title: 'ఉదాహరణ 4: ₹10,000 రుణం వడ్డీ',
      desc: '₹10,000 రుణం @ ₹1,200/నెల వడ్డీ → రోజువారీ మరియు నెలవారీ వివరాలు',
      targetNav: 'loanInterest',
      data: {
        principal: 10000,
        rate: 12,
        ratePeriod: 'monthly',
        durationMonths: 12
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="skeuo-calculator-casing w-full max-w-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base text-slate-100 font-mono">
              ఇంటరాక్టివ్ ఉదాహరణలు
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300">
          క్రింది ఉదాహరణలపై క్లిక్ చేసి క్యాలిక్యులేటర్‌లో ఆటోమేటిక్‌గా వివరాలు నింపండి!
        </p>

        <div className="space-y-3">
          {examples.map((ex) => (
            <div
              key={ex.id}
              onClick={() => { onSelectExample(ex); onClose(); }}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500 p-3.5 rounded-xl cursor-pointer group transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-extrabold text-sm text-emerald-400 font-mono group-hover:text-emerald-300">
                  {ex.title}
                </h4>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-300">
                {ex.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
