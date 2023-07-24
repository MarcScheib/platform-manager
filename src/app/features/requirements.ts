import { exec } from 'child_process';
import { promisify } from 'util';
import {
  Requirement,
  RequirementsResource,
} from '../../shared/types/requirements';
import { createGlobalState } from './base-feature-facade';

const requirements = [
  { cmd: 'node -v' },
  { cmd: 'npm -v' },
  { cmd: 'mvn --version' },
  { cmd: 'java -version' },
  {
    cmd: 'git --version',
    parser: (output: string) => output.trim().split(' ').reverse()[0],
  },
  {
    cmd: 'docker --version',
  },
  {
    cmd: 'docker compose version',
  },
];
const execPromise = promisify(exec);

function transformMessage(
  stdout: string,
  stderr: string,
  parser?: (output: string) => string
) {
  if (stdout) {
    return parser ? parser(stdout) : stdout;
  }
  return stderr;
}

export default class RequirementsFacade implements RequirementsResource {
  async getRequirements(): Promise<Requirement[]> {
    return Promise.all(
      requirements.map(({ cmd, parser }) =>
        execPromise(cmd).then(({ stdout, stderr }) => ({
          name: cmd,
          cmd: cmd,
          state: stdout ? ('ok' as const) : ('error' as const),
          message: transformMessage(stdout, stderr, parser),
        }))
      )
    );
  }
}

export const [getRequirements] =
  createGlobalState<RequirementsFacade>(RequirementsFacade);
