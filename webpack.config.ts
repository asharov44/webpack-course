import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server"
import webpack from 'webpack';

type Mode = 'development' | 'production';

interface EnbVariables {
    mode: Mode;
    port: number;
}

export default (env: EnbVariables) => {
    const isDev = env.mode === 'development';
    const config: webpack.Configuration  = {
        // Что собирать
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        //Подключение ts loader-a
        module: {
            rules: [
                {
                    // ts-loader умеет работать с JSX
                    // Если бы мы не использовали ts нужен был бы babel-loader
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        // Указываем раширения файлов, какие будут обрадатываться лоудером
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        // Куда будет сборка происходить
        output: {
            path: path.resolve(__dirname, 'build'),
            //хэш содеражимого файла
            filename: '[name].[contenthash].js',
            // очищать папку при каждой сборке
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html')}),
            // Показывает процент сборки (медленный)
            isDev && new webpack.ProgressPlugin()
        ].filter(Boolean),
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? {
            open: true,
            port: env.port ?? 3000,
        } : undefined,
    };
    return config;
};
