import servicesData from './services.json';

export interface ServicePage {
  slug: string;
  title: string;
  meta_title?: string;
  meta_desc?: string;
  html: string;
  has_html: boolean;
  word_count?: number;
}

export const services = servicesData as Record<string, ServicePage>;

export function getAllServiceSlugs(): string[] {
  return Object.keys(services);
}

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services[slug];
}
