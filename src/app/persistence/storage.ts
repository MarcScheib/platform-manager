import { app } from 'electron';
import { existsSync, promises as fs } from 'fs';
import path from 'path';

export function getUserDir() {
  return path.join(app.getPath('userData'), 'entities');
}

export function fromJson<T>(content: string): T {
  return JSON.parse(content);
}

export async function loadFromFile<T>(filename: string): Promise<T> {
  const filepath = path.join(getUserDir(), filename);
  const content = await fs.readFile(filepath, 'utf8');
  return fromJson<T>(content);
}

export function saveFile<T>(filename: string, data: T) {
  const filepath = path.join(getUserDir(), filename);
  const content = JSON.stringify(data, null, 2);
  return fs.writeFile(filepath, content);
}

export function createFileIfNotExisting<T>(filename: string, data: T) {
  const dirExists = existsSync(getUserDir());
  if (!dirExists) {
    fs.mkdir(getUserDir());
  }

  const exists = existsSync(path.join(getUserDir(), filename));
  if (!exists) {
    saveFile(filename, data);
  }
}
