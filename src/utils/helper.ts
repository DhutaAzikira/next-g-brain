export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function estimateSpeechDuration(text: string): number {
  const wordsPerMinute: number = 130;
  const words: number = text.split(/\s+/).length;
  return (words / wordsPerMinute) * 60 * 1000;
}
