export type Question = {
  id: number;
  question: string;
  answer: string;
  direction: "horizontal" | "vertical";
  coordinates: string[];
  position: { [key: string]: string | undefined };
  startPosition: number;
  endPosition: number
}