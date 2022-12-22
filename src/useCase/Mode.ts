export const enum ModeName {
  Line,
}

export interface Tool {
  update(): void;
  draw(): void;
}
