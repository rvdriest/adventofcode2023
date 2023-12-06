import fs from "fs";

function main() {
  const file = fs.readFileSync("input.txt", { encoding: "utf-8" });
  const [timingNumber, recordDistance] = file.split("\n").map((l) =>
    Number.parseInt(
      l
        .split(":")[1]
        .trim()
        .split(" ")
        .map((n) => n.trim())
        .filter((n) => n !== "")
        .join("")
    )
  );

  let waysToWin = 0;

  let foundTiming = false;
  for (let holdingTime = 1; holdingTime < timingNumber; holdingTime++) {
    const traveledDistance = (timingNumber - holdingTime) * holdingTime;
    if (traveledDistance > recordDistance) {
      foundTiming = true;
      waysToWin++;
    } else if (foundTiming) {
      break;
    }
  }
  console.log(waysToWin);
}

main();
