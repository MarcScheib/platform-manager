import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Tenant, TenantsResource } from '../../shared/types/tenants';
import { BaseFeatureFacade } from './base-feature-facade';

export default class TenantsFacade
  extends BaseFeatureFacade<Tenant>
  implements TenantsResource
{
  static STORAGE_FILE = 'tenants.json';

  getDirectory(): string {
    return TenantsFacade.STORAGE_FILE;
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
