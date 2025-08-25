import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // outputFileTracingIgnores: ["./generated/client/**/*"],
  // outputFileTracing,
  images: {
    domains: ["res.cloudinary.com"], // Keep this for backward compatibility
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dwk1tdvki/image/upload/**", // Adjust pathname as needed
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
