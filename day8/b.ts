import fs from "fs";

const fileContent = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = fileContent.split("\n");
const directions = lines[0].split("");

type Node = {
  left: string;
  right: string;
  value: string;
};

function lcm(a: number, b: number) {
  return (a * b) / gcd(a, b);
}

function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

const nodes = new Map<string, Node>();
const network = lines.slice(2, lines.length);

for (const line of network) {
  const [key, value] = line.split(" = ");
  const [left, right] = value.slice(1, value.length - 1).split(", ");
  nodes.set(key, { left, right, value: key });
}

let startingNodes = Array.from(nodes.values()).filter(
  (node) => node.value[2] === "A"
);

const currentNodeValues = Array(startingNodes.length).fill("");

function getStepsForNode(node: Node) {
  let directionIndex = 0;
  let amountOfSteps = 0;
  while (true) {
    const direction = directions[directionIndex];
    if (direction === "L") {
      node = nodes.get(node.left) as Node;
    } else {
      node = nodes.get(node.right) as Node;
    }
    if (directionIndex === directions.length - 1) {
      directionIndex = 0;
    } else {
      directionIndex++;
    }

    amountOfSteps++;

    if (node.value.split("")[2] === "Z") {
      return amountOfSteps;
    }
  }
}

let totalSteps: number[] = [];
for (const node of startingNodes) {
  totalSteps.push(getStepsForNode(node));
}

console.log(totalSteps);
console.log(totalSteps.reduce(lcm));
// console.log(amountOfSteps);
