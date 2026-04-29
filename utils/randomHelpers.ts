export function getRandomItem<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error('Cannot get a random item from an empty array');
  }

  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

/** Fisher-Yates shuffle avoids the bias of array.sort(() => Math.random() - 0.5). */
export function getRandomSubset<T>(items: readonly T[], count: number): T[] {
  if (count <= 0) return [];

  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}
