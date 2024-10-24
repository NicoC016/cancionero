/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'Access-Control-Allow-Origin',
                value: '*', 
              },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'GET, POST, PUT, DELETE, OPTIONS',
              },
              {
                key: 'Access-Control-Allow-Headers',
                value: 'X-Requested-With, Content-Type, Accept, Authorization',
              },
            ],
          },
        ];
      },
};

export default nextConfig;
