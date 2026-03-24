import { useState } from "react"
import dataQuestions from "../../../../../data/questions.json"
import { GridInputs } from "./GridInputs";
import { CurrentQuestion } from "./CurrentQuestion";
import type { Question } from "../../../../../types/question";
import './Crossword.css'

const questions: Question[] = dataQuestions as Question[];

export const Crossword = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [activedCell, setActivedCell] = useState<number>(0);
  const [currentCells, setCurrentCells] = useState<Question['coordinates']>(questions[0].coordinates);
  const [solvedCells, setSolvedCells] = useState<string[]>([]);
  const [direction, setDirection] = useState<Question['direction']>("horizontal");

  return (
    <div className="crossword-container">
      <CurrentQuestion
        questions={questions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        solvedCells={solvedCells}
      />
      <GridInputs
        questions={questions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        activedCell={activedCell}
        setActivedCell={setActivedCell}
        currentCells={currentCells}
        setCurrentCells={setCurrentCells}
        solvedCells={solvedCells}
        setSolvedCells={setSolvedCells}
        direction={direction}
        setDirection={setDirection}
      />
    </div>
  )
}