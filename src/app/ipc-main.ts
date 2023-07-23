import { IpcMainInvokeEvent, ipcMain } from 'electron';
import * as events from '../shared/events';
import { Module } from '../shared/types/modules';
import { Secret } from '../shared/types/secrets';
import { Server } from '../shared/types/servers';
import { Tenant } from '../shared/types/tenants';
import { Workspace } from '../shared/types/workspaces';
import { getRequirements, getServers } from './core';
import { getModules } from './core/modules';
import { getSecrets } from './core/secrets';
import { getTenants } from './core/tenants';
import { getWorkspaces } from './core/workspaces';

function registerModulessIPCMainHandlers() {
  ipcMain.handle(
    events.TIP_MODULES_CREATE,
    (e: IpcMainInvokeEvent, payload: Module) => getModules(e).create(payload)
  );
  ipcMain.handle(
    events.TIP_MODULES_READ,
    (e: IpcMainInvokeEvent, businessKey?: string) =>
      getModules(e).read(businessKey)
  );
  ipcMain.handle(
    events.TIP_MODULES_UPDATE,
    (e: IpcMainInvokeEvent, businessKey: string, payload: Module) =>
      getModules(e).update(businessKey, payload)
  );
  ipcMain.handle(
    events.TIP_MODULES_DELETE,
    (e: IpcMainInvokeEvent, businessKey: string) =>
      getModules(e).delete(businessKey)
  );
}

function registerRequirementsIPCMainHandlers() {
  ipcMain.handle(events.TIP_REQUIREMENTS_GET, (e: IpcMainInvokeEvent) =>
    getRequirements(e).getRequirements()
  );
}

function registerSecretsIPCMainHandlers() {
  ipcMain.handle(
    events.TIP_SECRETS_CREATE,
    (e: IpcMainInvokeEvent, payload: Secret) => getSecrets(e).create(payload)
  );
  ipcMain.handle(
    events.TIP_SECRETS_READ,
    (e: IpcMainInvokeEvent, businessKey?: string) =>
      getSecrets(e).read(businessKey)
  );
  ipcMain.handle(
    events.TIP_SECRETS_UPDATE,
    (e: IpcMainInvokeEvent, businessKey: string, payload: Secret) =>
      getSecrets(e).update(businessKey, payload)
  );
  ipcMain.handle(
    events.TIP_SECRETS_DELETE,
    (e: IpcMainInvokeEvent, businessKey: string) =>
      getSecrets(e).delete(businessKey)
  );
}

function registerServersIPCMainHandlers() {
  ipcMain.handle(
    events.TIP_SERVERS_CREATE,
    (e: IpcMainInvokeEvent, payload: Server) => getServers(e).create(payload)
  );
  ipcMain.handle(
    events.TIP_SERVERS_READ,
    (e: IpcMainInvokeEvent, businessKey?: string) =>
      getServers(e).read(businessKey)
  );
  ipcMain.handle(
    events.TIP_SERVERS_UPDATE,
    (e: IpcMainInvokeEvent, businessKey: string, payload: Server) =>
      getServers(e).update(businessKey, payload)
  );
  ipcMain.handle(
    events.TIP_SERVERS_DELETE,
    (e: IpcMainInvokeEvent, businessKey: string) =>
      getServers(e).delete(businessKey)
  );
}

function registerTenantsIPCMainHandlers() {
  ipcMain.handle(
    events.TIP_TENANTS_CREATE,
    (e: IpcMainInvokeEvent, payload: Tenant) => getTenants(e).create(payload)
  );
  ipcMain.handle(
    events.TIP_TENANTS_READ,
    (e: IpcMainInvokeEvent, businessKey?: string) =>
      getTenants(e).read(businessKey)
  );
  ipcMain.handle(
    events.TIP_TENANTS_UPDATE,
    (e: IpcMainInvokeEvent, businessKey: string, payload: Tenant) =>
      getTenants(e).update(businessKey, payload)
  );
  ipcMain.handle(
    events.TIP_TENANTS_DELETE,
    (e: IpcMainInvokeEvent, businessKey: string) =>
      getTenants(e).delete(businessKey)
  );
}

function registerWorkspacesIPCMainHandlers() {
  ipcMain.handle(
    events.TIP_WORKSPACES_CREATE,
    (e: IpcMainInvokeEvent, payload: Workspace) =>
      getWorkspaces(e).create(payload)
  );
  ipcMain.handle(
    events.TIP_WORKSPACES_READ,
    (e: IpcMainInvokeEvent, businessKey?: string) =>
      getWorkspaces(e).read(businessKey)
  );
  ipcMain.handle(
    events.TIP_WORKSPACES_UPDATE,
    (e: IpcMainInvokeEvent, businessKey: string, payload: Workspace) =>
      getWorkspaces(e).update(businessKey, payload)
  );
  ipcMain.handle(
    events.TIP_WORKSPACES_DELETE,
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
