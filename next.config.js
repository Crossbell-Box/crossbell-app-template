const { withIpfsGateway } = require("@crossbell/ipfs-gateway-next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // https://github.com/WalletConnect/walletconnect-monorepo/blob/7716e164281c2f531145d682c3658f761fa0a823/providers/universal-provider/src/utils/deepLinks.ts#L39
    // @walletconnect/universal-provider imports react-native conditionally.
    // Since this is a NextJS app, simply mark it as external to avoid the webpack bundling warning.
    config.externals.push("react-native");

    return config;
  },
};

module.exports = withIpfsGateway(nextConfig);
