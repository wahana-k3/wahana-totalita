# WAHANA TOTALITA — PRODUCTION ARCHITECTURE & PROJECT ARCHIVE NOTE

> **Status:** Experiment Complete & Fully Locked on Git  
> **Indexation State:** `noindex, nofollow, noarchive` (Hostinger live site protected)  
> **Target Production Domain:** `https://www.wahanatotalita.com`  
> **Build Status:** 100% SSG Verified (1,058 Routes Compiled with 0 Errors)

---

## 1. Executive Summary & Page Inventory

This repository contains the complete, standalone **Next.js 14 (App Router)** platform for **PT. Wahana Totalita Konsultan**. It was engineered to replace the legacy PHP architecture with an ultra-fast, zero-proxy, edge-rendered web application with built-in B2B lead generation.

### Total Verified Pre-Rendered Pages: 1,058

| Category | Page Count | Type | Description |
| :--- | :---: | :---: | :--- |
| **Core Training Courses** | **147** | Original Core | Complete Kemnaker RI, BNSP, Mining, and ISO courses with enriched SKKNI syllabi, pricing, and FAQs. |
| **Safety Knowledge Articles** | **146** | Original Core | In-depth technical guides on Indonesian K3 laws, Permenaker, SMK3, and accident prevention with FAQ schema. |
| **Core Service & B2B Hubs** | **48** | Original Core | Authority landing pages for CSMS, SMK3 PP 50/2012, In-House Training, Riksa Uji, Juru Las, etc. |
| **Safety Morning Talks** | **100** | Original Core | Searchable database of 100 toolbox meeting topics with printable company briefing sheets. |
| **Interactive K3 Tools** | **10** | Original Core | JSA Builder, IBPR Generator, APD Selector, Noise Calculator, FR/SR Calculators, AI Hazard Analyzer. |
| **Glossary Terms** | **184** | Original Core | Formal safety definitions (`/glosarium/*`) with individual detail pages. |
| **Incident Case Studies** | **104** | Original Core | Historical workplace accident investigations and root cause analysis reports (`/insiden/*`). |
| **Special Utility Pages** | **6** | Original Core | `/`, `/jadwal`, `/galeri`, `/perusahaan`, `/verifikasi`, `/lowongan`. |
| **Localized City Landing Pages** | **313** | Cleaned Doorway | Regional training pages (Surabaya, Balikpapan, Batam, Jakarta, Bandung, etc.) cleaned of raw HTML tags. |

---

## 2. Modular Data Structure

All data has been cleanly modularized into typed JSON datasets and query services:

```
src/
├── data/
│   ├── trainings/       # all.json, kemnaker.json, bnsp.json, inhouse.json, softskills.json
│   ├── articles/        # all.json, k3.json, sertifikasi.json, regulasi.json, lingkungan.json, etc.
│   ├── cities/          # city_pelatihan_cleaned.json (shrunk from 10.6MB to 3.7MB), hubs.json
│   ├── services/        # services.json
│   └── tools/           # safety_talks.json
├── lib/
│   └── data/            # TypeScript Query Layer (trainings.ts, articles.ts, cities.ts, services.ts, tools.ts)
└── components/
    ├── StickyConsultantCard.tsx  # Desktop scroll-following WhatsApp lead converter
    ├── MobileConversionBar.tsx   # Mobile fixed 1-tap WhatsApp + schedule drawer
    ├── RelatedProgramsCard.tsx   # Contextual certified course recommendations
    ├── PelatihanCatalog.tsx      # Filterable catalog UI
    ├── ArtikelCatalog.tsx        # Searchable knowledge base UI
    ├── Navbar.tsx                # Fast navigation drawer
    └── Footer.tsx                # Corporate footer with direct links
```

---

## 3. Lead Conversion Engine (CRO)

1. **Desktop Sticky Consultation Rail**: Pinned right sidebar featuring verified consultant badge (`"Tim Ahli Resmi • Layanan Konsultasi Aktif"`), dynamic contextual prefilled WhatsApp messages, and corporate quotation CTAs.
2. **Mobile Fixed Bottom Bar**: Persistent 1-tap WhatsApp consultation button + smooth bottom-sheet schedule drawer.
3. **Smart Related Programs Engine**: Automatically displays 3 certified courses matching the exact topic/industry of the article or service being viewed.

---

## 4. Built-in Audit Suite & CLI Tools

The following automated audit scripts are located in `scripts/`:

* `python scripts/audit_deep_seo_tags.py`: Audits all 1,054 static HTML files for `<title>`, `<meta description>`, `<link rel="canonical">`, `<h1>`, OpenGraph, Schema.org JSON-LD, and WhatsApp CTAs.
* `python scripts/audit_content_richness.py`: Analyzes character and word counts to detect and prevent thin pages.
* `python scripts/crawl_and_verify_all_internal_links.py`: Crawls all internal links across the codebase ensuring **zero broken links / zero 404s**.
* `python scripts/audit_live_site_urls.py [URL]`: Live network crawler measuring live HTTP 200 response codes and latency.

---

## 5. Instructions for Resuming & Re-Enabling Indexation in the Future

When you are ready to point DNS to Vercel and make this Next.js site the live production portal:

1. **Enable Indexing in `src/app/layout.tsx`**:
   ```typescript
   robots: {
     index: true,
     follow: true,
     googleBot: {
       index: true,
       follow: true,
       'max-video-preview': -1,
       'max-image-preview': 'large',
       'max-snippet': -1,
     },
   },
   ```

2. **Enable Crawlers in `src/app/robots.ts`**:
   ```typescript
   export default function robots(): MetadataRoute.Robots {
     return {
       rules: {
         userAgent: '*',
         allow: '/',
         disallow: ['/admin/', '/api/', '/_next/'],
       },
       sitemap: 'https://www.wahanatotalita.com/sitemap.xml',
     };
   }
   ```

3. **Remove `noindex` Header in `src/middleware.ts`**:
   Remove the line: `response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');`

4. **Run Verification & Deploy**:
   ```powershell
   npm run build
   git add .
   git commit -m "feat: enable production indexing"
   git push origin main
   ```
