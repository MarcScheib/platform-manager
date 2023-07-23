import { exec } from 'child_process';
import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { promisify } from 'util';
import {
  Requirement,
  RequirementsResource,
} from '../../shared/types/requirements';

const requirements = [
  'node -v',
  'npm -v',
  'mvn --version',
  'java -version',
  'git --version',
];
const execPromise = promisify(exec);

export default class RequirementsFacade implements RequirementsResource {
  async getRequirements(): Promise<Requirement[]> {
    return Promise.all(
      requirements.map(requirement =>
        execPromise(requirement).then(({ stdout, stderr }) => ({
          name: requirement,
          cmd: requirement,
          state: stdout ? ('ok' as const) : ('error' as const),
          message: stdout || stderr,
        }))
      )
    );
  }
}

const cache: {
  [windowId: string]: RequirementsFacade;
} = {};

export const getRequirements = (
  e: IpcMainEvent | IpcMainInvokeEvent
): RequirementsFacade => {
  const sourceWindow = BrowserWindow.fromWebContents(e.sender);
  if (!sourceWindow) {
    throw new Error('Could not resolve current window');
  }

  const windowId = sourceWindow.id;

  let instance = cache[windowId];
  if (!instance) {
    instance = new RequirementsFacade();
    cache[windowId] = instance;
  }

  return instance;
};
