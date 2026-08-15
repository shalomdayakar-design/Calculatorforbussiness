# 🧮 Small Business Master Calculator

A professional, mobile-friendly, offline-capable Progressive Web Application (PWA) designed specifically for local shopkeepers, fruit/vegetable sellers, farmers, traders, small wholesalers, and general business owners.

Featuring a **Skeuomorphic 3D UI** with realistic physical calculator buttons, illuminated LCD digital screens, metallic/matte slate bezels, paper receipt textures, and physical keypress depth.

---

## 🌟 Key Features

### 🧮 1. Universal Buying & Selling Calculator
- Works for **ANY product** (Apples, Tomatoes, Onions, Rice, Groundnuts, Fish, Chicken, Cement, Fertilizer, Clothes, Hardware, etc.).
- Flexible packaging units: Box, Bag, Sack, Bundle, Packet, Basket, Crate, Piece, Dozen, Pair, Custom Unit.
- Multi-profit modes: Desired profit per container, desired total profit, or desired profit percentage.
- **Auto calculates**: Total purchase cost, total quantity, purchase cost per kg/gram, required selling price per container/kg/gram, total revenue, expected profit, and profit %.

### 🛍️ 2. Customer ₹10 / ₹20 / ₹50 Calculator (Quick Customer Tool)
- Shopkeeper enters selling price per kg (e.g., ₹40/kg).
- Customer asks for ₹10 worth -> App displays: **Give 250 grams**.
- Large quick amount buttons (₹5, ₹10, ₹20, ₹50, ₹100, ₹200, Custom).
- Smart unit display formatting (e.g. `250 grams`, `1 kg 250 grams`, `333 grams approx`).

### ⚖️ 3. Reverse Weight & Quantity Pricing Matrix
- Reverse mode: "I want to give 250 grams at ₹80/kg rate -> charge ₹20".
- Bulk Rate Matrix: Input ₹700 for 20 kg -> Auto calculates rate per kg, rate per gram, 100g price, 250g price, 500g price.

### 💰 4. Profit & Loss Master Calculator
- **Mode A**: Profit per unit.
- **Mode B**: Profit percentage.
- **Mode C**: Desired total profit.
- **Mode D**: Gross margin % & markup %.
- **Loss Mode**: Net business loss and loss % calculation.

### 📦 5. Vegetable & Fruit Wastage / Damage Calculator
- Accounts for rotten or damaged goods (e.g., 100 kg tomatoes @ ₹30/kg with 10% wastage).
- Calculates **real effective cost per kg** of sellable product (₹33.33/kg) and target selling rate for net profit.

### 🏦 6. Loan & Interest Calculator
- Supports Simple Interest, Compound Interest, and EMI (Equated Monthly Installment).
- Daily, monthly, and yearly interest rate conversions.
- Full expandable **EMI Amortization Schedule Table** showing principal, interest, and remaining balance for each month.

### 🌾 7. Land & Agriculture Measurement Calculator
- Input Length × Width in Feet, Meters, or Yards.
- Converts to Square Feet, Square Yards, Square Meters, Acres, Cents/Dismil, Gunthas/Guntas, Hectares, Grounds.
- **Customizable factors**: Adjust regional Cent to Sq Ft and Guntha to Sq Ft factors in Settings!

### 💧 8. Liquid & Litre Calculator
- ₹60/Litre -> Customer asks for ₹20 -> Display: **333 ml approximately**.
- Reverse mode: Calculate cost for any volume in ml.

### 📏 9. Universal Measurement Converter
- Categories: Weight (mg, g, kg, tonne), Length (mm, cm, m, km, in, ft, yd, mi), Area (sq ft, sq yd, sq m, acre, cent, hectare), Volume (ml, L, m³, gal), Temp (°C, °F, K).

### ⚡ 10. Quick 10-Second Selling Price Calculator
- Ultra-fast 3-input screen for immediate shop-floor answers in under 10 seconds:
  `Bought for ₹700` + `20 kg` + `Want ₹200 profit` -> **Sell at ₹45 / kg**.

### 📦 11. Multiple Product Basket Calculator
- Combine multiple items (e.g. 3 boxes apples + 2 bags tomatoes + 4 bags onions).
- Displays total investment, total revenue, expected net profit, average profit %, and product breakdown.

### 📊 12. Daily Business & Expense Tracker
- Track daily sales, stock purchases, and expenses (Transport, Loading, Labour, Rent, Electricity, Packaging, Commission, Market fee, Wastage).
- Calculates Net Daily Profit = Sales - Purchases - Expenses.
- Save records to `localStorage` and **Export to CSV**.

### 📈 13. Break-Even Calculator
- Minimum selling price per unit to avoid loss considering fixed & variable overhead costs.

### 🧾 14. Invoice & Cash Receipt Generator
- Create itemized customer bills with shop name, customer name, date, invoice #, discount, subtotal, grand total.
- **Print & PDF download** with physical paper receipt layout.

### 📜 15. Calculator History & Settings
- Local browser history of past calculations with 1-click view and deletion.
- Customize currency symbol (₹, $, €, £), decimal precision (2, 3, 4 places), language (EN, HI, TE), and regional land factors.

---

## 🚀 How to Run & Build

### Prerequisites
- Node.js (v18+)

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
```
Generates production build in `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 📱 How to Install as PWA (Offline Desktop / Mobile App)

1. Open the application in Chrome, Edge, or Safari on your phone/tablet/desktop.
2. Click the **Install App** button in the header (or select "Add to Home Screen" from the browser menu).
3. The app will install as a standalone application on your home screen or desktop.
4. **Offline Capability**: Works 100% offline without internet access using built-in Service Worker static caching!

---

## 📐 Formulas & Calculation Logic

1. **Buying & Selling**:
   $$\text{Total Cost} = \text{Containers} \times \text{Price per Container}$$
   $$\text{Total Qty} = \text{Containers} \times \text{Qty per Container}$$
   $$\text{Selling Price/kg} = \frac{\text{Total Cost} + \text{Desired Profit}}{\text{Total Qty}}$$

2. **Customer ₹ Weight**:
   $$\text{Weight (kg)} = \frac{\text{Customer Amount (₹)}}{\text{Selling Price per kg (₹)}}$$

3. **Vegetable Wastage Real Cost**:
   $$\text{Sellable Qty} = \text{Purchased Qty} \times \left(1 - \frac{\text{Wastage \%}}{100}\right)$$
   $$\text{Real Cost/kg} = \frac{\text{Total Purchase Price}}{\text{Sellable Qty}}$$

4. **EMI Calculation**:
   $$E = P \cdot \frac{r(1+r)^n}{(1+r)^n - 1}$$
   where $P$ is principal, $r$ is monthly rate, $n$ is duration in months.

---

## 🌐 Trilingual Support
Includes complete translation dictionaries for:
- **English** (Default)
- **Hindi (हिंदी)**
- **Telugu (తెలుగు)**

Preserves mathematical formulas and numerical inputs cleanly across language changes.
