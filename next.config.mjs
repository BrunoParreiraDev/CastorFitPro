/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async headers() {
      return [
        {
          // Applies these headers to all routes in your application.
          source: "/(.*)",
          headers: [
            {
              key: "x-robots-tag",
              value: "index, follow",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  