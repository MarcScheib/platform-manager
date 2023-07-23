export interface LogOptions {
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
