import safetyTalksData from '@/data/tools/safety_talks.json';

export interface SafetyTalk {
  id: number;
  category: string;
  title: string;
  description: string;
  tags: string[];
  statistic?: string;
  discussion_points?: string[];
  action_steps?: string[];
  slug?: string;
  summary?: string;
  key_points?: string[];
}

export const safetyTalks: SafetyTalk[] = (safetyTalksData as unknown as SafetyTalk[]);

export function getAllSafetyTalks(): SafetyTalk[] {
  return safetyTalks;
}

export function getSafetyTalkBySlug(slug: string): SafetyTalk | undefined {
  return safetyTalks.find((st) => st.slug === slug || st.id.toString() === slug);
}

export function getSafetyTalksByCategory(category: string): SafetyTalk[] {
  if (category === 'all') return safetyTalks;
  return safetyTalks.filter((st) => st.category.toLowerCase() === category.toLowerCase());
}
