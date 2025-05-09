import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    nodeMiddleware: true, // Enable Node.js middleware
  },
}

export default nextConfig
