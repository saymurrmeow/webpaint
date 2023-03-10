class Point {
  constructor(private x: number, private y: number) { }

  getCordinates() {
    return { x: this.x, y: this.y };
  }

  updateCordinates(dx: number, dy: number) {
    this.x = dx;
    this.y = dy;
  }

  subtact(p: Point) {
    return new Point(this.x - p.x, this.y - p.y);
  }

  distance(p: Point) {
    return Math.sqrt(Math.pow(this.x - p.x, 2) + Math.pow(this.y - p.y, 2));
  }
}

export default Point;
