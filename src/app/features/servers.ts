import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Server, ServersResource } from '../../shared/types/servers';
import { BaseFeatureFacade } from './base-feature-facade';

export default class ServersFacade
  extends BaseFeatureFacade<Server>
  implements ServersResource
{
  static STORAGE_FILE = 'servers.json';

  getDirectory(): string {
    return ServersFacade.STORAGE_FILE;
  }
}

const cache: {
  [windowId: string]: ServersFacade;
} = {};

export const getServers = (
  e: IpcMainEvent | IpcMainInvokeEvent
): ServersFacade => {
  const sourceWindow = BrowserWindow.fromWebContents(e.sender);
  if (!sourceWindow) {
    throw new Error('Could not resolve current window');
  }

  const windowId = sourceWindow.id;

  let instance = cache[windowId];
  if (!instance) {
    instance = new ServersFacade();
    cache[windowId] = instance;
  }

  return instance;
};
