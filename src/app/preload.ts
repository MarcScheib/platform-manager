import { contextBridge, ipcRenderer } from 'electron';
import { TipManagerResource } from '../shared/api';
import * as events from '../shared/events';
import { Module } from '../shared/types/modules';
import { Secret } from '../shared/types/secrets';
import { Server } from '../shared/types/servers';
import { Tenant } from '../shared/types/tenants';
import { Workspace } from '../shared/types/workspaces';

const tipManagerResource: TipManagerResource = {
  modules: {
    create: (payload: Module) =>
      ipcRenderer.invoke(events.TIP_MODULES_CREATE, payload),
    read: (businessKey?: string) =>
      ipcRenderer.invoke(events.TIP_MODULES_READ, businessKey),
    update: (businessKey: string, payload: Module) =>
      ipcRenderer.invoke(events.TIP_MODULES_UPDATE, businessKey, payload),
    delete: (businessKey: string) =>
      ipcRenderer.invoke(events.TIP_MODULES_DELETE, businessKey),
  },
  requirements: {
    getRequirements: () => ipcRenderer.invoke(events.TIP_REQUIREMENTS_GET),
  },
  secrets: {
    create: (payload: Secret) =>
      ipcRenderer.invoke(events.TIP_SECRETS_CREATE, payload),
    read: (businessKey?: string) =>
      ipcRenderer.invoke(events.TIP_SECRETS_READ, businessKey),
    update: (businessKey: string, payload: Secret) =>
      ipcRenderer.invoke(events.TIP_SECRETS_UPDATE, businessKey, payload),
    delete: (businessKey: string) =>
      ipcRenderer.invoke(events.TIP_SECRETS_DELETE, businessKey),
  },
  servers: {
    create: (payload: Server) =>
      ipcRenderer.invoke(events.TIP_SERVERS_CREATE, payload),
    read: (businessKey?: string) =>
      ipcRenderer.invoke(events.TIP_SERVERS_READ, businessKey),
    update: (businessKey: string, payload: Server) =>
      ipcRenderer.invoke(events.TIP_SERVERS_UPDATE, businessKey, payload),
    delete: (businessKey: string) =>
      ipcRenderer.invoke(events.TIP_SERVERS_DELETE, businessKey),
  },
  tenants: {
    create: (payload: Tenant) =>
      ipcRenderer.invoke(events.TIP_TENANTS_CREATE, payload),
    read: (businessKey?: string) =>
      ipcRenderer.invoke(events.TIP_TENANTS_READ, businessKey),
    update: (businessKey: string, payload: Tenant) =>
      ipcRenderer.invoke(events.TIP_TENANTS_UPDATE, businessKey, payload),
    delete: (businessKey: string) =>
      ipcRenderer.invoke(events.TIP_TENANTS_DELETE, businessKey),
  },
  workspaces: {
    create: (payload: Workspace) =>
      ipcRenderer.invoke(events.TIP_WORKSPACES_CREATE, payload),
    read: (businessKey?: string) =>
      ipcRenderer.invoke(events.TIP_WORKSPACES_READ, businessKey),
    update: (businessKey: string, payload: Workspace) =>
      ipcRenderer.invoke(events.TIP_WORKSPACES_UPDATE, businessKey, payload),
    delete: (businessKey: string) =>
      ipcRenderer.invoke(events.TIP_WORKSPACES_DELETE, businessKey),
  },
};

contextBridge.exposeInMainWorld('tipmanager', tipManagerResource);
