import React, { useState } from 'react';
import { Receipt, Plus, Trash2, Printer } from 'lucide-react';
import { calcInvoiceTotals } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import { generateThermalPrintReceipt } from '../../utils/pdfPrint';
import { translations } from '../../i18n/translations';

export default function InvoiceGenerator({ lang = 'te', currencySymbol }) {
  const t = translations[lang] || translations.te;

  // Clean initial state
  const [shopName, setShopName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('INV-1001');
  const [discount, setDiscount] = useState('');

  // 1 empty clean item
  const [items, setItems] = useState([
    { id: '1', name: '', qty: '', unit: 'kg', rate: '' }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), name: '', qty: '', unit: 'kg', rate: '' }
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((it) => it.id !== id));
    }
  };

  const updateItem = (id, field, val) => {
    setItems(items.map((it) => (it.id === id ? { ...it, [field]: val } : it)));
  };

  const totals = calcInvoiceTotals(items, discount);

  const handlePrint = () => {
    generateThermalPrintReceipt({
      shopName: shopName || 'వ్యాపార షాప్',
      customerName: customerName || 'కస్టమర్',
      invoiceNo,
      items,
      totals,
      currencySymbol
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-700 flex items-center justify-center text-white font-bold shadow-md">
          <Receipt className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono">
            {t.navInvoice}
          </h2>
          <p className="text-xs text-slate-300">
            {t.navInvoiceSub}
          </p>
        </div>
      </div>

      <div className="skeuo-calculator-casing p-5 space-y-4">
        {/* Shop Details Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              మీ షాప్ పేరు
            </label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="ఉదా. శ్రీ లక్ష్మి ఫ్రూట్స్"
              className="skeuo-input w-full text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              కస్టమర్ పేరు
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="ఉదా. రమేష్ గారు"
              className="skeuo-input w-full text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
              బిల్ సంఖ్య
            </label>
            <input
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              placeholder="INV-1001"
              className="skeuo-input w-full text-xs"
            />
          </div>
        </div>

        {/* Invoice Item Rows */}
        <div className="space-y-2 border-t border-slate-800 pt-3">
          <label className="block text-xs font-mono font-bold text-emerald-400 uppercase mb-1">
            బిల్లు వస్తువుల వివరాలు
          </label>
          {items.map((item, idx) => (
            <div key={item.id} className="flex flex-wrap sm:flex-nowrap gap-2 items-center bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              <span className="text-xs font-mono font-bold text-slate-400 w-6">#{idx + 1}</span>
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                placeholder="సరుకు పేరు"
                className="skeuo-input text-xs flex-1 min-w-[120px]"
              />
              <input
                type="number"
                value={item.qty}
                onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                placeholder="పరిమాణం"
                className="skeuo-input text-xs w-20"
              />
              <select
                value={item.unit}
                onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                className="skeuo-input text-xs w-20 cursor-pointer"
              >
                <option value="kg">kg</option>
                <option value="gram">g</option>
                <option value="litre">L</option>
                <option value="piece">pcs</option>
                <option value="box">box</option>
              </select>
              <input
                type="number"
                value={item.rate}
                onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                placeholder={`ధర (${currencySymbol})`}
                className="skeuo-input text-xs w-24"
              />
              <span className="text-xs font-mono font-bold text-emerald-400 w-24 text-right">
                {formatCurrency((Number(item.qty) || 0) * (Number(item.rate) || 0), currencySymbol)}
              </span>
              {items.length > 1 && (
                <button onClick={() => removeItem(item.id)} className="text-rose-400 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2">
          <button onClick={addItem} className="skeuo-btn skeuo-btn-amber text-xs gap-1 py-1.5 px-3">
            <Plus className="w-4 h-4" />
            <span>వస్తువు జోడించు</span>
          </button>

          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-slate-300">డిస్కౌంట్ ({currencySymbol}):</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="0"
              className="skeuo-input text-xs w-24"
            />
          </div>
        </div>

        {/* Printable Thermal Receipt Preview Card */}
        <div className="bg-amber-50 text-slate-950 font-mono p-4 rounded-lg shadow-inner max-w-sm mx-auto border border-amber-200 space-y-2 text-xs">
          <div className="text-center border-b border-dashed border-slate-400 pb-2">
            <h4 className="font-bold text-sm tracking-wider uppercase">{shopName || 'వ్యాపార బిల్లు'}</h4>
            <p className="text-[10px] text-slate-600">కస్టమర్: {customerName || 'కస్టమర్'} • {invoiceNo}</p>
          </div>

          <div className="space-y-1">
            {items.map((it, i) => (
              <div key={i} className="flex justify-between">
                <span>{it.name || 'సరుకు'} x {it.qty || 0} {it.unit}</span>
                <span className="font-bold">{formatCurrency((Number(it.qty) || 0) * (Number(it.rate) || 0), currencySymbol)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-slate-400 pt-2 space-y-1">
            <div className="flex justify-between font-bold text-sm">
              <span>మొత్తం చెల్లించాల్సింది:</span>
              <span className="text-emerald-800">{formatCurrency(totals.grandTotal, currencySymbol)}</span>
            </div>
          </div>
          <p className="text-[9px] text-center text-slate-500 pt-1">ధన్యవాదాలు! మళ్లీ రండి!</p>
        </div>

        <button onClick={handlePrint} className="skeuo-btn skeuo-btn-success w-full gap-2 py-3">
          <Printer className="w-5 h-5" />
          <span>థర్మల్ బిల్లు ప్రింట్ చేయండి / PDF డౌన్‌లోడ్</span>
        </button>
      </div>
    </div>
  );
}
