import fs from "fs";

function main() {
  const file = fs
    .readFileSync("input.txt", {
      encoding: "utf-8",
    })
    .split("\n\n");

  const [seedsLine, ...unprocessedMaps] = file;
  let seeds = seedsLine
    .split(": ")[1]
    .split(" ")
    .map((num) => Number.parseInt(num));

  const maps = unprocessedMaps.map((m) =>
    m
      .split(":\n")[1]
      .split("\n")
      .map((n) => n.split(" "))
      .map((n) => n.map((num) => Number.parseInt(num)))
  );

  for (const map of maps) {
    for (let seedIdx = 0; seedIdx < seeds.length; seedIdx++) {
      const seed = seeds[seedIdx];
      for (const line of map) {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = line;
        if (seed >= sourceRangeStart && seed < sourceRangeStart + rangeLength) {
          seeds[seedIdx] = destinationRangeStart + (seed - sourceRangeStart);
          break;
        }
      }
    }
  }

  console.log(Math.min(...seeds));
}

main();
