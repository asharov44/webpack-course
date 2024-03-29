import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const {
    mode,
    analyzer,
    paths: {
      html
    }
  } = options;

  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: html}),
  ];

  if(isDev) {
    plugins.push(new webpack.ProgressPlugin())
  }


  if(isProd) {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }))
  }

  if(analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
