/** @type {import('next').NextConfig} */
const nextConfig = {
      async rewrites() {
          return [
            {
              source: "/",
              destination: "/students/auth/login",
            },
            {
              source: "/admin/login",
              destination: "/admin/auth/login",
            },
          ];
        },
  };
  
  export default nextConfig;
  