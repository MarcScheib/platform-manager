import { BaseEntity, CrudResource } from './base';

export interface Module extends BaseEntity {
  repositoryUrl: string;
}

export type ModulesResource = CrudResource<Module>;
