import {Configuration} from "webpack";

export function buildResolvers(): Configuration['resolve'] {
  return {
    // Указываем раширения файлов, какие будут обрадатываться лоудером
    extensions: ['.tsx', '.ts', '.js'],
  }
}
