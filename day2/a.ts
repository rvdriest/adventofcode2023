import fs from "fs";

interface Game {
  id: number;
  sets: GameSet[];
}

interface GameSet {
  red?: number;
  green?: number;
  blue?: number;
}

function gameSetFromString(text: string) {
  const cubes = text.split(", ");

  const gameSet: GameSet = {
    red: undefined,
    green: undefined,
    blue: undefined,
  };
  for (let i = 0; i < cubes.length; i++) {
    const [number, color] = cubes[i].split(" ");
    gameSet[color as keyof GameSet] = Number.parseInt(number);
  }

  return gameSet;
}

function textToGame(text: string): Game {
  const [game, setsString] = text.split(": ");
  const gameId = game.split(" ")[1];
  const gameSets = setsString.split("; ").map(gameSetFromString);

  return {
    id: Number.parseInt(gameId),
    sets: gameSets,
  };
}

function main() {
  const gamesFromText = fs.readFileSync("input.txt", "utf8").split(/\n/);
  const games = gamesFromText.map(textToGame);

  const countedIds = games.reduce((acc, curr) => {
    for (let i = 0; i < curr.sets.length; i++) {
      if (
        (curr.sets[i].red ?? 0) > 12 ||
        (curr.sets[i].green ?? 0) > 13 ||
        (curr.sets[i].blue ?? 0) > 14
      ) {
        return acc;
      }
    }

    return acc + curr.id;
  }, 0);

  console.log(countedIds);
}

main();
