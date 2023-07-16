export interface TipManagerAPI {
  getRequirements(): Promise<{ stdout: string; stderr: string }[]>;
}
