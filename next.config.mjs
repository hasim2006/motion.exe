/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'gsap'],
};

export default nextConfig;
