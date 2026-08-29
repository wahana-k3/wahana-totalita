import cleanedCityPelatihan from '@/data/cities/city_pelatihan_cleaned.json';
import hubsData from '@/data/cities/hubs.json';

export interface CityPelatihanPage {
  slug: string;
  title: string;
  meta_desc?: string;
  html: string;
  word_count?: number;
}

export const cityPelatihanPages = cleanedCityPelatihan as Record<string, CityPelatihanPage>;
export const cityHubs = hubsData as Record<string, any>;

export function getAllCityPelatihanSlugs(): string[] {
  return Object.keys(cityPelatihanPages);
}

export function getCityPelatihanBySlug(slug: string): CityPelatihanPage | undefined {
  return cityPelatihanPages[slug];
}
