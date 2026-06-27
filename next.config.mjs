/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "esolgmzudcqokhbvjvil.supabase.co",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", 
      },
    ],
  },
};

export default nextConfig;
