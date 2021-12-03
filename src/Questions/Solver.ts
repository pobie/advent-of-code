import { InputParser } from '../Input/Parser';

export default class Solver<I> {
  private inputParser: InputParser<I>;
  private runner: (value: I) => string;

  constructor(inputParser: InputParser<I>, runner: (value: I) => string) {
    this.inputParser = inputParser;
    this.runner = runner;
  }

  public solve(input: string): string {
    return this.runner(this.inputParser.parse(input));
  }
}
