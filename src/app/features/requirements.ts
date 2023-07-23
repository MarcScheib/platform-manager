import { exec } from 'child_process';
import { promisify } from 'util';
import {
  Requirement,
  RequirementsResource,
} from '../../shared/types/requirements';
import { createGlobalState } from './base-feature-facade';

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

export const [getRequirements] =
  createGlobalState<RequirementsFacade>(RequirementsFacade);
