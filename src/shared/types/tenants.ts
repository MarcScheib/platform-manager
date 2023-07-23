import { BaseEntity, CrudResource } from './base';

export interface Tenant extends BaseEntity {
  modules: string[];
}

export type TenantsResource = CrudResource<Tenant>;
