import allTrainings from './all.json';
import kemnakerTrainings from './kemnaker.json';
import bnspTrainings from './bnsp.json';
import inhouseTrainings from './inhouse.json';
import softskillsTrainings from './softskills.json';

export interface TrainingProgram {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  certification: string;
  mode: 'online' | 'offline' | 'both';
  duration_days: number;
  price: number;
  price_label: string;
  validity_months?: number;
  curriculum: string[];
  meta_title?: string;
  meta_desc?: string;
  is_active: number;
  wa_text?: string;
  image_path?: string | null;
}

export const trainings: TrainingProgram[] = allTrainings as TrainingProgram[];

export function getAllTrainings(): TrainingProgram[] {
  return trainings.filter((t) => t.is_active === 1);
}

export function getTrainingBySlug(slug: string): TrainingProgram | undefined {
  return trainings.find((t) => t.slug === slug);
}

export function getTrainingsByCategory(category: string): TrainingProgram[] {
  if (category === 'all') return getAllTrainings();
  return trainings.filter(
    (t) => t.category.toLowerCase() === category.toLowerCase() && t.is_active === 1
  );
}

export function getTrainingsByCert(certType: 'kemnaker' | 'bnsp' | 'all'): TrainingProgram[] {
  if (certType === 'kemnaker') return kemnakerTrainings as TrainingProgram[];
  if (certType === 'bnsp') return bnspTrainings as TrainingProgram[];
  return getAllTrainings();
}

export function getRelatedTrainings(currentSlug: string, category?: string, limit = 3): TrainingProgram[] {
  const all = getAllTrainings().filter((t) => t.slug !== currentSlug);
  if (category) {
    const sameCat = all.filter((t) => t.category.toLowerCase() === category.toLowerCase());
    if (sameCat.length >= limit) return sameCat.slice(0, limit);
  }
  return all.slice(0, limit);
}
