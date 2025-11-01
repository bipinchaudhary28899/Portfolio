/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // enable static export for GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: { unoptimized: true }, // disables server-side image optimization
};

module.exports = nextConfig;
