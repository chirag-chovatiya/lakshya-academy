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
              destination: "/admin/auth/login",
            },
          ];
        },
  };
  
  export default nextConfig;
  