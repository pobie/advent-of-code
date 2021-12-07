export function getFinalScore(input: [number[], BingoCard[]]): string {
  const card = drawUntilLastWinner(input);
  if (!card) {
    return '0';
  }

  return card[1].toString();
}

function getScore(value: number, card: BingoCard): number {
  let sum = 0;
  for (let i = 0; i < card.value[0].length; i++) {
    for (let j = 0; j < card.value[i].length; j++) {
      if (!card.value[i][j].marked) {
        sum += card.value[i][j].value;
      }
    }
  }
  return sum * value;
}

// function draw(input: [number[], BingoCard[]]): [BingoCard, number] | undefined {
//   const spots = extractValues(input[0], input[1]);
//   for (let i = 0; i < input[0].length; i++) {
//     const curSpots = spots[input[0][i]];
//     for (let j = 0; j < curSpots.length; j++) {
//       curSpots[j].marked = true;
//       const card = input[1][curSpots[j].cardNumber - 1];
//       if (validateCard(card)) {
//         return [card, getScore(input[0][i], card)];
//       }
//     }
//   }
//   return undefined;
// }

function extractValues(
  draw: number[],
  input: BingoCard[]
): { [name: string]: BingoSpot[] } {
  let values: { [name: string]: BingoSpot[] } = {};
  draw.forEach((drawValue) => {
    values[drawValue] = [];
  });
  input.forEach((card) => {
    for (let i = 0; i < card.value.length; i++) {
      for (let j = 0; j < card.value[i].length; j++) {
        const cardValue = card.value[i][j];
        if (!values[cardValue.value]) {
          values[cardValue.value] = [];
        }
        values[cardValue.value].push(cardValue);
      }
    }
  });
  return values;
}

function validateCard(card: BingoCard): boolean {
  let markedByRow = [0, 0, 0, 0, 0];
  let markedByColumn = [0, 0, 0, 0, 0];
  for (let i = 0; i < card.value[0].length; i++) {
    for (let j = 0; j < card.value[i].length; j++) {
      if (card.value[i][j].marked) {
        markedByRow[i] += 1;
        markedByColumn[j] += 1;
      }
      if (
        markedByColumn.some((val) => val === 5) ||
        markedByRow.some((val) => val === 5)
      ) {
        return true;
      }
    }
  }
  return false;
}

function drawUntilLastWinner(
  input: [number[], BingoCard[]]
): [BingoCard, number] | undefined {
  const spots = extractValues(input[0], input[1]);
  let cardsWon: [BingoCard, number][] = [];
  for (let i = 0; i < input[0].length; i++) {
    const curSpots = spots[input[0][i]];
    for (let j = 0; j < curSpots.length; j++) {
      curSpots[j].marked = true;
      const card = input[1][curSpots[j].cardNumber - 1];
      if (!cardsWon.some((won) => won[0] === card)) {
        if (validateCard(card)) {
          cardsWon.push([card, getScore(input[0][i], card)]);
        }
      }
    }
  }
  return cardsWon[cardsWon.length - 1];
}

export type BingoCard = {
  value: BingoSpot[][];
};

export type BingoSpot = {
  value: number;
  marked: boolean;
  cardNumber: number;
  position: [number, number];
};
