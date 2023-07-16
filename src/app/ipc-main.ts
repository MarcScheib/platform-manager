import { exec } from 'child_process';
import { ipcMain } from 'electron';
import { promisify } from 'util';
import * as events from '../shared/events';
import createLogger from './logger';

const logger = createLogger('app');

const requirements = [
  'node -v',
  'npm -v',
  'mvn --version',
  'java -version',
  'git --version',
];
const execPromise = promisify(exec);

async function getRequirements(): Promise<
  { stdout: string; stderr: string }[]
> {
  return Promise.all(
    requirements.map(requirement => {
      return execPromise(requirement);
    })
  );
}

export const registerIPCMainHandlers = (): void => {
  logger.info('registerIPCMainHandlers');

  ipcMain.handle(events.TIP_GET_REQUIREMENTS, getRequirements);
};
