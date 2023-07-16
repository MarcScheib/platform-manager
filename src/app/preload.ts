import { contextBridge, ipcRenderer } from 'electron';
import { TipManagerResource } from '../shared/api';
import * as events from '../shared/events';

const tipManagerResource: TipManagerResource = {
  requirements: {
    getRequirements: () => ipcRenderer.invoke(events.TIP_GET_REQUIREMENTS),
  },
};

contextBridge.exposeInMainWorld('tipmanager', tipManagerResource);
