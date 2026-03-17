/**
 * formatters.js
 * Shared formatting utilities for currency, dates, and display values.
 */

/**
 * Format a numeric amount as a GBP currency string.
 * Negative amounts are shown as debits (e.g. "−£12.45").
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  const abs = Math.abs(amount).toFixed(2);
  return amount < 0 ? `−£${abs}` : `+£${abs}`;
}

/**
 * Format a date string (YYYY-MM-DD) to a short human-readable form.
 * @param {string} dateStr - ISO date string
 * @returns {string} e.g. "17 Mar"
 */
export function formatShortDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/**
 * Format a confidence value (0–1) as a percentage string.
 * @param {number} confidence
 * @returns {string} e.g. "92%"
 */
export function formatConfidence(confidence) {
  return `${Math.round(confidence * 100)}%`;
}

/**
 * Capitalise the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export function capitalise(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
