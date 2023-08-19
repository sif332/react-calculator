interface IProp {
  operator: string;
  customStyles?: string;
  handler(operator: string): void;
}

export default function OperatorButton({
  operator,
  handler,
  customStyles,
}: IProp) {
  return (
    <button
      className={`operatorButton ${customStyles}`}
      onClick={() => handler(operator)}
    >
      {operator}
    </button>
  );
}
