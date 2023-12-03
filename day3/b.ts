import fs from "fs";

function checkRight(characters: string[], index: number): string {
  let idx = index;
  let numStr = "";
  while (idx !== characters.length - 1) {
    if (!characters[idx + 1].match(/\d/)) {
      return numStr;
    }

    numStr += characters[idx + 1];
    idx++;
  }

  return numStr;
}

function checkLeft(characters: string[], index: number): string {
  let idx = index;
  let numStr = "";
  while (idx !== 0) {
    if (!characters[idx - 1].match(/\d/)) {
      return numStr;
    }

    numStr = characters[idx - 1] + numStr;
    idx--;
  }

  return numStr;
}

function getNumFromLineAndIndex(characters: string[], index: number): string {
  let idx = index;
  let numStr = characters[idx];

  if (!numStr.match(/\d/)) {
    return "";
  }

  if (idx === 0) {
    // Move right until no digit and return
    return numStr + checkRight(characters, idx);
  }

  if (idx === characters.length - 1) {
    // Move left until no digit and return
    return checkLeft(characters, idx) + numStr;
  }

  return checkLeft(characters, idx) + numStr + checkRight(characters, idx);
}

function getLineIndexes(
  characters: string[],
  fromIndex: number,
  toIndex: number
) {
  const nIndexes: number[] = [];
  let currNum = "";
  for (let k = fromIndex; k <= toIndex; k++) {
    if (characters[k]?.match(/\d/)) {
      currNum += characters[k];
      continue;
    }

    if (currNum.length > 0) {
      nIndexes.push(k - 1);
      currNum = "";
    }
  }

  if (currNum.length) {
    nIndexes.push(toIndex);
  }

  return nIndexes;
}

function main() {
  const file = fs.readFileSync("input.txt", {
    encoding: "utf-8",
  });

  const lines = file.split("\n").map((line) => line.split(""));
  let totalNum = 0;
  for (let i = 0; i < lines.length; i++) {
    const characters = lines[i];
    for (let j = 0; j < characters.length; j++) {
      if (characters[j] !== "*") {
        continue;
      }

      const numIndexes: { lineIdx: number; charIdx: number }[] = [];

      // Check left side
      if (j - 1 >= 0 && characters[j - 1].match(/\d/)) {
        numIndexes.push({ lineIdx: i, charIdx: j - 1 });
      }

      // Check right side
      if (j + 1 <= characters.length - 1 && characters[j + 1].match(/\d/)) {
        numIndexes.push({ lineIdx: i, charIdx: j + 1 });
      }

      let fromIndex = j > 0 ? j - 1 : j;
      let toIndex = j < characters.length - 1 ? j + 1 : j;
      if (i > 0) {
        // Check top row
        const lineIndexes = getLineIndexes(lines[i - 1], fromIndex, toIndex);
        numIndexes.push(
          ...lineIndexes.map((idx) => ({
            lineIdx: i - 1,
            charIdx: idx,
          }))
        );
      }
      if (i < lines.length - 1) {
        // Check bottom row
        const lineIndexes = getLineIndexes(lines[i + 1], fromIndex, toIndex);
        numIndexes.push(
          ...lineIndexes.map((idx) => ({
            lineIdx: i + 1,
            charIdx: idx,
          }))
        );
      }

      if (numIndexes.length === 2) {
        totalNum +=
          Number.parseInt(
            getNumFromLineAndIndex(
              lines[numIndexes[0].lineIdx],
              numIndexes[0].charIdx
            )
          ) *
          Number.parseInt(
            getNumFromLineAndIndex(
              lines[numIndexes[1].lineIdx],
              numIndexes[1].charIdx
            )
          );
      }
    }
  }

  console.log(totalNum);
  // console.log(
  //   numsStrings.reduce((acc, curr) => {
  //     return acc + Number.parseInt(curr);
  //   }, 0)
  // );
}

main();
// test();
