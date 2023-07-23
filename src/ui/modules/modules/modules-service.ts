import type { Module, ModulesResource } from '../../../shared/types/modules';
import { CrudResourceImpl } from '../../base-resource';

export class ModulesResourceImpl
  extends CrudResourceImpl<Module>
  implements ModulesResource
{
  getBase(): ModulesResource {
    return this.base.modules;
  }
}
