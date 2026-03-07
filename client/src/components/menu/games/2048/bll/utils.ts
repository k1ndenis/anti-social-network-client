export const emptyGrid: number[][] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

export const mergeTiles = (tiles: number[], onWin: () => void): { mergedTiles: number[]; addedScore: number } => {
  let addedScore = 0;
  tiles.forEach((el, i) => {
    if (i > 0 && el === tiles[i - 1]) {
      const prev = tiles[i - 1] ?? 0;
      const sum = prev * 2;
      addedScore += sum;
      tiles[i - 1] = sum;
      tiles[i] = 0;
      if (sum === 2048) onWin();
    }
  })
  return {
    mergedTiles: tiles.filter(tile => tile !== 0),
    addedScore,
  }
}

export const spawnNewValue = (newGrid: number[][]): number[][] => {
  type TileCoords = { colInd: number; rowInd: number }
  const emptyTiles: TileCoords[] = [];
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      if (newGrid[c]?.[r] === 0) {
        emptyTiles.push({ colInd: c, rowInd: r });
      }
    }
  }

  if (emptyTiles.length === 0) return newGrid;

  const coords = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  newGrid[coords.colInd][coords.rowInd] = Math.random() < 0.1 ? 4 : 2;
  return newGrid;
}

export const checkGameOver = (newGrid: number[][]): boolean => {
  let hasEmptyCells = false;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (newGrid[r]?.[c] === 0) {
        hasEmptyCells = true;
        break;
      }
    }
    if (hasEmptyCells) break;
  }

  if (hasEmptyCells) return false;

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      if (newGrid[r]?.[c] === newGrid[r]?.[c + 1]) {
        return false;
      }
    }
  }

  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 3; r++) {
      if (newGrid[r]?.[c] === newGrid[r + 1]?.[c]) {
        return false;
      }
    }
  }
  return true;
}