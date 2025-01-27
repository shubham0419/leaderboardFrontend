
/**@type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  // output: "export",
  reactStrictMode: false,
  trailingSlash: true,
  swcMinify: true,
  basePath: "",
  assetPrefix : "",
  images: {
    loader: "imgix",
    path: "/",
    domains: ['http://localhost:3000/'], // Add your domain here
  
  },
};

module.exports = nextConfig;
