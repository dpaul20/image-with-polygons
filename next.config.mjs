import withTM from "next-transpile-modules";

/** @type {import('next').NextConfig} */
const nextConfig = withTM(["konva", "react-konva"])({
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    });

    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader", "postcss-loader"],
    });

    return config;
  },
});

export default nextConfig;
