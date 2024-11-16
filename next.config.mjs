/** @type {import('next').NextConfig} */
const nextConfig = {
      async rewrites() {
          return [
            {
              source: "/",
              destination: "/home",
            },
            {
              source: "/login",
              destination: "/auth/login",
            },
          ];
        },
  };
  
  export default nextConfig;
  