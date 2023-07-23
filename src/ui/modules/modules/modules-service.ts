import type { Module, ModulesResource } from '../../../shared/types/modules';
import { BaseResource } from '../../base-resource';

export class ModulesResourceImpl
  extends BaseResource
  implements ModulesResource
{
  async create(payload: Module): Promise<Module> {
    return this.base.modules.create(payload);
  }

  async read(businessKey: string): Promise<Module>;
  async read(): Promise<Module[]>;
  async read(businessKey?: string): Promise<Module | Module[]> {
    return businessKey
      ? this.base.modules.read(businessKey)
      : this.base.modules.read();
  }

  async update(businessKey: string, payload: Module): Promise<Module> {
    return this.base.modules.update(businessKey, payload);
  }

  async delete(businessKey: string): Promise<void> {
    return this.base.modules.delete(businessKey);
  }
}
