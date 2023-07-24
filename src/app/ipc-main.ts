import { IpcMainInvokeEvent, ipcMain } from 'electron';
import * as events from '../shared/events';
import { Module } from '../shared/types/modules';
import { Secret } from '../shared/types/secrets';
import { Server } from '../shared/types/servers';
import { Tenant } from '../shared/types/tenants';
import { Workspace } from '../shared/types/workspaces';
import {
  getModules,
  getRequirements,
  getSecrets,
  getServers,
  getTenants,
  getWorkspaces,
} from './features';

function registerModulessIPCMainHandlers() {
  ipcMain.handle(
    events.EVT_MODULES_CREATE,
    (e: IpcMainInvokeEvent, payload: Module) => getModules(e).create(payload)
  );
  ipcMain.handle(
    events.EVT_MODULES_READ,
    (e: IpcMainInvokeEvent, businessKey?: string) =>
      getModules(e).read(businessKey)
  );
  ipcMain.handle(
    events.EVT_MODULES_UPDATE,
    (e: IpcMainInvokeEvent, businessKey: string, payload: Module) =>
      getModules(e).update(businessKey, payload)
  );
  ipcMain.handle(
    events.EVT_MODULES_DELETE,
    (e: IpcMainInvokeEvent, businessKey: string) =>
      getModules(e).delete(businessKey)
  );
}

function registerRequirementsIPCMainHandlers() {
  ipcMain.handle(events.EVT_REQUIREMENTS_GET, (e: IpcMainInvokeEvent) =>
    getRequirements(e).getRequirements()
  );
}

function registerSecretsIPCMainHandlers() {
  ipcMain.handle(
    events.EVT_SECRETS_CREATE,
    (e: IpcMainInvokeEvent, payload: Secret) => getSecrets(e).create(payload)
  );
  ipcMain.handle(
    events.EVT_SECRETS_READ,
    (e: IpcMainInvokeEvent, businessKey?: string) =>
      getSecrets(e).read(businessKey)
  );
  ipcMain.handle(
    events.EVT_SECRETS_UPDATE,
    (e: IpcMainInvokeEvent, businessKey: string, payload: Secret) =>
      getSecrets(e).update(businessKey, payload)
  );
  ipcMain.handle(
    events.EVT_SECRETS_DELETE,
    (e: IpcMainInvokeEvent, businessKey: string) =>
      getSecrets(e).delete(businessKey)
  );
}

function registerServersIPCMainHandlers() {
  ipcMain.handle(
    events.EVT_SERVERS_CREATE,
    (e: IpcMainInvokeEvent, payload: Server) => getServers(e).create(payload)
  );
  ipcMain.handle(
    events.EVT_SERVERS_READ,
    (e: IpcMainInvokeEvent, businessKey?: string) =>
      getServers(e).read(businessKey)
  );
  ipcMain.handle(
    events.EVT_SERVERS_UPDATE,
    (e: IpcMainInvokeEvent, businessKey: string, payload: Server) =>
      getServers(e).update(businessKey, payload)
  );
  ipcMain.handle(
    events.EVT_SERVERS_DELETE,
    (e: IpcMainInvokeEvent, businessKey: string) =>
      getServers(e).delete(businessKey)
  );
}

function registerTenantsIPCMainHandlers() {
  ipcMain.handle(
    events.EVT_TENANTS_CREATE,
    (e: IpcMainInvokeEvent, payload: Tenant) => getTenants(e).create(payload)
  );
  ipcMain.handle(
    events.EVT_TENANTS_READ,
    (e: IpcMainInvokeEvent, businessKey?: string) =>
      getTenants(e).read(businessKey)
  );
  ipcMain.handle(
    events.EVT_TENANTS_UPDATE,
    (e: IpcMainInvokeEvent, businessKey: string, payload: Tenant) =>
      getTenants(e).update(businessKey, payload)
  );
  ipcMain.handle(
    events.EVT_TENANTS_DELETE,
    (e: IpcMainInvokeEvent, businessKey: string) =>
      getTenants(e).delete(businessKey)
  );
}

function registerWorkspacesIPCMainHandlers() {
  ipcMain.handle(
    events.EVT_WORKSPACES_CREATE,
    (e: IpcMainInvokeEvent, payload: Workspace) =>
      getWorkspaces(e).create(payload)
  );
  ipcMain.handle(
    events.EVT_WORKSPACES_READ,
    (e: IpcMainInvokeEvent, businessKey?: string) =>
      getWorkspaces(e).read(businessKey)
  );
  ipcMain.handle(
    events.EVT_WORKSPACES_UPDATE,
    (e: IpcMainInvokeEvent, businessKey: string, payload: Workspace) =>
      getWorkspaces(e).update(businessKey, payload)
  );
  ipcMain.handle(
    events.EVT_WORKSPACES_DELETE,
    (e: IpcMainInvokeEvent, businessKey: string) =>
      getWorkspaces(e).delete(businessKey)
  );
}

export const registerIPCMainHandlers = (): void => {
  registerModulessIPCMainHandlers();
  registerRequirementsIPCMainHandlers();
  registerSecretsIPCMainHandlers();
  registerServersIPCMainHandlers();
  registerTenantsIPCMainHandlers();
  registerWorkspacesIPCMainHandlers();
};
