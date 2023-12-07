import fs from "fs";

const handTypes = [
  "FIVE_OF_A_KIND",
  "FOUR_OF_A_KIND",
  "FULL_HOUSE",
  "THREE_OF_A_KIND",
  "TWO_PAIRS",
  "ONE_PAIR",
  "HIGH_CARD",
];
const possibleCards = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

function calculateHand(cards: string[]): {
  type: (typeof handTypes)[number];
  score: number[];
} {
  const calculatedHand = cards.map((c) => possibleCards.indexOf(c));

  // Check if all items in cards array are the same
  const FIVE_OF_A_KIND = cards.every((c) => c === cards[0]);
  if (FIVE_OF_A_KIND) {
    return {
      type: "FIVE_OF_A_KIND",
      score: calculatedHand,
    };
  }

  // Four of a kind
  const FOUR_OF_A_KIND = cards.some(
    (c) => cards.filter((cc) => cc === c).length === 4
  );
  if (FOUR_OF_A_KIND) {
    return {
      type: "FOUR_OF_A_KIND",
      score: calculatedHand,
    };
  }

  // Full house
  const FULL_HOUSE =
    cards.some((c) => cards.filter((cc) => cc === c).length === 3) &&
    cards.some((c) => cards.filter((cc) => cc === c).length === 2);
  if (FULL_HOUSE) {
    return {
      type: "FULL_HOUSE",
      score: calculatedHand,
    };
  }

  // Three of a kind
  const THREE_OF_A_KIND = cards.some(
    (c) => cards.filter((cc) => cc === c).length === 3
  );
  if (THREE_OF_A_KIND) {
    return {
      type: "THREE_OF_A_KIND",
      score: calculatedHand,
    };
  }

  // Two pairs
  // If exactly 1 card is unique, then it's a pair
  const TWO_PAIRS =
    cards.filter((c) => cards.filter((cc) => cc === c).length === 1).length ===
    1;

  if (TWO_PAIRS) {
    return {
      type: "TWO_PAIRS",
      score: calculatedHand,
    };
  }

  // One Pair
  const ONE_PAIR = cards.some(
    (c) => cards.filter((cc) => cc === c).length === 2
  );
  if (ONE_PAIR) {
    return {
      type: "ONE_PAIR",
      score: calculatedHand,
    };
  }

  return {
    type: "HIGH_CARD",
    score: calculatedHand,
  };
}

function calculateScore(
  scoresMap: Record<
    (typeof handTypes)[number],
    { score: number[]; scoreMultiplier: number }[]
  >
): number {
  let score = 0;
  let rank = 1;
  for (const handType of handTypes.reverse()) {
    for (const hand of scoresMap[handType]) {
      score += hand.scoreMultiplier * rank;
      rank++;
    }
  }
  return score;
}

function main() {
  const file = fs.readFileSync("input.txt", { encoding: "utf-8" });

  const game = file.split("\n").map((l) => ({
    cards: l.split(" ")[0].split(""),
    scoreMultiplier: Number.parseInt(l.split(" ")[1]),
  }));

  const scoresMap: Record<
    (typeof handTypes)[number],
    { score: number[]; scoreMultiplier: number }[]
  > = {
    FIVE_OF_A_KIND: [],
    FOUR_OF_A_KIND: [],
    FULL_HOUSE: [],
    THREE_OF_A_KIND: [],
    TWO_PAIRS: [],
    ONE_PAIR: [],
    HIGH_CARD: [],
  };

  for (const cards of game) {
    const card = calculateHand(cards.cards);
    scoresMap[card.type].push({
      score: card.score,
      scoreMultiplier: cards.scoreMultiplier,
    });
  }

  // Sort each hand type by score
  for (const handType of handTypes) {
    scoresMap[handType].sort((a, b) => {
      for (let i = 0; i < a.score.length; i++) {
        if (a.score[i] < b.score[i]) {
          return -1;
        } else if (a.score[i] > b.score[i]) {
          return 1;
        }
      }
      return 0;
    });
  }

  console.log(calculateScore(scoresMap));
}

main();
