import { useRef, useEffect, useState } from 'react'

const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

export const use2048 = () => {
  const [grid, setGrid] = useState(emptyGrid);
  const [gameIsOn, setGameIsOn] = useState(false);

  const touchStart = useRef({ x: 0, y: 0});

  const mergeTiles = (tiles) => {
    tiles.forEach((el, i) => {
      if (i > 0 && el === tiles[i - 1]) {
        tiles[i - 1] = tiles[i - 1] + el;
        tiles[i] = 0;
      }
    })
    return tiles.filter(tile => tile !== 0)
  }

  const spawnNewValue = (newGrid) => {
    const emptyTiles = [];
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        if (newGrid[c][r] === 0) {
          emptyTiles.push({ colInd: c, rowInd: r });
        }
      }
    }

    if (emptyTiles.length === 0) return newGrid;

    const getRandomIndex = () => {
      const randomCoords = Math.floor(Math.random() * emptyTiles.length);
      return randomCoords;
    }
    const coords = getRandomIndex();
    const newValue = Math.random() < 0.1 ? 4 : 2;
    newGrid[emptyTiles[coords].colInd][emptyTiles[coords].rowInd] = newValue;
    return newGrid;
  }

  useEffect(() => {
    const handleTouchMove = (e) => {
      if (gameIsOn) e.preventDefault();
    }

    const handleTouchStart = (e) => {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    }

    const handleTouchEnd = (e) => {
      const deltaX = e.changedTouches[0].clientX - touchStart.current.x;
      const deltaY = e.changedTouches[0].clientY - touchStart.current.y;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (Math.max(absX, absY) > 30) {
        let key = '';
        if (absX > absY) {
          key = deltaX > 0 ? 'ArrowRight' : 'ArrowLeft';
        } else {
          key = deltaY > 0 ? 'ArrowDown' : 'ArrowUp';
        }
        handleKeyDown({ key, preventDefault: () => {} });
      }
    }

    const handleKeyDown = (e) => {
      if (!gameIsOn) return;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      setGrid(prevGrid => {
        let newGrid = prevGrid.map(row => [...row]);
        switch (e.key) {
          case 'ArrowUp': {
            let isMoved = false;
            for (let col = 0; col < 4; col++) {
              let column = [];
              for (let row = 0; row < 4; row++) {
                if (newGrid[row][col] !== 0) column.push(newGrid[row][col]);
              };

              column = mergeTiles(column);

              while (column.length < 4) column.push(0);

              for (let row = 0; row < 4; row++) {
                if (newGrid[row][col] !== column[row]) isMoved = true;
                newGrid[row][col] = column[row];
              };
            }
            if (isMoved) newGrid = spawnNewValue(newGrid);
            break;
          };
          case 'ArrowDown': {
            let isMoved = false;
            for (let col = 0; col < 4; col++) {
              let column = [];
              for (let row = 3; row >= 0; row--) {
                if (newGrid[row][col] !== 0) column.push(newGrid[row][col]);
              };

              column = mergeTiles(column);

              while (column.length < 4) column.push(0);

              for (let row = 3, k = 0; row >= 0; row--, k++) {
                if (newGrid[row][col] !== column[k]) isMoved = true;
                newGrid[row][col] = column[k];
              };
            }
            if (isMoved) newGrid = spawnNewValue(newGrid);
            break;
          };
          case 'ArrowLeft': {
            let isMoved = false;
            for (let row = 0; row < 4; row ++) {
              let currentRow = [];
              for (let col = 0; col < 4; col++) {
                if (newGrid[row][col] !== 0) currentRow.push(newGrid[row][col]);
              };

              currentRow = mergeTiles(currentRow);

              while (currentRow.length < 4) currentRow.push(0);

              for (let col = 0; col < 4; col++) {
                if (newGrid[row][col] !== currentRow[col]) isMoved = true;
                newGrid[row][col] = currentRow[col];
              };
            }
            if (isMoved) newGrid = spawnNewValue(newGrid);
            break;
          };
          case 'ArrowRight': {
            let isMoved = false;
            for (let row = 0; row < 4; row ++) {
              let currentRow = [];
              for (let col = 3; col >= 0; col--) {
                if (newGrid[row][col] !== 0) currentRow.push(newGrid[row][col]);
              };

              currentRow = mergeTiles(currentRow);

              while (currentRow.length < 4) currentRow.push(0);

              for (let col = 3, k = 0; col >= 0; col--, k++) {
                if (newGrid[row][col] !== currentRow[k]) isMoved = true;
                newGrid[row][col] = currentRow[k];
              };
            }
            if (isMoved) newGrid = spawnNewValue(newGrid);
            break;
          };
        }
        return newGrid;
      })
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    }
  }, [gameIsOn]);

  return {
    grid,
    startGame: () => {
      const newGrid = JSON.parse(JSON.stringify(emptyGrid));
      spawnNewValue(newGrid);
      spawnNewValue(newGrid);
      setGrid(newGrid);
      setGameIsOn(true);
    }
  }
}