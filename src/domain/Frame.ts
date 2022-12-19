interface Tool {
  onDrawStart(): void;
  onDrawEnd(): void;
}

export class Frame {
  constructor(private activeTool: Tool) { }

  draw() { }
}
