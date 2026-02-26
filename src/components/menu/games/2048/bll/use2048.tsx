import { useRef, useEffect, useState } from 'react'
import { get, set } from "idb-keyval"
import { Use2048Return } from './types/types';
import { checkGameOver, emptyGrid, mergeTiles, spawnNewValue } from './utils';

export const use2048 = (): Use2048Return => {
  const [grid, setGrid] = useState<number[][]>(emptyGrid);
  const [gameIsOn, setGameIsOn] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWin, setGameWin] = useState<boolean>(false);

  useEffect(() => {
    const loadBestScore = async (): Promise<void> => {
      const savedScore = await get("best-score-2048");
      if (savedScore) {
        setBestScore(savedScore);
      }
    };
    loadBestScore();
  }, []);

  const touchStart = useRef<{ x: number; y: number }>({ x: 0, y: 0});

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (gameIsOn) e.preventDefault();
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
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

    const handleKeyDown = (e: KeyboardEvent | { key: string; preventDefault: () => void }) => {
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
              if (newGrid[row]?.[col] !== 0) column.push(newGrid[row]?.[col]);
            };

            const { mergedTiles, addedScore } = mergeTiles(column, () => setGameWin(true));
            totalAddedScore += addedScore;

            const finalColumn = [...mergedTiles];
            while (finalColumn.length < 4) finalColumn.push(0);

            for (let row = 0; row < 4; row++) {
              if (newGrid[row]?.[col] !== finalColumn[row]) isMoved = true;
              newGrid[row][col] = finalColumn[row];
            };
          }
          break;
        };
        case 'ArrowDown': {
          for (let col = 0; col < 4; col++) {
            const column = [];
            for (let row = 3; row >= 0; row--) {
              if (newGrid[row]?.[col] !== 0) column.push(newGrid[row]?.[col]);
            };

            const { mergedTiles, addedScore } = mergeTiles(column, () => setGameWin(true));
            totalAddedScore += addedScore;

            const finalColumn = [...mergedTiles];
            while (finalColumn.length < 4) finalColumn.push(0);

            for (let row = 3, k = 0; row >= 0; row--, k++) {
              if (newGrid[row]?.[col] !== finalColumn[k]) isMoved = true;
              newGrid[row][col] = finalColumn[k];
            };
          }
          break;
        };
        case 'ArrowLeft': {
          for (let row = 0; row < 4; row ++) {
            const currentRow = [];
            for (let col = 0; col < 4; col++) {
              if (newGrid[row]?.[col] !== 0) currentRow.push(newGrid[row]?.[col]);
            };

            const { mergedTiles, addedScore } = mergeTiles(currentRow, () => setGameWin(true));
            totalAddedScore += addedScore;

            const finalRow = [...mergedTiles];
            while (finalRow.length < 4) finalRow.push(0);

            for (let col = 0; col < 4; col++) {
              if (newGrid[row]?.[col] !== finalRow[col]) isMoved = true;
              newGrid[row][col] = finalRow[col];
            };
          }
          break;
        };
        case 'ArrowRight': {
          for (let row = 0; row < 4; row ++) {
            const currentRow = [];
            for (let col = 3; col >= 0; col--) {
              if (newGrid[row]?.[col] !== 0) currentRow.push(newGrid[row]?.[col]);
            };

            const { mergedTiles, addedScore } = mergeTiles(currentRow, () => setGameWin(true));
            totalAddedScore += addedScore;

            const finalRow = [...mergedTiles];
            while (finalRow.length < 4) finalRow.push(0);

            for (let col = 3, k = 0; col >= 0; col--, k++) {
              if (newGrid[row]?.[col] !== finalRow[k]) isMoved = true;
              newGrid[row][col] = finalRow[k];
            };
          }
          break;
        };
      }
      if (isMoved) {
        const updatedGrid = spawnNewValue(newGrid);
        setGrid(updatedGrid);
        setCurrentScore(prev => {
          const newScore = prev + totalAddedScore;
          setBestScore(prevBest => {
            const updatedBestScore = Math.max(prevBest, newScore);
            if (updatedBestScore > prevBest) set( "best-score-2048", updatedBestScore);
            return updatedBestScore;
          })
          return newScore;
        })
        if (checkGameOver(updatedGrid)) {
          setGameOver(true);
          setGameIsOn(false);
        }
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
    startGame: (): void => {
      const newGrid = JSON.parse(JSON.stringify(emptyGrid)) as number[][];
      spawnNewValue(newGrid);
      spawnNewValue(newGrid);
      setGrid(newGrid);
      setGameIsOn(true);
      setCurrentScore(0);
      setGameOver(false);
      setGameWin(false);
    },
    currentScore,
    bestScore,
    gameOver,
    gameWin,
    setGameWin
  }
}