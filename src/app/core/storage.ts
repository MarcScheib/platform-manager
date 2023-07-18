import { app } from "electron";

export function getUserDir() {
  return app.getPath('appData');
}
