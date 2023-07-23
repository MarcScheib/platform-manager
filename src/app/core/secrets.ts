import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { Secret, SecretsResource } from '../../shared/types/secrets';
import { createFileIfNotExisting, loadFromFile, saveFile } from './storage';

export default class SecretsFacade implements SecretsResource {
  static STORAGE_FILE = 'secrets.json';

  constructor() {
    createFileIfNotExisting(SecretsFacade.STORAGE_FILE, []);
  }

  async create(payload: Secret): Promise<Secret> {
    return loadFromFile<Secret[]>(SecretsFacade.STORAGE_FILE)
      .then(secrets => secrets.concat(payload))
      .then(secrets => saveFile(SecretsFacade.STORAGE_FILE, secrets))
      .then(() => payload);
  }

  read(businessKey: string): Promise<Secret>;
  read(): Promise<Secret[]>;
  read(businessKey?: unknown): Promise<Secret | Secret[]> {
    return loadFromFile<Secret[]>(SecretsFacade.STORAGE_FILE).then(secrets =>
      businessKey
        ? secrets.find(secret => secret.businessKey === businessKey)
        : secrets
    );
  }

  update(businessKey: string, payload: Secret): Promise<Secret> {
    return loadFromFile<Secret[]>(SecretsFacade.STORAGE_FILE)
      .then(secrets =>
        secrets.map(secret =>
          secret.businessKey === businessKey ? payload : secret
        )
      )
      .then(secrets => saveFile(SecretsFacade.STORAGE_FILE, secrets))
      .then(() => payload);
  }

  delete(businessKey: string): Promise<void> {
    return loadFromFile<Secret[]>(SecretsFacade.STORAGE_FILE)
      .then(secrets =>
        secrets.filter(secret => secret.businessKey !== businessKey)
      )
      .then(secrets => saveFile(SecretsFacade.STORAGE_FILE, secrets));
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
