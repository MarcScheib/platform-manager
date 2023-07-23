import { BaseEntity, CrudResource } from './base';

export interface Workspace extends BaseEntity {
  directory: string;
}

export type WorkspacesResource = CrudResource<Workspace>;
