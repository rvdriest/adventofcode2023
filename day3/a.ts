import fs from "fs";

function main() {
  const file = fs.readFileSync("input.txt", {
    encoding: "utf-8",
  });

  const lines = file.split("\n").map((line) => line.split(""));
  const numsStrings: string[] = [];
  console.log(file.split("\n"));
  for (let i = 0; i < lines.length; i++) {
    const characters = lines[i];

    let numCharacters = "";
    for (let j = 0; j < characters.length; j++) {
      let firstIndexToCheck = Math.max(j - numCharacters.length - 1, 0);
      if (characters[j].match(/\d/)) {
        numCharacters += characters[j];
        if (j !== characters.length - 1) {
          // If not at the end, continue
          firstIndexToCheck -= 1;
          continue;
        }
      }

      if (numCharacters.length > 0) {
        const toIndex = j;
        for (let k = firstIndexToCheck; k < toIndex + 1; k++) {
          if (
            (i > 0 &&
              lines[i - 1]?.[k] !== "." &&
              !lines[i - 1]?.[k]?.match(/\d/)) || // Check previous line
            (i !== lines.length - 1 &&
              lines[i + 1]?.[k] !== "." &&
              !lines[i + 1]?.[k]?.match(/\d/)) || // Check next line
            (firstIndexToCheck >= 0 &&
              j - numCharacters.length > 0 &&
              characters[firstIndexToCheck] !== ".") || // Check left
            (j !== characters.length - 1 && characters[j] !== ".") // Check right
          ) {
            numsStrings.push(numCharacters);
            break;
          }
        }

        numCharacters = "";
        continue;
      }
    }
  }

  console.log(
    numsStrings.reduce((acc, curr) => {
      return acc + Number.parseInt(curr);
    }, 0)
  );
}

main();
