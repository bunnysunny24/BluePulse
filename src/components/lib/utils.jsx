import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type ClassValue } from 'clsx';

// Combines multiple class names and merges Tailwind classes efficiently
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Type-safe object deep merge
export function deepMerge<T>(target: T, source: T): T {
  const result: T = { ...target };

  for (const key in source) {
    if (source[key] instanceof Object) {
      if (result[key] instanceof Object) {
        result[key] = deepMerge(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Truncate text with ellipsis
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

// Delay execution (useful for animations/transitions)
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}