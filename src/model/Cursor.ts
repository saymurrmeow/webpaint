class Cursor {
  private mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    left: false,
    prevLeft: false,
  };
  // TODO how bind canvas intead pass in constructor
  constructor(private canvasInstance: HTMLCanvasElement) {
    canvasInstance.addEventListener('mouseup', this.mouseUpHandler);
    canvasInstance.addEventListener('mousedown', this.mouseDownHandler);
    canvasInstance.addEventListener('mousemove', this.mouseMoveHandler);
  }

  private mouseUpHandler = () => {
    this.mouse.left = false;
  };

  private mouseDownHandler = () => {
    this.mouse.left = true;
    Object.assign(this.mouse, { startX: this.mouse.x, startY: this.mouse.y });
  };

  private mouseMoveHandler = (e: MouseEvent) => {
    const { left, top } = this.canvasInstance.getBoundingClientRect();
    const { clientX, clientY } = e;
    Object.assign(this.mouse, { x: clientX - left, y: clientY - top });
  };

  getMouse() {
    return this.mouse;
  }

  tick() {
    Object.assign(this.mouse, { prevLeft: this.mouse.left });
  }
}

export default Cursor;
