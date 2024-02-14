import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server"
import webpack from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildMode, BuildPaths} from "./config/build/types/types";

interface EnbVariables {
    mode: BuildMode;
    port: number;
}

export default (env: EnbVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html:  path.resolve(__dirname, 'public', 'index.html')
    };

    const config: webpack.Configuration  = buildWebpack({
        paths,
        mode: env.mode ?? 'development',
        port: env.port ?? 3000
    });
    return config;
};
