/**
 * Storage helpers for Small Business Master Calculator
 */

const HISTORY_KEY = 'sbmc_calc_history_v1';
const SETTINGS_KEY = 'sbmc_calc_settings_v1';
const DAILY_RECORDS_KEY = 'sbmc_daily_records_v1';

export const defaultSettings = {
  currency: '₹',
  decimals: 2,
  language: 'te',
  theme: 'dark', // dark | light
  soundEnabled: true,
  customLandFactors: {
    centToSqFt: 435.6,
    gunthaToSqFt: 1089,
    acreToSqFt: 43560
  }
};

export const getSettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch (e) {
    return defaultSettings;
  }
};

export const saveSettings = (newSettings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
};

export const getHistory = () => {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

export const saveToHistory = (item) => {
  try {
    const history = getHistory();
    const newItem = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      ...item
    };
    const updated = [newItem, ...history].slice(0, 100); // keep last 100 calculations
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return newItem;
  } catch (e) {
    console.error('Failed to save history:', e);
    return null;
  }
};

export const clearHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
};

export const deleteHistoryItem = (id) => {
  try {
    const history = getHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete history item:', e);
  }
};

export const getDailyRecords = () => {
  try {
    const saved = localStorage.getItem(DAILY_RECORDS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

export const saveDailyRecord = (record) => {
  try {
    const records = getDailyRecords();
    const newRecord = {
      id: Date.now().toString(36),
      date: new Date().toISOString().split('T')[0],
      ...record
    };
    const updated = [newRecord, ...records];
    localStorage.setItem(DAILY_RECORDS_KEY, JSON.stringify(updated));
    return newRecord;
  } catch (e) {
    console.error('Failed to save daily record:', e);
  }
};
