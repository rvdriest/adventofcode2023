import fs from "fs";

function main() {
  const file = fs.readFileSync("input.txt", { encoding: "utf-8" });
  const [timeNumbers, distanceNumbers] = file.split("\n").map((l) =>
    l
      .split(":")[1]
      .trim()
      .split(" ")
      .map((n) => Number.parseInt(n))
      .filter((n) => !Number.isNaN(n))
  );

  const waysToWin = Array(timeNumbers.length).fill(0);
  for (let i = 0; i < timeNumbers.length; i++) {
    const timingNumber = timeNumbers[i];
    const recordDistance = distanceNumbers[i];

    let foundTiming = false;
    for (let holdingTime = 1; holdingTime < timingNumber; holdingTime++) {
      const traveledDistance = (timingNumber - holdingTime) * holdingTime;
      if (traveledDistance > recordDistance) {
        foundTiming = true;
        waysToWin[i]++;
      } else if (foundTiming) {
        break;
      }
    }
  }
  console.log(waysToWin.reduce((acc, curr) => acc * curr, 1));
}

main();
