import { InputParser } from '../Input/Parser';

export default class Solver<I> {
  private inputParser: InputParser<I>;
  private runner: (value: I, ...args: any[]) => string;
  private args: any[];
  constructor(
    inputParser: InputParser<I>,
    runner: (value: I, ...args: any[]) => string,
    ...args: any[]
  ) {
    this.inputParser = inputParser;
    this.runner = runner;
    this.args = args;
  }

  public solve(input: string): string {
    return this.runner(this.inputParser.parse(input), ...this.args);
  }
}
