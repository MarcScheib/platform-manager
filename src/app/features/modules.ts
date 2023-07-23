import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Module, ModulesResource } from '../../shared/types/modules';
import { BaseFeatureFacade } from './base-feature-facade';

export default class ModulesFacade
  extends BaseFeatureFacade<Module>
  implements ModulesResource
{
  static STORAGE_FILE = 'modules.json';

  getDirectory(): string {
    return ModulesFacade.STORAGE_FILE;
  }
}

const cache: {
  [windowId: string]: ModulesFacade;
} = {};

export const getModules = (
  e: IpcMainEvent | IpcMainInvokeEvent
): ModulesFacade => {
  const sourceWindow = BrowserWindow.fromWebContents(e.sender);
  if (!sourceWindow) {
    throw new Error('Could not resolve current window');
  }

  const windowId = sourceWindow.id;

  let instance = cache[windowId];
  if (!instance) {
    instance = new ModulesFacade();
    cache[windowId] = instance;
  }

  return instance;
};
