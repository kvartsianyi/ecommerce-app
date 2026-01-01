import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function withMinDelay<T>(task: Promise<T>, ms = 300): Promise<T> {
  const [result] = await Promise.all([task, sleep(ms)]);
  return result;
}
