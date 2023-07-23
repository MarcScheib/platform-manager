import type { Secret, SecretsResource } from '../../../shared/types/secrets';
import { CrudResourceImpl } from '../../base-resource';

export class SecretsResourceImpl
  extends CrudResourceImpl<Secret>
  implements SecretsResource
{
  getBase(): SecretsResource {
    return this.base.secrets;
  }
}
