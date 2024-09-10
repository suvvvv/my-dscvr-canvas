/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/(.*)', 
          headers: [
            {
              key: 'Content-Security-Policy',
              value: `
                default-src 'self'; 
                script-src 'self'; 
                style-src 'self'; 
                img-src 'self' https://my-dscvr-canvas.vercel.app https://your-external-image-source.com data:; 
                font-src 'self' https://fonts.gstatic.com; 
                connect-src 'self'; 
                media-src 'self'; 
                frame-ancestors 'self' https://dscvr.one; 
                object-src 'none'; 
                base-uri 'self';
                form-action 'self'; 
                upgrade-insecure-requests;
              `.replace(/\n/g, ''), 
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  