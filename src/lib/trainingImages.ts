/**
 * Dedicated training photo helper.
 * Assigns one of the 67 official training photos (pelatihan-001.webp .. pelatihan-067.webp)
 * deterministically based on slug/id.
 */

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function getTrainingPhoto(slugOrId: string | number, imagePath?: string | null): string {
  if (imagePath && imagePath.startsWith('/images/')) {
    return imagePath;
  }

  const seed = String(slugOrId || 'training');
  const index = (simpleHash(seed) % 67) + 1;
  const padIndex = String(index).padStart(3, '0');
  return `/images/pelatihan-${padIndex}.webp`;
}
