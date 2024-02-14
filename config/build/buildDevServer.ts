import type { Configuration as DevServerConfiguration } from "webpack-dev-server"
import {BuildOptions} from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    const { port } = options;
    return {
        open: true,
        port,
        // если раздавать статику через nginx то нудо делать проксирование на Index.html
        historyApiFallback: true,
    };
}
