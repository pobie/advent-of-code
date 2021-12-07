export function getOverlappingPoints(lines: Line[]): string {
  const points = lines
    .map((line) => line.Points)
    .reduce((acc, curr) => {
      acc.push(...curr);
      return acc;
    }, []);
  const maxX = Math.max(...points.map((point) => point.X));
  const maxY = Math.max(...points.map((point) => point.Y));
  const ventsLocation: VentsLocation = new VentsLocation(maxX, maxY);
  lines.forEach((line) => ventsLocation.addLine(line));
  let pointsOverlapping = 0;
  for (let x = 0; x < ventsLocation.VentsCount.length; x++) {
    for (let y = 0; y < ventsLocation.VentsCount[x].length; y++) {
      if (ventsLocation.VentsCount[x][y] > 1) {
        pointsOverlapping += 1;
      }
    }
  }
  return pointsOverlapping.toString();
}

export class Point {
  constructor(private x: number, private y: number) {}

  public get X() {
    return this.x;
  }

  public get Y() {
    return this.y;
  }

  public toString(): string {
    return `${this.x.toString()},${this.y.toString()}`;
  }

  public sub(point: Point) {
    return new Point(this.x - point.X, this.y - point.Y);
  }

  public abs() {
    return new Point(Math.abs(this.x), Math.abs(this.y));
  }
}

export class Line {
  constructor(private points: Point[]) {}

  public get Points(): Point[] {
    return this.points;
  }
}

export class VentsLocation {
  private ventsCount: number[][] = [];

  public get VentsCount(): number[][] {
    return this.ventsCount;
  }

  constructor(maxX: number, maxY: number) {
    this.initializeVentsGrid(maxX, maxY);
  }

  private initializeVentsGrid(maxX: number, maxY: number) {
    for (let x = 0; x <= maxX; x++) {
      this.ventsCount[x] = [];
      for (let y = 0; y <= maxY; y++) {
        this.ventsCount[x][y] = 0;
      }
    }
  }

  public addLine(line: Line) {
    line.Points.forEach(
      (point: Point) => (this.ventsCount[point.X][point.Y] += 1)
    );
  }
}
