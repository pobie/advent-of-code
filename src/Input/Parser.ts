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
