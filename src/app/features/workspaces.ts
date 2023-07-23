import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Workspace, WorkspacesResource } from '../../shared/types/workspaces';
import { BaseFeatureFacade } from './base-feature-facade';

export default class WorkspacesFacade
  extends BaseFeatureFacade<Workspace>
  implements WorkspacesResource
{
  static STORAGE_FILE = 'workspaces.json';

  getDirectory(): string {
    return WorkspacesFacade.STORAGE_FILE;
  }
}

const cache: {
  [windowId: string]: WorkspacesFacade;
} = {};

export const getWorkspaces = (
  e: IpcMainEvent | IpcMainInvokeEvent
): WorkspacesFacade => {
  const sourceWindow = BrowserWindow.fromWebContents(e.sender);
  if (!sourceWindow) {
    throw new Error('Could not resolve current window');
  }

  const windowId = sourceWindow.id;

  let instance = cache[windowId];
  if (!instance) {
    instance = new WorkspacesFacade();
    cache[windowId] = instance;
  }

  return instance;
};
