import allArticles from './all.json';

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  author: string;
  published_at: string;
  meta_title?: string;
  meta_desc?: string;
  keywords?: string;
  status: string;
  faqs?: ArticleFAQ[];
}

export const articles: Article[] = allArticles as Article[];

export function getAllArticles(): Article[] {
  return articles.filter((a) => a.status === 'published');
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === 'all') return getAllArticles();
  return articles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export function getRelatedArticles(currentSlug: string, category?: string, limit = 3): Article[] {
  const others = getAllArticles().filter((a) => a.slug !== currentSlug);
  if (category) {
    const sameCategory = others.filter((a) => a.category.toLowerCase() === category.toLowerCase());
    if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  }
  return others.slice(0, limit);
}
