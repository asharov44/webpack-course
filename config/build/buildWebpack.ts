import webpack from "webpack";
import {buildDevServer} from "./buildDevServer";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const {
      mode,
      paths: {
          entry,
          output
      }
    } = options;

    const isDev = mode === 'development';

    return {
      // Что собирать
      mode: mode ?? 'development',
      entry,
      //Подключение ts loader-a
      module: {
        rules: buildLoaders(options)
      },
      resolve: buildResolvers(),
      // Куда будет сборка происходить
      output: {
        path: output,
        //хэш содеражимого файла
        filename: '[name].[contenthash].js',
        // очищать папку при каждой сборке
        clean: true
      },
      plugins: buildPlugins(options),
      devtool: isDev && 'inline-source-map',
      devServer: isDev ? buildDevServer(options) : undefined,
    };
}
