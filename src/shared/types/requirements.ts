export interface Requirement {
  name: string;
  cmd: string;
  state: 'ok' | 'error';
  message: string;
}

export interface RequirementsResource {
  getRequirements(): Promise<Requirement[]>;
}
