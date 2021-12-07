import {
  StringToArrayParser,
  StringToBingoCardsParser,
  StringToKeyNumberTupleParser,
  StringToNumericArrayParser,
  StringToPointsArray,
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
import { getFinalScore } from './Question4';
import { getOverlappingPoints } from './Question5';
import { countLanternfishAfterDays } from './Question6';
import Solver from './Solver';

const stringToArrayParser = new StringToArrayParser();
const stringToNumericArrayParser = new StringToNumericArrayParser();
const stringToTupleArray = new StringToKeyNumberTupleParser();
const stringToBingoCardsParser = new StringToBingoCardsParser();
const stringToPointsArray = new StringToPointsArray();
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
  '4': [new Solver(stringToBingoCardsParser, getFinalScore)],
  '5': [new Solver(stringToPointsArray, getOverlappingPoints)],
  '6': [
    new Solver(
      new StringToNumericArrayParser(','),
      countLanternfishAfterDays,
      80
    ),
    new Solver(
      new StringToNumericArrayParser(','),
      countLanternfishAfterDays,
      256
    ),
  ],
};
