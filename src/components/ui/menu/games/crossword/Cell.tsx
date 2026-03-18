interface CellProps {
  id: number;
  answer: string
}

export const Cell = ({ id, answer }: CellProps) => {

  const letters = answer.split("");

  return (
    <div>
      {letters.map((_, index) => (
        <div 
          key={`${id}-${index}`} 
        >
        </div>
      ))}
    </div>
  );
};
