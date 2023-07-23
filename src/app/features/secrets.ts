import { Secret, SecretsResource } from '../../shared/types/secrets';
import { BaseFeatureFacade, createGlobalState } from './base-feature-facade';

export default class SecretsFacade
  extends BaseFeatureFacade<Secret>
  implements SecretsResource
{
  static STORAGE_FILE = 'secrets.json';

  getDirectory(): string {
    return SecretsFacade.STORAGE_FILE;
  }
}

export const [getSecrets] = createGlobalState<SecretsFacade>(SecretsFacade);
