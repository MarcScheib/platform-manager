import { BaseEntity, CrudResource } from './base';

export interface Server extends BaseEntity {
  url: string;
}

export type ServersResource = CrudResource<Server>;
