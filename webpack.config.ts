import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

type Mode = 'development' | 'production';

interface EnbVariables {
    mode: Mode;
}

export default (env: EnbVariables) => {
    const config: webpack.Configuration  = {
        // Что собирать
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        //Подключение ts loader-a
        module: {
            rules: [
                {
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
            new webpack.ProgressPlugin()
        ],
    };
    return config;
};