import { MetadataRoute } from 'next';
import trainingsData from '@/data/trainings.json';
import articlesData from '@/data/articles.json';
import glossaryData from '@/data/glossary.json';
import incidentsData from '@/data/incidents.json';
import pagesRegistry from '@/data/pages_registry.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wahanatotalita.com';
  const now = new Date();

  // Core Static Routes
  const coreRoutes = [
    '',
    '/pelatihan',
    '/artikel',
    '/jadwal',
    '/csms',
    '/galeri',
    '/tools',
    '/tools/safety-talk',
    '/tools/kalkulator-k3',
    '/tools/risk-matrix',
    '/tools/jsa-builder',
    '/tools/ibpr-generator',
    '/tools/apd-selector',
    '/tools/kalkulator-kebisingan',
    '/tools/kalkulator-biaya-k3',
    '/tools/regulasi-k3',
    '/tools/laporan-insiden',
    '/tools/ai-analyzer',
    '/tools/social-generator',
    '/glosarium',
    '/insiden',
    '/resources',
    '/lowongan',
    '/verifikasi',
    '/forum',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dedicated Service & City Pages
  const serviceRoutes = Object.keys(pagesRegistry).map((slug) => ({
    url: `${baseUrl}/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 114 Trainings
  const trainingRoutes = trainingsData.map((t) => ({
    url: `${baseUrl}/pelatihan/${t.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 126 Articles
  const articleRoutes = articlesData.map((a) => ({
    url: `${baseUrl}/artikel/${a.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 184 Glossary Terms
  const glossaryRoutes = glossaryData.map((g) => ({
    url: `${baseUrl}/glosarium/${g.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // 104 Incident Reports
  const incidentRoutes = incidentsData.map((i) => ({
    url: `${baseUrl}/insiden/${i.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...coreRoutes,
    ...serviceRoutes,
    ...trainingRoutes,
    ...articleRoutes,
    ...glossaryRoutes,
    ...incidentRoutes,
  ];
}
