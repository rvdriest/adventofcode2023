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

function getMinPossibleValues(game: Game) {
  const gameSet: GameSet = {
    red: 1,
    green: 1,
    blue: 1,
  };

  for (let i = 0; i < game.sets.length; i++) {
    const set = game.sets[i];
    if ((set.blue ?? 1) > (gameSet.blue ?? 1)) {
      gameSet.blue = set.blue;
    }
    if ((set.green ?? 1) > (gameSet.green ?? 1)) {
      gameSet.green = set.green;
    }
    if ((set.red ?? 1) > (gameSet.red ?? 1)) {
      gameSet.red = set.red;
    }
  }

  return gameSet;
}

function main() {
  const gamesFromText = fs.readFileSync("input.txt", "utf8").split(/\n/);
  const games = gamesFromText.map(textToGame);

  const sumOfPower = games.reduce((acc, curr) => {
    return (
      acc +
      (getMinPossibleValues(curr).blue ?? 1) *
        (getMinPossibleValues(curr).green ?? 1) *
        (getMinPossibleValues(curr).red ?? 1)
    );
  }, 0);

  console.log(sumOfPower);
}

main();
