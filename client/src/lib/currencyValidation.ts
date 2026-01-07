import { z } from "zod";

/**
 * Currency validation schema for Indian Rupees
 * - Must be a valid number
 * - Must be greater than 0
 * - Must be less than ₹1 crore (10,000,000)
 * - Maximum 2 decimal places
 */
export const currencyAmountSchema = z.string()
  .min(1, "Amount is required")
  .refine((val) => !isNaN(Number(val)), "Must be a valid number")
  .refine((val) => Number(val) > 0, "Amount must be greater than ₹0")
  .refine((val) => Number(val) <= 10000000, "Amount must be less than ₹1 crore")
  .refine((val) => {
    const num = Number(val);
    return Number.isInteger(num * 100);
  }, "Amount can have maximum 2 decimal places");

/**
 * Format amount to Indian currency format
 * @param amount - The amount to format
 * @returns Formatted string with ₹ symbol
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}

/**
 * Format amount to Indian numbering system (Lakhs and Crores)
 * @param amount - The amount to format
 * @returns Formatted string in Indian format
 */
export function formatIndianCurrency(amount: number): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
}

/**
 * Parse currency string to number
 * @param value - String value to parse
 * @returns Parsed number or null if invalid
 */
export function parseCurrency(value: string): number | null {
  const cleaned = value.replace(/[₹,\s]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/**
 * Validate if a string is a valid currency amount
 * @param value - String to validate
 * @returns true if valid, false otherwise
 */
export function isValidCurrencyAmount(value: string): boolean {
  const result = currencyAmountSchema.safeParse(value);
  return result.success;
}

/**
 * Restrict input to valid currency format (2 decimal places)
 * Use this in onChange handlers
 */
export function restrictToCurrencyInput(value: string): boolean {
  return value === '' || /^\d*\.?\d{0,2}$/.test(value);
}

/**
 * Currency validation messages
 */
export const CURRENCY_VALIDATION_MESSAGES = {
  required: "Amount is required",
  mustBeNumber: "Must be a valid number",
  mustBePositive: "Amount must be greater than ₹0",
  maxAmount: "Amount must be less than ₹1 crore",
  maxDecimals: "Amount can have maximum 2 decimal places",
  minAmount: "Amount must be at least ₹0.01",
};

