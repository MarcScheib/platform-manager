import type { Tenant, TenantsResource } from '../../../shared/types/tenants';
import { BaseResource } from '../../base-resource';

export class TenantsResourceImpl
  extends BaseResource
  implements TenantsResource
{
  async create(payload: Tenant): Promise<Tenant> {
    return this.base.tenants.create(payload);
  }

  async read(businessKey: string): Promise<Tenant>;
  async read(): Promise<Tenant[]>;
  async read(businessKey?: string): Promise<Tenant | Tenant[]> {
    return businessKey
      ? this.base.tenants.read(businessKey)
      : this.base.tenants.read();
  }

  async update(businessKey: string, payload: Tenant): Promise<Tenant> {
    return this.base.tenants.update(businessKey, payload);
  }

  async delete(businessKey: string): Promise<void> {
    return this.base.tenants.delete(businessKey);
  }
}
