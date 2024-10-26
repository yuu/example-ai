/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@cloudscape-design/components",
    "@cloudscape-design/component-toolkit",
    "@cloudscape-design/code-view",
    "@cloudscape-design/chat-components",
  ],
};

export default nextConfig;
