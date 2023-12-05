import fs from "fs";

// Every second number in the array is the range.
// Example: 79 4 18 5 -> [[79, 83], [18, 23]]
function getSeedsFromArray(arr: number[]): number[][] {
  const seeds: number[][] = [];
  for (let i = 0; i < arr.length; i += 2) {
    seeds.push([arr[i], arr[i] + arr[i + 1]]);
  }
  return seeds;
}

function main() {
  const file = fs
    .readFileSync("test-input.txt", {
      encoding: "utf-8",
    })
    .split("\n\n");

  const [seedsLine, ...unprocessedMaps] = file;
  let seeds = getSeedsFromArray(
    seedsLine
      .split(": ")[1]
      .split(" ")
      .map((num) => Number.parseInt(num))
  );
  const maps = unprocessedMaps.map((m) =>
    m
      .split(":\n")[1]
      .split("\n")
      .map((n) => n.split(" "))
      .map((n) => n.map((num) => Number.parseInt(num)))
  );

  for (const map of maps) {
    // for (let seedIdx = 0; seedIdx < seeds.length; seedIdx += 2) {
    //   for (
    //     let seed = seeds[seedIdx];
    //     seed < seeds[seedIdx] + seeds[seedIdx + 1] - 1;
    //     seed++
    //   ) {
    //     for (const line of map) {
    //       const [destinationRangeStart, sourceRangeStart, rangeLength] = line;
    //       if (
    //         seed >= sourceRangeStart &&
    //         seed < sourceRangeStart + rangeLength
    //       ) {
    //         seeds[seedIdx] = destinationRangeStart + (seed - sourceRangeStart);
    //       }
    //     }
    //   }
    // }
    // while(seeds) {
    // 	const [start, end] = seeds.pop();
    // 	for (let [destinationRangeStart, sourceRangeStart, rangeLength] of map) {
    // 		overlapStart = Math.max(destinationRangeStart, sourceRangeStart);
    // 	}
    // }
  }
  console.log(seeds);
  // console.log(Math.min(...seeds));
}

// main();
// console.log(getSeedsFromArray([79, 18, 42, 18]));
