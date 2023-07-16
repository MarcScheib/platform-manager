import { contextBridge, ipcRenderer } from 'electron';
import { TipManagerAPI } from '../shared/api';
import * as events from '../shared/events';

const tipManagerAPI: TipManagerAPI = {
  getRequirements: () => ipcRenderer.invoke(events.TIP_GET_REQUIREMENTS),
};

contextBridge.exposeInMainWorld('tipmanager', tipManagerAPI);
