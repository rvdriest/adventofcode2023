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

function calculatePoints(
  winningNumbers: number[],
  yourNumbers: number[]
): number {
  let points = 0;
  for (let i = 0; i < yourNumbers.length; i++) {
    for (let j = 0; j < winningNumbers.length; j++) {
      if (winningNumbers[j] === yourNumbers[i]) {
        if (points === 0) {
          points = 1;
        } else {
          points *= 2;
        }
      }
    }
  }
  return points;
}

function main() {
  const games = fs
    .readFileSync("input.txt", {
      encoding: "utf8",
    })
    .split("\n");

  let points = 0;
  for (let i = 0; i < games.length; i++) {
    const game = games[i].split(": ")[1];
    const numbers = game.split(" | ");
    const winningNumbers = getNumberValues(numbers[0]);
    const yourNumbers = getNumberValues(numbers[1]);

    points += calculatePoints(winningNumbers, yourNumbers);
  }
  console.log(points);
}

main();
