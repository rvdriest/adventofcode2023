import fs from "fs";

function getNumberValues(nums: string) {
  return nums
    .split(" ")
    .map((n) => {
      if (n !== "") {
        return Number.parseInt(n);
      }
      return;
    })
    .filter((n) => n !== undefined) as number[];
}

function getAmountOfMatches(
  winningNumbers: number[],
  yourNumbers: number[]
): number {
  let amountOfMatches = 0;
  for (let i = 0; i < yourNumbers.length; i++) {
    for (let j = 0; j < winningNumbers.length; j++) {
      if (winningNumbers[j] === yourNumbers[i]) {
        amountOfMatches++;
      }
    }
  }
  return amountOfMatches;
}

function main() {
  const games = fs
    .readFileSync("input.txt", {
      encoding: "utf8",
    })
    .split("\n");

  let gamesArr = Array(games.length).fill(1);

  for (let i = 0; i < games.length; i++) {
    const game = games[i].split(": ")[1];
    const numbers = game.split(" | ");
    const winningNumbers = getNumberValues(numbers[0]);
    const yourNumbers = getNumberValues(numbers[1]);
    const matches = getAmountOfMatches(winningNumbers, yourNumbers);
    for (let j = i + 1; j <= i + matches; j++) {
      gamesArr[j] = gamesArr[i] + gamesArr[j];
    }
  }

  console.log(gamesArr.reduce((acc, curr) => acc + curr, 0));
  // console.log(points);
}

main();
