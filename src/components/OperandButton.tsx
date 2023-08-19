interface IProp {
  num: number;
  customStyles?: string;
  handler(num: number): void;
}

export default function OperandButton({ num, handler, customStyles }: IProp) {
  return (
    <button
      className={`operandButton ${customStyles}`}
      onClick={() => handler(num)}
    >
      {num}
    </button>
  );
}
