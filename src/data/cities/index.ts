import cleanedCityPelatihan from './city_pelatihan_cleaned.json';
import hubsData from './hubs.json';

export interface CityPelatihanPage {
  slug: string;
  title: string;
  meta_desc?: string;
  html: string;
  word_count?: number;
}

export interface CityHub {
  name: string;
  slug: string;
  province?: string;
  popular_trainings?: string[];
  industrial_focus?: string;
}

export const cityPelatihanPages = cleanedCityPelatihan as Record<string, CityPelatihanPage>;
export const cityHubs = hubsData as Record<string, any>;

export function getAllCityPelatihanSlugs(): string[] {
  return Object.keys(cityPelatihanPages);
}

export function getCityPelatihanBySlug(slug: string): CityPelatihanPage | undefined {
  return cityPelatihanPages[slug];
}
