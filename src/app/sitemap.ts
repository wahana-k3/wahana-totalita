import { MetadataRoute } from 'next';
import { getAllTrainings } from '@/lib/data/trainings';
import { getAllArticles } from '@/lib/data/articles';
import { getAllCityPelatihanSlugs } from '@/lib/data/cities';
import { getAllServiceSlugs } from '@/lib/data/services';
import glossaryData from '@/data/glossary.json';
import incidentsData from '@/data/incidents.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.wahanatotalita.com';
  const now = new Date();

  // Core Static Routes
  const coreRoutes = [
    '',
    '/pelatihan',
    '/artikel',
    '/jadwal',
    '/csms',
    '/galeri',
    '/perusahaan',
    '/perpanjangan-skp',
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
    priority: route === '' ? 1.0 : 0.9,
  }));

  // Service & Hub routes
  const serviceRoutes = getAllServiceSlugs().map((slug) => ({
    url: `${baseUrl}/${slug}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // All 147 Training Courses
  const trainingRoutes = getAllTrainings().map((t) => ({
    url: `${baseUrl}/pelatihan/${t.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // All 374 City Pelatihan Pages
  const cityRoutes = getAllCityPelatihanSlugs().map((slug) => ({
    url: `${baseUrl}/pelatihan/${slug}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // 146 Knowledge Articles
  const articleRoutes = getAllArticles().map((a) => ({
    url: `${baseUrl}/artikel/${a.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  // Glossary Terms
  const glossaryRoutes = (glossaryData as any[]).map((g) => ({
    url: `${baseUrl}/glosarium/${g.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Incident Reports
  const incidentRoutes = (incidentsData as any[]).map((i) => ({
    url: `${baseUrl}/insiden/${i.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...coreRoutes,
    ...serviceRoutes,
    ...trainingRoutes,
    ...cityRoutes,
    ...articleRoutes,
    ...glossaryRoutes,
    ...incidentRoutes,
  ];
}
