import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getRequirements: () => ipcRenderer.invoke('get-requirements'),
});
