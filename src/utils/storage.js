/**
 * Storage utility for saving history, settings, and daily business records
 */

const HISTORY_KEY = 'sb_master_calc_history';
const SETTINGS_KEY = 'sb_master_calc_settings';
const DAILY_RECORDS_KEY = 'sb_master_calc_daily';

export const defaultSettings = {
  currency: '₹',
  decimals: 2,
  language: 'te',
  theme: 'dark', // dark | light
  compactMode: false, // High density compact view for all devices
  soundEnabled: true,
  customLandFactors: {
    centToSqFt: 435.6,
    gunthaToSqFt: 1089,
    acreToSqFt: 43560
  }
};

export const getSettings = () => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch (e) {
    return defaultSettings;
  }
};

export const saveSettings = (settingsObj) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settingsObj));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
};

export const getHistory = () => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveToHistory = (item) => {
  try {
    const current = getHistory();
    const newItem = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...item
    };
    const updated = [newItem, ...current].slice(0, 50); // Keep max 50 items
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return newItem;
  } catch (e) {
    console.error('Failed to save history:', e);
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
    const current = getHistory();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete item:', e);
  }
};
