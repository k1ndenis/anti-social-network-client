import type { Question  } from "./types/question";

interface ToggleQuestionProps {
  questions: Question[];
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  val: number;
  row: string;
  solvedCells: string[];
}

export const ToggleQuestion = ({
  questions,
  currentQuestion,
  setCurrentQuestion,
  val,
  row,
  solvedCells
}: ToggleQuestionProps) => {
  const length = questions.length

  const toggleQuestion = () => {
    let nextIndex = (currentQuestion + val + length) % length;
    let attempts = 0;
    const chekSolved = (idx: number) => {
      return questions[idx].coordinates.every(coord => solvedCells.includes(coord))
    }
    while (chekSolved(nextIndex) && attempts < length) {
      nextIndex = (nextIndex + val + length) % length;
      attempts++;
    }
    setCurrentQuestion(nextIndex);
  }

  return (
    <button onClick={toggleQuestion}>
      {row}
    </button>
  )
}