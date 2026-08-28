/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wahanatotalita.com',
      },
      {
        protocol: 'https',
        hostname: 'origin.wahanatotalita.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/jadwal-pelatihan',
        destination: '/jadwal/',
        permanent: true,
      },
      {
        source: '/news/:path*',
        destination: '/artikel/',
        permanent: true,
      },
      {
        source: '/layanan',
        destination: '/pelatihan/',
        permanent: true,
      },
      {
        source: '/sertifikasi.html',
        destination: '/pelatihan/',
        permanent: true,
      },
      {
        source: '/profil/tentang-kami.html',
        destination: '/perusahaan',
        permanent: true,
      },
      {
        source: '/partner.html',
        destination: '/perusahaan',
        permanent: true,
      },
      {
        source: '/info',
        destination: '/perusahaan',
        permanent: true,
      },
      {
        source: '/news/dasar-hukum-keselamatan-dan-kesehatan-kerja.html',
        destination: '/artikel/dasar-hukum-keselamatan-dan-kesehatan-kerja/',
        permanent: true,
      },
      {
        source: '/news/pentingnya-k3-di-tempat-kerja.html',
        destination: '/artikel/pentingnya-k3-di-tempat-kerja/',
        permanent: true,
      }
    ];
  },
  async rewrites() {
    return {
      // Any route NOT built in Next.js falls back to Hostinger origin transparently (200 OK):
      fallback: [
        {
          source: '/:path*',
          destination: 'https://origin.wahanatotalita.com/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
