import fs from "fs";

const fileContent = fs.readFileSync("./input.txt", { encoding: "utf-8" });
const lines = fileContent.split("\n");
const directions = lines[0].split("");

type Node = {
  left: string;
  right: string;
  value: string;
};

const nodes = new Map<string, Node>();
const network = lines.slice(2, lines.length);

for (const line of network) {
  const [key, value] = line.split(" = ");
  const [left, right] = value.slice(1, value.length - 1).split(", ");
  nodes.set(key, { left, right, value: key });
}

let currentNode = nodes.get("AAA") as Node;
let directionIndex = 0;
let amountOfSteps = 0;

while (currentNode?.value !== "ZZZ") {
  const direction = directions[directionIndex];
  if (direction === "L") {
    currentNode = nodes.get(currentNode.left) as Node;
  } else {
    currentNode = nodes.get(currentNode.right) as Node;
  }

  if (directionIndex === directions.length - 1) {
    directionIndex = 0;
  } else {
    directionIndex++;
  }

  amountOfSteps++;
}

console.log(amountOfSteps);
