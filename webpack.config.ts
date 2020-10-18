import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import { HotModuleReplacementPlugin, Configuration } from "webpack";

const isDevelopment = process.env.NODE_ENV !== "production";

const plugins = [
  new ForkTsCheckerWebpackPlugin({
    async: false,
    eslint: {
      files: "./src/**/*",
    },
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "index.html"),
  }),
];

if (isDevelopment) {
  plugins.push(
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin()
  );
}

const config: Configuration = {
  entry: "./src/index.tsx",
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  plugins,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 4000,
    historyApiFallback: true,
  },
};

export default config;
