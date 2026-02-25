import React, {  useEffect, useRef, useState } from "react"
import type { Question } from './types/question'
import './GridInputs.css'

interface GridInputsProps {
  questions: Question[];
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  activedCell: Question['startPosition'];
  setActivedCell: React.Dispatch<React.SetStateAction<Question['startPosition']>>;
  currentCells: Question['coordinates'];
  setCurrentCells: React.Dispatch<React.SetStateAction<Question['coordinates']>>;
  solvedCells: string[]
  setSolvedCells: React.Dispatch<React.SetStateAction<string[]>>;
  direction: Question['direction'];
  setDirection: React.Dispatch<React.SetStateAction<Question['direction']>>
}

type CellsState = Record<string, string>

export const GridInputs = ({
  questions,
  currentQuestion,
  setCurrentQuestion,
  activedCell,
  setActivedCell,
  currentCells,
  setCurrentCells,
  solvedCells,
  setSolvedCells,
  direction,
  setDirection
}: GridInputsProps) => {
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [cells, setCells] = useState<CellsState>({});
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const currentQ = questions[currentQuestion];
    if (currentQ) {
      setCurrentCells(currentQ.coordinates);
      setActivedCell(currentQ.startPosition);
      setDirection(currentQ.direction);
    }
  }, [currentQuestion, questions, setActivedCell, setCurrentCells, setDirection]);

  useEffect(() => {
    if (inputRefs.current[activedCell]) {
      inputRefs.current[activedCell].focus();
    }
  }, [activedCell]);

  if (!questions || questions.length === 0) return <div>Загрузка...</div>;

  const chekWord = (wordIndex: number, currentCells: Question['coordinates'] | CellsState) => {
    const targetWord = questions[wordIndex].position;

    const isObject = typeof currentCells === 'object' && !Array.isArray(currentCells);

    const isCorrect = Object.entries(targetWord).every(([coord, letter]) => {
      if (isObject) {
        return currentCells[coord] === letter;
      } else {
        const index = parseInt(coord, 10);
        return currentCells[index] === letter;
      }
    })

    if (isCorrect) {
      const newSolvedCoords = Object.keys(targetWord);
      setSolvedCells(prev => [...prev, ...newSolvedCoords]);
      const nextIndex = wordIndex + 1;
      if (nextIndex < questions.length) {
        const nextQuestion = questions[nextIndex];
        setCurrentQuestion(nextIndex);
        setCurrentCells(nextQuestion.coordinates);
        setDirection(nextQuestion.direction)
        setActivedCell(nextQuestion.startPosition);
      } else setIsSolved(true);
      return true;
    }
    return false;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    const endPos = questions[currentQuestion].endPosition
    const step = direction === "horizontal" ? 1 : 10;

    if (solvedCells.includes(name)) {
      let nextIndex = i;

      while (nextIndex < endPos) {
        nextIndex += step;
        const nextId = `${Math.floor(nextIndex / 10)}-${nextIndex % 10}`;

        if (!solvedCells.includes(nextId)) {
          setActivedCell(nextIndex);
          break;
        }
      }
      return;
    }

    const char = value.slice(-1).toUpperCase();
    if (!char) return;

    const updatedCells: CellsState = { ...cells, [name]: char };
    setCells(updatedCells);

    const isSolved = chekWord(currentQuestion, updatedCells);
    if (isSolved) return;

    let nextIndex = i;

    while (nextIndex < endPos) {
      nextIndex += step;
      const nextId = `${Math.floor(nextIndex / 10)}-${nextIndex % 10}`;

      if (!solvedCells.includes(nextId)) {
        setActivedCell(nextIndex);
        break;
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === 'Backspace') {
      const startPos = questions[currentQuestion].startPosition
      const name = (e.target as HTMLInputElement).name
      if (i > startPos) {
        if (!solvedCells.includes(name)) {
          setCells(prev => ({ ...prev, [name]: "" }));
        }

        let prevIndex = i;
        const step = direction === "horizontal" ? 1 : 10;

        while (prevIndex > startPos) {
          prevIndex -= step;
          const prevId = `${Math.floor(prevIndex / 10)}-${prevIndex % 10}`;

          if (!solvedCells.includes(prevId)) {
            setActivedCell(prevIndex);
            break;
          }
          if (prevIndex <= startPos) {
            setActivedCell(startPos);
            break;
          }
        }
      }
    }
  }

  const setCellsDisplay = (id: string): React.CSSProperties => {
    if (currentCells.includes(id) && !solvedCells.includes(id)) {
      return { background: "grey", color: "white", boxShadow: "0 0 1rem rgba(172, 172, 172, 0.75)" }
    }
    if (solvedCells.includes(id)) {
      return { background: "green", color: "white" }
    } else {
      return { background: "none", color: "white" };
    }
  }

  return isSolved ? (
    <>
      <div>Всё</div>
      <button
        onClick={() => {
          setIsSolved(!isSolved);
        }}
      >
        Начать сначала
      </button>
    </>
  ) : (
    <>
      <div className="grid-inputs-container">
        {Array.from({ length: 100 }).map((_, i) => {
          const row = Math.floor(i / 10);
          const col = i % 10;
          const id = `${row}-${col}`;
          const isBlocked = !(i === activedCell && currentCells.includes(id))

          return (
            <input
              key={id}
              name={id}
              value={cells[id] || ''}
              disabled={isBlocked}
              ref={el => { inputRefs.current[i] = el }}
              className="input-cell"
              style={setCellsDisplay(id)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          )
        })}
      </div>
    </>
  )
}