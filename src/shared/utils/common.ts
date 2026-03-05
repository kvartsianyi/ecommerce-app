export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function withMinDelay<T>(task: Promise<T>, ms = 300): Promise<T> {
  const [result] = await Promise.all([task, sleep(ms)]);
  return result;
}