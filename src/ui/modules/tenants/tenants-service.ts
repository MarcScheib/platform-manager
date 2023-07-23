import type { Tenant, TenantsResource } from '../../../shared/types/tenants';
import { CrudResourceImpl } from '../../base-resource';

export class TenantsResourceImpl
  extends CrudResourceImpl<Tenant>
  implements TenantsResource
{
  getBase() {
    return this.base.tenants;
  }
}
