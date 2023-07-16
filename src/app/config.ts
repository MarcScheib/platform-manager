import fs from 'fs';
import path from 'path';

interface LogOptions {
  console: boolean;
  file: boolean;
  level: string;
  path: string;
}

export interface Config {
  log: LogOptions;
  // Fields attached from package.json
  name: string;
  version: string;
  homepage?: string;
  bugs?: string;
  repository?: {
    url: string;
  };
  // Fields attached from cli args
  devMode?: boolean;
  printVersion?: boolean;
  // Fields attached in runtime by the config setup
  crypto?: {
    secret: string;
  };
}

let config: Config;

function readJSON(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function getConfig(cleanCache = false): Config {
  if (config && !cleanCache) {
    return config;
  }

  const args = process.argv || [];
  const argsConfig = {
    devMode: args.indexOf('--dev') !== -1,
    printVersion: false,
  };

  if (args.indexOf('--version') !== -1 || args.indexOf('-v') !== -1) {
    argsConfig.printVersion = true;
  }

  const basePath = path.resolve(__dirname, '..', '..');
  const packageConfig = readJSON(path.resolve(basePath, 'package.json'));

  // use NODE_ENV for renderer process
  // but if that is not defined then use --dev arg
  const isDev = process.env.NODE_ENV !== 'production' || argsConfig.devMode;

  const defaultConfig = {
    log: {
      console: isDev,
      file: false,
      level: process.env.DEBUG ? 'debug' : 'error',
      path: path.resolve(__dirname),
    },
  };

  config = { ...defaultConfig, ...packageConfig, ...argsConfig };

  return config;
}
