import { Tenant, TenantsResource } from '../../shared/types/tenants';
import { BaseFeatureFacade, createGlobalState } from './base-feature-facade';

export default class TenantsFacade
  extends BaseFeatureFacade<Tenant>
  implements TenantsResource
{
  static STORAGE_FILE = 'tenants.json';

  getDirectory(): string {
    return TenantsFacade.STORAGE_FILE;
  }
}

export const [getTenants] = createGlobalState<TenantsFacade>(TenantsFacade);
