import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Secret, SecretsResource } from '../../shared/types/secrets';
import { BaseFeatureFacade } from './base-feature-facade';

export default class SecretsFacade
  extends BaseFeatureFacade<Secret>
  implements SecretsResource
{
  static STORAGE_FILE = 'secrets.json';

  getDirectory(): string {
    return SecretsFacade.STORAGE_FILE;
  }
}

const cache: {
  [windowId: string]: SecretsFacade;
} = {};

export const getSecrets = (
  e: IpcMainEvent | IpcMainInvokeEvent
): SecretsFacade => {
  const sourceWindow = BrowserWindow.fromWebContents(e.sender);
  if (!sourceWindow) {
    throw new Error('Could not resolve current window');
  }

  const windowId = sourceWindow.id;

  let instance = cache[windowId];
  if (!instance) {
    instance = new SecretsFacade();
    cache[windowId] = instance;
  }

  return instance;
};
