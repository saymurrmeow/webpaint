export const enum ToolName {
  Pencil,
  Line,
}

export interface Tool {
  update(): void;
  draw(): void;
}
