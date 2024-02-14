import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";

export function buildLoaders(options: BuildOptions) : ModuleOptions['rules'] {
  const { mode } = options;

  const isDev = mode === 'development';

  const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
          },
        },
  };

  const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          isDev ?  'style-loader' : MiniCssExtractPlugin.loader,
          cssLoaderWithModules,
          "sass-loader"
        ],
  };
  const tsLoader = {
        // ts-loader умеет работать с JSX
        // Если бы мы не использовали ts нужен был бы babel-loader
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
  };

  // порядок имеет значение
  return [
    scssLoader,
    tsLoader,
  ];
}
