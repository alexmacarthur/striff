export interface Diff {
  character: string;
  index: number;
}

export interface DiffResult {
  added: Diff[];
  removed: Diff[];
}

export type FilledString = (string | null)[];
