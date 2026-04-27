import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Local SVG flags can be optimized by Next's image pipeline
  images: { unoptimized: false },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei"],
  },
};

export default nextConfig;
