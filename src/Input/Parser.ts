import { BingoCard, BingoSpot } from '../Questions/Question4';
import { Line, Point } from '../Questions/Question5';

export interface InputParser<T> {
  parse(input: string): T;
}

export class StringToArrayParser implements InputParser<string[]> {
  private separator: string;

  constructor(separator: string = '\n') {
    this.separator = separator;
  }

  parse(input: string): string[] {
    return input.split(this.separator).filter((value) => value !== '');
  }
}

export class StringToNumericArrayParser implements InputParser<number[]> {
  private separator: string;

  constructor(separator: string = '\n') {
    this.separator = separator;
  }

  parse(input: string): number[] {
    return input
      .split(this.separator)
      .filter((value) => value !== '')
      .map((value) => +value);
  }
}

export class StringToKeyNumberTupleParser
  implements InputParser<[string, number][]>
{
  private separator: string;

  constructor(separator: string = '\n') {
    this.separator = separator;
  }
  parse(input: string): [string, number][] {
    return input
      .split(this.separator)
      .filter((value) => value !== '')
      .map((value) => {
        const subArray = value.split(' ');
        let inputs: [string, number] = [subArray[0], +subArray[1]];
        return inputs;
      });
  }
}

export class StringToBingoCardsParser
  implements InputParser<[number[], BingoCard[]]>
{
  private separator: string;

  constructor(separator: string = '\n') {
    this.separator = separator;
  }
  parse(input: string): [number[], BingoCard[]] {
    const splitInput = input.split('\n\n');
    const numbers = input
      .split('\n')[0]
      .split(',')
      .map((value) => +value);

    let cards: BingoCard[] = [];
    for (let i = 1; i < splitInput.length; i++) {
      cards[i - 1] = createCard(splitInput[i], i);
    }
    return [numbers, cards];
  }
}

function createCard(input: string, cardNumber: number): BingoCard {
  const lines = input.split('\n');
  const card: BingoSpot[][] = [];
  for (let i = 0; i < lines.length; i++) {
    card[i] = lines[i]
      .split(' ')
      .filter((val) => val !== '')
      .map((value) => {
        return {
          value: +value,
          marked: false,
          cardNumber: cardNumber,
        } as BingoSpot;
      });
  }
  return { value: card } as BingoCard;
}

export class StringToPointsArray implements InputParser<Line[]> {
  constructor(
    private pointsSeparator: string = ' -> ',
    private pointsValueSeparator: string = ','
  ) {}
  parse(input: string): Line[] {
    const lines = input.split('\n').filter((line) => line !== '');
    const pointsInput = lines.map((line) => {
      const pointsInLine = line
        .split(this.pointsSeparator)
        .map((pointInputs) => {
          const pointsArray = pointInputs.split(this.pointsValueSeparator);
          return new Point(+pointsArray[0], +pointsArray[1]);
        });
      return new Line(this.getPointsBetween(pointsInLine[0], pointsInLine[1]));
    });
    return pointsInput;
  }

  private getPointsBetween(pointA: Point, pointB: Point): Point[] {
    let points: Point[] = [];
    if (pointA.X === pointB.X) {
      const x = pointA.X;
      const minY = Math.min(pointA.Y, pointB.Y);
      const maxY = Math.max(pointA.Y, pointB.Y);
      for (let y = minY; y <= maxY; y++) {
        points.push(new Point(x, y));
      }
    }
    if (pointA.Y === pointB.Y) {
      const y = pointA.Y;
      const minX = Math.min(pointA.X, pointB.X);
      const maxX = Math.max(pointA.X, pointB.X);
      for (let x = minX; x <= maxX; x++) {
        points.push(new Point(x, y));
      }
    }
    if (this.isDiagonal(pointA, pointB)) {
      const difference = pointA.sub(pointB);
      const directionX = difference.X / Math.abs(difference.X);
      const directionY = difference.Y / Math.abs(difference.Y);
      const currentIndex = [pointA.X, pointA.Y];

      while (currentIndex[0] !== pointB.X && currentIndex[1] !== pointB.Y) {
        points.push(new Point(currentIndex[0], currentIndex[1]));
        currentIndex[0] -= directionX;
        currentIndex[1] -= directionY;
      }
      points.push(pointB);
    }

    return points;
  }

  private isDiagonal(pointA: Point, pointB: Point): boolean {
    const subResult = pointA.sub(pointB).abs();
    return subResult.X === subResult.Y;
  }
}
