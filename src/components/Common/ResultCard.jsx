import React, { useState } from 'react';
import { Copy, Share2, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../../i18n/translations';

export default function ResultCard({
  title = "",
  primaryLabel = "",
  primaryValue = "",
  badgeText = "",
  badgeColor = "green", // green | red | blue | amber
  items = [],
  currencySymbol = "₹",
  onCopyText = "",
  lang = "en"
}) {
  const [copied, setCopied] = useState(false);
  const t = translations[lang] || translations.en;

  const cardTitle = title || t.summaryTitle;

  const handleCopy = () => {
    if (!onCopyText) return;
    navigator.clipboard.writeText(onCopyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share && onCopyText) {
      navigator.share({
        title: cardTitle,
        text: onCopyText
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="skeuo-calculator-casing p-4 md:p-6 mb-6">
      {/* Decorative Screws */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="skeuo-screw"></div>
          <span className="text-xs font-mono tracking-widest text-slate-300 font-bold uppercase">{cardTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          {badgeText && (
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide border ${
              badgeColor === 'green' ? 'bg-emerald-950 text-emerald-300 border-emerald-700' :
              badgeColor === 'red' ? 'bg-rose-950 text-rose-300 border-rose-700' :
              badgeColor === 'amber' ? 'bg-amber-950 text-amber-300 border-amber-700' :
              'bg-blue-950 text-blue-300 border-blue-700'
            }`}>
              {badgeText}
            </span>
          )}
          <div className="skeuo-screw"></div>
        </div>
      </div>

      {/* Main LCD Screen */}
      <div className="skeuo-lcd-display mb-4">
        {primaryLabel && (
          <div className="text-xs font-mono text-emerald-400 opacity-80 uppercase tracking-widest mb-1">
            {primaryLabel}
          </div>
        )}
        <div className="skeuo-lcd-text text-2xl sm:text-4xl text-emerald-400 break-words font-extrabold flex items-center justify-between">
          <span>{primaryValue}</span>
          <button
            onClick={triggerConfetti}
            title="Celebrate Target"
            className="text-emerald-500 hover:text-emerald-300 transition-colors p-1 opacity-70 hover:opacity-100"
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Grid of Sub-results */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {items.map((it, idx) => (
            <div key={idx} className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-lg shadow-inner">
              <div className="text-[10px] sm:text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                {it.label}
              </div>
              <div className={`font-mono text-sm sm:text-base font-bold ${
                it.highlight === 'green' ? 'text-emerald-400' :
                it.highlight === 'red' ? 'text-rose-400' :
                it.highlight === 'amber' ? 'text-amber-400' :
                it.highlight === 'blue' ? 'text-sky-400' : 'text-slate-200'
              }`}>
                {it.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="skeuo-btn skeuo-btn-neutral flex-1 text-xs sm:text-sm py-2 gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? t.copied : t.copyResult}</span>
        </button>
        <button
          onClick={handleShare}
          className="skeuo-btn skeuo-btn-primary flex-1 text-xs sm:text-sm py-2 gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span>{t.share}</span>
        </button>
      </div>
    </div>
  );
}
