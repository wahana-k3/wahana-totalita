import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Schema.org BreadcrumbList
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": "https://wahanatotalita.com"
      },
      ...items.map((it, idx) => ({
        "@type": "ListItem",
        "position": idx + 2,
        "name": it.name,
        ...(it.url ? { "item": `https://wahanatotalita.com${it.url.startsWith('/') ? it.url : '/' + it.url}` } : {})
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav className="flex items-center text-xs text-slate-500 py-3 overflow-x-auto whitespace-nowrap mb-4">
        <Link href="/" className="hover:text-brand-600 flex items-center gap-1 transition-colors">
          <Home className="w-3.5 h-3.5" />
          <span>Beranda</span>
        </Link>
        {items.map((it, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0" />
            {it.url ? (
              <Link href={it.url} className="hover:text-brand-600 transition-colors">
                {it.name}
              </Link>
            ) : (
              <span className="text-slate-800 font-medium truncate max-w-xs sm:max-w-md">{it.name}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
}
