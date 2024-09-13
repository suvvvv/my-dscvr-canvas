/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
              style-src 'self' 'unsafe-inline' https:;
              font-src 'self' https:;
              img-src 'self' data: https:;
              connect-src 'self' https:;
              frame-src 'self' https:`
              .replace(/\n/g, '').trim(), 
          },
        ],
      },
    ];
  },
};

export default nextConfig;
