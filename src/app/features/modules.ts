import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Module, ModulesResource } from '../../shared/types/modules';
import {
  createFileIfNotExisting,
  loadFromFile,
  saveFile,
} from '../persistence/storage';

export default class ModulesFacade implements ModulesResource {
  static STORAGE_FILE = 'modules.json';

  constructor() {
    createFileIfNotExisting(ModulesFacade.STORAGE_FILE, []);
  }

  async create(payload: Module): Promise<Module> {
    return loadFromFile<Module[]>(ModulesFacade.STORAGE_FILE)
      .then(modules => modules.concat(payload))
      .then(modules => saveFile(ModulesFacade.STORAGE_FILE, modules))
      .then(() => payload);
  }

  read(businessKey: string): Promise<Module>;
  read(): Promise<Module[]>;
  read(businessKey?: unknown): Promise<Module | Module[]> {
    return loadFromFile<Module[]>(ModulesFacade.STORAGE_FILE).then(modules =>
      businessKey
        ? modules.find(module => module.businessKey === businessKey)
        : modules
    );
  }

  update(businessKey: string, payload: Module): Promise<Module> {
    return loadFromFile<Module[]>(ModulesFacade.STORAGE_FILE)
      .then(modules =>
        modules.map(module =>
          module.businessKey === businessKey ? payload : module
        )
      )
      .then(modules => saveFile(ModulesFacade.STORAGE_FILE, modules))
      .then(() => payload);
  }

  delete(businessKey: string): Promise<void> {
    return loadFromFile<Module[]>(ModulesFacade.STORAGE_FILE)
      .then(modules =>
        modules.filter(module => module.businessKey !== businessKey)
      )
      .then(modules => saveFile(ModulesFacade.STORAGE_FILE, modules));
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
