/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    outputFileTracingIncludes: {
      '/**': ['../parafrase/**/*.md'],
    },
  },
};

module.exports = nextConfig;
