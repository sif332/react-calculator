interface IProp {
  operator: string;
  customStyles?: string;
  handler(operator: string): void;
}

export default function SpecialButton({
  operator,
  handler,
  customStyles,
}: IProp) {
  return (
    <button
      className={`specialButton ${customStyles}`}
      style={
        operator === "."
          ? { backgroundColor: "#505050", color: "white" }
          : undefined
      }
      onClick={() => handler(operator)}
    >
      {operator}
    </button>
  );
}
