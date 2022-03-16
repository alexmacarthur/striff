export interface Diff {
  character: string;
  index: number;
}

export interface DiffResult {
  added: Diff[];
  removed: Diff[];
}

export interface Character {
  value: string | null,
  accountedFor: boolean
}

export type FilledString = (string | null)[];
