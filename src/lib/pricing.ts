/* ═══════════════════════════════════════════════════════════════
   Pricing / Currency engine
   ---------------------------------------------------------------
   INR is the single source of truth. Every price elsewhere is a
   plain number of rupees; this module converts + formats it for
   the visitor's currency.

   Model (market-rate uplift):
     local = roundNice( inr ÷ inrPerUnit × multiplier )

   - inrPerUnit : FIXED exchange constant (1 unit = N rupees). Update
                  these by hand every so often — do NOT wire a live FX
                  API, or prices will jitter (e.g. $24.37) and change
                  daily on the page.
   - multiplier : market-rate uplift for that currency's primary market
                  so strong-currency clients aren't underpriced. 1.0 = no
                  uplift (pure localization). Tune freely.
   - roundNice  : snap to clean numbers ($25, not $24.37).

   ⚙️  Tune the two tables below (RATES) whenever you want to refresh
       FX or change how much you charge international clients.
═══════════════════════════════════════════════════════════════ */

export type CurrencyCode = "INR" | "USD" | "GBP" | "EUR";

export interface CurrencyMeta {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** 1 unit of this currency = N Indian rupees (fixed, edit occasionally). */
  inrPerUnit: number;
  /** Market-rate uplift for this currency's market. 1 = none. */
  multiplier: number;
  /** Snap the displayed amount to the nearest multiple of this. */
  roundTo: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  INR: { code: "INR", symbol: "₹", label: "India (₹ INR)",        inrPerUnit: 1,   multiplier: 1.0,  roundTo: 100 },
  USD: { code: "USD", symbol: "$", label: "United States ($ USD)", inrPerUnit: 85,  multiplier: 1.4,  roundTo: 5 },
  GBP: { code: "GBP", symbol: "£", label: "United Kingdom (£ GBP)", inrPerUnit: 108, multiplier: 1.4,  roundTo: 5 },
  EUR: { code: "EUR", symbol: "€", label: "Europe (€ EUR)",        inrPerUnit: 92,  multiplier: 1.3,  roundTo: 5 },
};

export const CURRENCY_LIST: CurrencyMeta[] = Object.values(CURRENCIES);

export const DEFAULT_CURRENCY: CurrencyCode = "INR";

/** ISO country code → currency. Anything not listed falls back to USD
    (sensible global default); India explicitly stays INR. */
const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  IN: "INR",
  US: "USD",
  GB: "GBP", UK: "GBP",
  // Eurozone
  DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", IE: "EUR", PT: "EUR",
  AT: "EUR", BE: "EUR", FI: "EUR", GR: "EUR", LU: "EUR", SK: "EUR", SI: "EUR",
  EE: "EUR", LV: "EUR", LT: "EUR", CY: "EUR", MT: "EUR", HR: "EUR",
};

export function currencyForCountry(country?: string | null): CurrencyCode {
  if (!country) return DEFAULT_CURRENCY;
  const code = country.trim().toUpperCase();
  return COUNTRY_TO_CURRENCY[code] ?? "USD";
}

export function isCurrencyCode(v: unknown): v is CurrencyCode {
  return typeof v === "string" && v in CURRENCIES;
}

function roundNice(value: number, step: number): number {
  return Math.max(step, Math.round(value / step) * step);
}

/** Group digits with thousands separators (e.g. 1225 → "1,225"). */
function groupDigits(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Convert a base INR amount into the target currency's displayed integer
 * amount (already uplifted + rounded). Useful when you need the number.
 */
export function convert(inr: number, code: CurrencyCode): number {
  const c = CURRENCIES[code];
  if (code === "INR") return roundNice(inr, c.roundTo);
  return roundNice((inr / c.inrPerUnit) * c.multiplier, c.roundTo);
}

/**
 * Format a base INR amount as a currency string for display.
 * INR keeps the compact K/L style the site already used (₹15K, ₹1L);
 * other currencies show clean grouped numbers ($245, $1,225).
 *
 * opts.compact (default true) controls INR abbreviation.
 */
export function formatPrice(
  inr: number,
  code: CurrencyCode,
  opts: { compact?: boolean } = {},
): string {
  const { symbol } = CURRENCIES[code];
  const value = convert(inr, code);

  if (code === "INR") {
    const compact = opts.compact ?? true;
    if (compact) {
      if (value >= 100000 && value % 100000 === 0) return `${symbol}${value / 100000}L`;
      if (value >= 1000 && value % 1000 === 0) return `${symbol}${value / 1000}K`;
    }
    return `${symbol}${groupDigits(value)}`;
  }

  return `${symbol}${groupDigits(value)}`;
}
