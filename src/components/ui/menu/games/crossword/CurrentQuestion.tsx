import { ToggleQuestion } from "./ToggleQuestion"
import type { Question } from './../../../../types/question'
import './CurrentQuestion.css'

interface CurrentQuestionProps {
  questions: Question[];
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  solvedCells: string[]
}

export const CurrentQuestion = ({ 
  questions,
  currentQuestion,
  setCurrentQuestion,
  solvedCells 
}: CurrentQuestionProps) => {
  
  return (
    <div className="current-question-container">
      <ToggleQuestion 
        questions={questions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        solvedCells={solvedCells}
        val={-1}
        row={"←"}
      />
      <span className="current-question">
        {questions[currentQuestion].question}
      </span>
      <ToggleQuestion 
        questions={questions}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        solvedCells={solvedCells}
        val={1}
        row={"→"}
      />
    </div>
  )
}