import { useRef, useEffect, useState } from 'react'
import { get, set } from "idb-keyval"

const emptyGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

export const use2048 = () => {
  const [grid, setGrid] = useState(emptyGrid);
  const [gameIsOn, setGameIsOn] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const loadBestScore = async () => {
      const savedScore = await get("best-score-2048");
      if (savedScore) {
        setBestScore(savedScore);
      }
    };
    loadBestScore();
  }, []);

  const touchStart = useRef({ x: 0, y: 0});

  const mergeTiles = (tiles) => {
    let addedScore = 0;
    tiles.forEach((el, i) => {
      if (i > 0 && el === tiles[i - 1]) {
        const sum = tiles[i - 1] * 2;
        addedScore += sum;
        tiles[i - 1] = sum;
        tiles[i] = 0;
      }
    })
    return {
      mergedTiles: tiles.filter(tile => tile !== 0),
      addedScore
    }
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
      let isMoved = false;
      let totalAddedScore = 0;
      const newGrid = grid.map(row => [...row]);
      switch (e.key) {
        case 'ArrowUp': {
          for (let col = 0; col < 4; col++) {
            const column = [];
            for (let row = 0; row < 4; row++) {
              if (newGrid[row][col] !== 0) column.push(newGrid[row][col]);
            };

            const { mergedTiles, addedScore } = mergeTiles(column);
            totalAddedScore += addedScore;

            const finalColumn = [...mergedTiles];
            while (finalColumn.length < 4) finalColumn.push(0);

            for (let row = 0; row < 4; row++) {
              if (newGrid[row][col] !== finalColumn[row]) isMoved = true;
              newGrid[row][col] = finalColumn[row];
            };
          }
          break;
        };
        case 'ArrowDown': {
          for (let col = 0; col < 4; col++) {
            const column = [];
            for (let row = 3; row >= 0; row--) {
              if (newGrid[row][col] !== 0) column.push(newGrid[row][col]);
            };

            const { mergedTiles, addedScore } = mergeTiles(column);
            totalAddedScore += addedScore;

            const finalColumn = [...mergedTiles];
            while (finalColumn.length < 4) finalColumn.push(0);

            for (let row = 3, k = 0; row >= 0; row--, k++) {
              if (newGrid[row][col] !== finalColumn[k]) isMoved = true;
              newGrid[row][col] = finalColumn[k];
            };
          }
          break;
        };
        case 'ArrowLeft': {
          for (let row = 0; row < 4; row ++) {
            const currentRow = [];
            for (let col = 0; col < 4; col++) {
              if (newGrid[row][col] !== 0) currentRow.push(newGrid[row][col]);
            };

            const { mergedTiles, addedScore } = mergeTiles(currentRow);
            totalAddedScore += addedScore;

            const finalRow = [...mergedTiles];
            while (finalRow.length < 4) finalRow.push(0);

            for (let col = 0; col < 4; col++) {
              if (newGrid[row][col] !== finalRow[col]) isMoved = true;
              newGrid[row][col] = finalRow[col];
            };
          }
          break;
        };
        case 'ArrowRight': {
          for (let row = 0; row < 4; row ++) {
            const currentRow = [];
            for (let col = 3; col >= 0; col--) {
              if (newGrid[row][col] !== 0) currentRow.push(newGrid[row][col]);
            };

            const { mergedTiles, addedScore } = mergeTiles(currentRow);
            totalAddedScore += addedScore;

            const finalRow = [...mergedTiles];
            while (finalRow.length < 4) finalRow.push(0);

            for (let col = 3, k = 0; col >= 0; col--, k++) {
              if (newGrid[row][col] !== finalRow[k]) isMoved = true;
              newGrid[row][col] = finalRow[k];
            };
          }
          break;
        };
      }
      if (isMoved) {
        setGrid(spawnNewValue(newGrid));
        setCurrentScore(prev => {
          const newScore = prev + totalAddedScore;
          setBestScore(prevBest => {
            const updatedBestScore = Math.max(prevBest, newScore);
            if (updatedBestScore > prevBest) set( "best-score-2048", updatedBestScore);
            return updatedBestScore;
          })
          return newScore;
        })
      }
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
  }, [gameIsOn, grid]);

  return {
    grid,
    startGame: () => {
      const newGrid = JSON.parse(JSON.stringify(emptyGrid));
      spawnNewValue(newGrid);
      spawnNewValue(newGrid);
      setGrid(newGrid);
      setGameIsOn(true);
      setCurrentScore(0);
    },
    currentScore: currentScore,
    bestScore: bestScore
  }
}