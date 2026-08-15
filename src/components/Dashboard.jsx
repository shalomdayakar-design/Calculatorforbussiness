import React from 'react';
import { 
  ShoppingBag, 
  Banknote, 
  Scale, 
  Percent, 
  Trash2, 
  Landmark, 
  MapPin, 
  Droplet, 
  Ruler, 
  Zap, 
  Boxes, 
  Receipt, 
  Calculator,
  TrendingUp,
  Sliders,
  DollarSign
} from 'lucide-react';
import { translations } from '../i18n/translations';

export default function Dashboard({ lang = 'te', setActiveNav, onOpenExamples }) {
  const t = translations[lang] || translations.te;

  const calculators = [
    {
      id: 'buyingSelling',
      title: t.navBuyingSelling,
      subtitle: t.navBuyingSellingSub,
      icon: ShoppingBag,
      color: 'from-emerald-600 to-teal-800',
      badge: 'BOX/BAG/SAK'
    },
    {
      id: 'customerCalc',
      title: t.navCustomerCalc,
      subtitle: t.navCustomerCalcSub,
      icon: Banknote,
      color: 'from-amber-600 to-orange-800',
      badge: '₹10/₹20/₹50'
    },
    {
      id: 'reverseWeight',
      title: t.navReverseWeight,
      subtitle: t.navReverseWeightSub,
      icon: Scale,
      color: 'from-blue-600 to-indigo-800',
      badge: 'GRAMS TO ₹'
    },
    {
      id: 'profitLoss',
      title: t.navProfitLoss,
      subtitle: t.navProfitLossSub,
      icon: Percent,
      color: 'from-purple-600 to-indigo-900',
      badge: 'MARGIN %'
    },
    {
      id: 'wastage',
      title: t.navWastage,
      subtitle: t.navWastageSub,
      icon: Trash2,
      color: 'from-rose-600 to-red-900',
      badge: 'VEGGIES/FRUITS'
    },
    {
      id: 'loanInterest',
      title: t.navLoanInterest,
      subtitle: t.navLoanInterestSub,
      icon: Landmark,
      color: 'from-sky-600 to-blue-900',
      badge: 'EMI & INTEREST'
    },
    {
      id: 'land',
      title: t.navLand,
      subtitle: t.navLandSub,
      icon: MapPin,
      color: 'from-emerald-700 to-green-900',
      badge: 'ACRES & CENTS'
    },
    {
      id: 'liquid',
      title: t.navLiquid,
      subtitle: t.navLiquidSub,
      icon: Droplet,
      color: 'from-cyan-600 to-blue-800',
      badge: 'LITRES & ML'
    },
    {
      id: 'converter',
      title: t.navConverter,
      subtitle: t.navConverterSub,
      icon: Ruler,
      color: 'from-slate-600 to-slate-800',
      badge: 'ALL UNITS'
    },
    {
      id: 'quickSelling',
      title: t.navQuickSelling,
      subtitle: t.navQuickSellingSub,
      icon: Zap,
      color: 'from-yellow-500 to-amber-700',
      badge: '10 SECONDS'
    },
    {
      id: 'multiProduct',
      title: t.navMultiProduct,
      subtitle: t.navMultiProductSub,
      icon: Boxes,
      color: 'from-teal-600 to-emerald-900',
      badge: 'BASKET'
    },
    {
      id: 'dailyBusiness',
      title: t.navDailyBusiness,
      subtitle: t.navDailyBusinessSub,
      icon: TrendingUp,
      color: 'from-violet-600 to-purple-900',
      badge: 'EXPENSES'
    },
    {
      id: 'breakEven',
      title: t.navBreakEven,
      subtitle: t.navBreakEvenSub,
      icon: DollarSign,
      color: 'from-indigo-600 to-slate-900',
      badge: 'NO-LOSS'
    },
    {
      id: 'invoice',
      title: t.navInvoice,
      subtitle: t.navInvoiceSub,
      icon: Receipt,
      color: 'from-amber-700 to-orange-950',
      badge: 'PRINT BILL'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-6">
      {/* Banner / Hero Card */}
      <div className="skeuo-calculator-casing p-3 sm:p-5 mb-4 sm:mb-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src="/logo.png"
            alt="Small Business Master Calculator Emblem"
            className="w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover shadow-xl border-2 border-amber-400/50"
          />
          <div>
            <h2 className="text-base sm:text-2xl font-extrabold text-slate-100 font-mono tracking-tight">
              {t.appTitle}
            </h2>
            <p className="text-[11px] sm:text-sm text-slate-300 mt-0.5 sm:mt-1 max-w-xl">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={onOpenExamples}
            className="skeuo-btn skeuo-btn-neutral text-xs sm:text-sm py-2 px-3 gap-2 flex-1 md:flex-initial"
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>{t.examples}</span>
          </button>
        </div>
      </div>

      {/* Ultra-Compact Responsive Grid of Calculators */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
        {calculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <div
              key={calc.id}
              onClick={() => setActiveNav(calc.id)}
              className="skeuo-calculator-casing p-2.5 sm:p-4 cursor-pointer group hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center text-white shadow-md border border-white/20 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono font-extrabold px-1.5 py-0.5 bg-slate-900/90 text-sky-400 border border-slate-700 rounded uppercase tracking-wider">
                    {calc.badge}
                  </span>
                </div>

                <h3 className="font-extrabold text-xs sm:text-base text-slate-100 mb-0.5 sm:mb-1 group-hover:text-emerald-400 transition-colors leading-tight">
                  {calc.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed hidden xs:block">
                  {calc.subtitle}
                </p>
              </div>

              <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-xs font-mono font-bold text-slate-300 group-hover:text-slate-100">
                <span>{t.openCalculator}</span>
                <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">➔</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
