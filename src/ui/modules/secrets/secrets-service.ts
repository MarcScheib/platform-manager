import type { Secret, SecretsResource } from '../../../shared/types/secrets';
import { BaseResource } from '../../base-resource';

export class SecretsResourceImpl
  extends BaseResource
  implements SecretsResource
{
  async create(payload: Secret): Promise<Secret> {
    return this.base.secrets.create(payload);
  }

  async read(businessKey: string): Promise<Secret>;
  async read(): Promise<Secret[]>;
  async read(businessKey?: string): Promise<Secret | Secret[]> {
    return businessKey
      ? this.base.secrets.read(businessKey)
      : this.base.secrets.read();
  }

  async update(businessKey: string, payload: Secret): Promise<Secret> {
    return this.base.secrets.update(businessKey, payload);
  }

  async delete(businessKey: string): Promise<void> {
    return this.base.secrets.delete(businessKey);
  }
}
