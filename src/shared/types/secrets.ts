import { BaseEntity, CrudResource } from './base';

export interface Secret extends BaseEntity {
  value: string;
}

export type SecretsResource = CrudResource<Secret>;
