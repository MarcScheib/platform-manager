import { IpcMainInvokeEvent, ipcMain } from 'electron';
import * as events from '../shared/events';
import { Server } from '../shared/types/servers';
import { getRequirements, getServers } from './core';

function registerRequirementsIPCMainHandlers() {
  ipcMain.handle(events.TIP_REQUIREMENTS_GET, (e: IpcMainInvokeEvent) =>
    getRequirements(e).getRequirements()
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

export const registerIPCMainHandlers = (): void => {
  registerRequirementsIPCMainHandlers();
  registerServersIPCMainHandlers();
};
