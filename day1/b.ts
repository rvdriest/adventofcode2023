import fs from "fs";

function transformString(value: string): string {
  return value
    .replace(/one/g, "o1e")
    .replace(/two/g, "t2o")
    .replace(/three/g, "t3e")
    .replace(/four/g, "4")
    .replace(/five/g, "5e")
    .replace(/six/g, "6")
    .replace(/seven/g, "7n")
    .replace(/eight/g, "e8t")
    .replace(/nine/g, "n9e");
}

function main() {
  const text = fs.readFileSync("input.txt", "utf8").split(/\n/);
  let sum = 0;
  for (let i = 0; i < text.length; i++) {
    const line = transformString(text[i]);
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

    console.log({
      line: text[i],
      digits: `${firstDigit}${lastDigit}`,
    });
    sum += Number.parseInt(`${firstDigit}${lastDigit}`);
  }

  console.log("Sum", sum);
}

main();
