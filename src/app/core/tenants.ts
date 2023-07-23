import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Tenant, TenantsResource } from '../../shared/types/tenants';
import { createFileIfNotExisting, loadFromFile, saveFile } from './storage';

export default class TenantsFacade implements TenantsResource {
  static STORAGE_FILE = 'tenants.json';

  constructor() {
    createFileIfNotExisting(TenantsFacade.STORAGE_FILE, []);
  }

  async create(payload: Tenant): Promise<Tenant> {
    return loadFromFile<Tenant[]>(TenantsFacade.STORAGE_FILE)
      .then(tenants => tenants.concat(payload))
      .then(tenants => saveFile(TenantsFacade.STORAGE_FILE, tenants))
      .then(() => payload);
  }

  read(businessKey: string): Promise<Tenant>;
  read(): Promise<Tenant[]>;
  read(businessKey?: unknown): Promise<Tenant | Tenant[]> {
    return loadFromFile<Tenant[]>(TenantsFacade.STORAGE_FILE).then(tenants =>
      businessKey
        ? tenants.find(tenant => tenant.businessKey === businessKey)
        : tenants
    );
  }

  update(businessKey: string, payload: Tenant): Promise<Tenant> {
    return loadFromFile<Tenant[]>(TenantsFacade.STORAGE_FILE)
      .then(tenants =>
        tenants.map(tenant =>
          tenant.businessKey === businessKey ? payload : tenant
        )
      )
      .then(tenants => saveFile(TenantsFacade.STORAGE_FILE, tenants))
      .then(() => payload);
  }

  delete(businessKey: string): Promise<void> {
    return loadFromFile<Tenant[]>(TenantsFacade.STORAGE_FILE)
      .then(tenants =>
        tenants.filter(tenant => tenant.businessKey !== businessKey)
      )
      .then(tenants => saveFile(TenantsFacade.STORAGE_FILE, tenants));
  }
}

const cache: {
  [windowId: string]: TenantsFacade;
} = {};

export const getTenants = (
  e: IpcMainEvent | IpcMainInvokeEvent
): TenantsFacade => {
  const sourceWindow = BrowserWindow.fromWebContents(e.sender);
  if (!sourceWindow) {
    throw new Error('Could not resolve current window');
  }

  const windowId = sourceWindow.id;

  let instance = cache[windowId];
  if (!instance) {
    instance = new TenantsFacade();
    cache[windowId] = instance;
  }

  return instance;
};
