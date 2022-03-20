export interface Character {
  index: number,
  value: string,
  ref: Symbol | null
}

export type PrunedCharacter = Pick<Character, "index" | "value">;

export interface DiffResult {
  added: PrunedCharacter[];
  removed: PrunedCharacter[];
}
