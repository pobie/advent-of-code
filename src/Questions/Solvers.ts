import {
  InputParser,
  StringToArrayParser,
  StringToKeyNumberTupleParser,
  StringToNumericArrayParser,
} from '../Input/Parser';
import {
  countDepthIncreases,
  countSlidingWindowDepthIncreases,
} from './Question1';

import {
  getDepthMultipliedByHorizontalPosition,
  getDepthMultipliedByHorizontalPositionWithAim,
} from './Question2';
import { getLifeSupportRating, getPowerConsumption } from './Question3';
import Solver from './Solver';

const stringToArrayParser = new StringToArrayParser();
const stringToNumericArrayParser = new StringToNumericArrayParser();
const stringToTupleArray = new StringToKeyNumberTupleParser();

export const Solvers: { [key: string]: Solver<any>[] } = {
  '1': [
    new Solver(stringToNumericArrayParser, countDepthIncreases),
    new Solver(stringToNumericArrayParser, countSlidingWindowDepthIncreases),
  ],
  '2': [
    new Solver(stringToTupleArray, getDepthMultipliedByHorizontalPosition),
    new Solver(
      stringToTupleArray,
      getDepthMultipliedByHorizontalPositionWithAim
    ),
  ],
  '3': [
    new Solver(stringToArrayParser, getPowerConsumption),
    new Solver(stringToArrayParser, getLifeSupportRating),
  ],
};
