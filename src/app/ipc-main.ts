import { IpcMainInvokeEvent, ipcMain } from 'electron';
import * as events from '../shared/events';
import { getRequirements } from './core';

function registerRequirementsIPCMainHandlers() {
  ipcMain.handle(events.TIP_GET_REQUIREMENTS, (e: IpcMainInvokeEvent) =>
    getRequirements(e).getRequirements()
  );
}

export const registerIPCMainHandlers = (): void => {
  registerRequirementsIPCMainHandlers();
};
