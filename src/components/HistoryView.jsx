import React, { useState, useEffect } from 'react';
import { History, Trash2, X, Clock } from 'lucide-react';
import { getHistory, clearHistory, deleteHistoryItem } from '../utils/storage';
import { formatDate } from '../utils/formatters';

export default function HistoryView({ isOpen, onClose, currencySymbol }) {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setHistoryItems(getHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClearAll = () => {
    if (window.confirm('మీరు నిజంగా మొత్తం హిస్టరీని తొలగించాలనుకుంటున్నారా?')) {
      clearHistory();
      setHistoryItems([]);
    }
  };

  const handleDeleteOne = (id) => {
    deleteHistoryItem(id);
    setHistoryItems(getHistory());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="skeuo-calculator-casing w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-sky-400" />
            <h3 className="font-extrabold text-base text-slate-100 font-mono">
              లెక్కింపుల హిస్టరీ (History)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {historyItems.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-rose-400 hover:text-rose-300 font-mono font-bold px-2 py-1 bg-slate-900 border border-slate-800 rounded"
              >
                అన్నీ తొలగించు
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {historyItems.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-mono text-xs">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50 text-slate-500" />
              ఇప్పటివరకు ఏ లెక్కింపులు సేవ్ చేయలేదు. లెక్కింపు చేసిన తర్వాత "హిస్టరీలో సేవ్ చేయండి" పై క్లిక్ చేయండి!
            </div>
          ) : (
            historyItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 p-3 rounded-lg flex items-center justify-between gap-3 shadow-inner"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded uppercase">
                      {item.type || 'లెక్కింపు'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {formatDate(item.timestamp)}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-200 font-bold">
                    {item.productName || item.details}
                  </div>
                  {item.sellingPricePerKg && (
                    <div className="text-xs font-mono text-emerald-400 font-bold">
                      అమ్మకం రేటు: {item.sellingPricePerKg}
                    </div>
                  )}
                  {item.giveCustomer && (
                    <div className="text-xs font-mono text-amber-400 font-bold">
                      ఇవ్వాల్సిన బరువు: {item.giveCustomer}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDeleteOne(item.id)}
                  className="text-slate-500 hover:text-rose-400 p-1.5"
                  title="తొలగించు"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
