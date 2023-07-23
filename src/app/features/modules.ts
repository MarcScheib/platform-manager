import { Module, ModulesResource } from '../../shared/types/modules';
import { BaseFeatureFacade, createGlobalState } from './base-feature-facade';

export default class ModulesFacade
  extends BaseFeatureFacade<Module>
  implements ModulesResource
{
  static STORAGE_FILE = 'modules.json';

  getDirectory(): string {
    return ModulesFacade.STORAGE_FILE;
  }
}

export const [getModules] = createGlobalState<ModulesFacade>(ModulesFacade);
