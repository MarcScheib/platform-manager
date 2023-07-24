import { PlatformManagerResource } from '../shared/api';
import { BaseEntity, CrudResource } from '../shared/types/base';

declare global {
  interface Window {
    manager: PlatformManagerResource;
  }
}

export class BaseResource {
  private _base: PlatformManagerResource;

  get base() {
    return this._base;
  }

  constructor() {
    this._base = window.manager;
  }
}

export abstract class CrudResourceImpl<
  T extends BaseEntity,
> extends BaseResource {
  async create(payload: T): Promise<T> {
    return this.getBase().create(payload);
  }

  async read(businessKey: string): Promise<T>;
  async read(): Promise<T[]>;
  async read(businessKey?: string): Promise<T | T[]> {
    return businessKey
      ? this.getBase().read(businessKey)
      : this.getBase().read();
  }

  async update(businessKey: string, payload: T): Promise<T> {
    return this.getBase().update(businessKey, payload);
  }

  async delete(businessKey: string): Promise<void> {
    return this.getBase().delete(businessKey);
  }

  abstract getBase(): CrudResource<T>;
}
