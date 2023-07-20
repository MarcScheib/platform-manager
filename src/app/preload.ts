import { contextBridge, ipcRenderer } from 'electron';
import { TipManagerResource } from '../shared/api';
import * as events from '../shared/events';
import { Server } from '../shared/types/servers';

const tipManagerResource: TipManagerResource = {
  requirements: {
    getRequirements: () => ipcRenderer.invoke(events.TIP_REQUIREMENTS_GET),
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
};

contextBridge.exposeInMainWorld('tipmanager', tipManagerResource);
