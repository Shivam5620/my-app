/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], // 👈 this allows images from http://localhost
  },
};

module.exports = nextConfig;
