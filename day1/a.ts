import fs from "fs";

function main() {
  const text = fs.readFileSync("input.txt", "utf8").split(/\n/);
  let sum = 0;
  for (let i = 0; i < text.length; i++) {
    const line = text[i];
    const characters = line.split("");
    let firstDigit: string = "";
    let lastDigit: string = "";
    if (!characters.length) {
      continue;
    }
    for (let j = 0; j < characters.length; j++) {
      const character = characters[j];
      if (character.match(/^\d+$/)) {
        // Value is a number
        if (!firstDigit) {
          firstDigit = character;
        }

        lastDigit = character;
      }
    }

    sum += Number.parseInt(`${firstDigit}${lastDigit}`);
  }

  console.log("Sum", sum);
}

main();
