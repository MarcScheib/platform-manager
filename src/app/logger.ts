// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createLogger } from 'bunyan';
import { getConfig } from './config';

const dataConfig = getConfig();

export interface LogStream {
  path?: string;
  stream?: NodeJS.WriteStream;
}

export interface LoggerConfig {
  app: string;
  name: string;
  level: string;
  streams: Array<LogStream>;
}

const loggerConfig: LoggerConfig = {
  app: 'sqlectron-gui',
  name: 'sqlectron-gui',
  level: dataConfig.log.level,
  streams: [],
};

const logger = createLogger(loggerConfig);

export default (namespace: string): Console => logger.child({ namespace });
