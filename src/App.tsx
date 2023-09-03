import { useEffect, useRef, useState } from "react";
import OperandButton from "./components/OperandButton";
import OperatorButton from "./components/OperatorButton";
import SpecialButton from "./components/SpecialButton";
import CustomTranslationAnimationInLineCSS from "./components/CustomTranslationAnimationInLineCSS";

function App() {
  const [firstOperand, setFirstOperand] = useState(0);
  const [secondOperand, setSecondOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [isDecimal, isSetDecimal] = useState<number | null>(null);
  const [reAnimation, setreAnimation] = useState(0);
  const displayValue = useRef(0);

  useEffect(() => {
    document.title = "iOS Calculator";
  }, []);

  function operandHandle(num: number) {
    if (operator === null) {
      if (isDecimal !== null) {
        const temp = firstOperand + num * 0.1 ** isDecimal;
        setFirstOperand(temp);
        isSetDecimal((prev) => prev! + 1);
        displayValue.current = temp;
        return;
      }
      const temp = firstOperand * 10 + num;
      setFirstOperand(temp);
      displayValue.current = temp;
      return;
    }
    if (secondOperand === null) {
      if (isDecimal !== null) {
        const temp = num * 0.1 ** isDecimal;
        setSecondOperand(temp);
        isSetDecimal((prev) => prev! + 1);
        displayValue.current = temp;
        return;
      }
      setSecondOperand(num);
      displayValue.current = num;
      return;
    }
    if (secondOperand !== null) {
      if (isDecimal !== null) {
        const temp = secondOperand + num * 0.1 ** isDecimal;
        setSecondOperand(temp);
        isSetDecimal((prev) => prev! + 1);
        displayValue.current = temp;
        return;
      }
      const temp = secondOperand * 10 + num;
      setSecondOperand(temp);
      displayValue.current = temp;
      return;
    }
  }

  function operatorHandle(ops: string) {
    if (firstOperand !== null && secondOperand === null && ops !== "=") {
      setOperator(ops);
      isSetDecimal(null);
      return;
    }
    if (secondOperand !== null) {
      let calculation: number;
      switch (operator) {
        case "+":
          calculation = firstOperand! + secondOperand;
          break;
        case "-":
          calculation = firstOperand! - secondOperand;
          break;
        case "x":
          calculation = firstOperand! * secondOperand;
          break;
        case "÷":
          calculation = firstOperand! / secondOperand;
          break;
      }
      setFirstOperand(calculation!);
      setSecondOperand(null);
      if (ops !== "=") {
        setOperator(ops);
      }
      isSetDecimal(null);
      displayValue.current = calculation!;
    }
  }

  function specialHandle(ops: string) {
    switch (ops) {
      case "AC":
        setFirstOperand(0);
        setSecondOperand(null);
        setOperator(null);
        isSetDecimal(null);
        displayValue.current = 0;
        handleReload();
        break;
      case "C":
        setSecondOperand(null);
        isSetDecimal(null);
        displayValue.current = 0;
        break;
      case "%":
        if (secondOperand !== null) {
          const temp = secondOperand * 0.01;
          setSecondOperand(temp);
          displayValue.current = temp;
          break;
        }
        if (firstOperand !== null) {
          const temp = firstOperand * 0.01;
          setFirstOperand(temp);
          displayValue.current = temp;
          break;
        }
        break;
      case "+/-":
        if (secondOperand !== null) {
          const temp = secondOperand * -1;
          setSecondOperand(temp);
          displayValue.current = temp;
          break;
        }
        if (firstOperand !== null) {
          const temp = firstOperand * -1;
          setFirstOperand(temp);
          displayValue.current = temp;
          break;
        }
        break;
      case ".":
        isSetDecimal(1);
        break;
    }
  }

  function handleReload() {
    setreAnimation(reAnimation + 1);
  }

  return (
    <div className="calculator">
      <div className="displayValue" key={reAnimation}>
        <CustomTranslationAnimationInLineCSS>
          <label style={{ padding: "5px 10px" }}>
            {displayValue.current > 10 ** 7
              ? displayValue.current.toExponential(1)
              : !Number.isInteger(displayValue.current)
              ? displayValue.current.toFixed(3)
              : displayValue.current}
          </label>
        </CustomTranslationAnimationInLineCSS>
      </div>
      <div className="keyboard">
        <SpecialButton
          operator={secondOperand === null ? "AC" : "C"}
          handler={specialHandle}
        />
        <SpecialButton operator="+/-" handler={specialHandle} />
        <SpecialButton operator="%" handler={specialHandle} />
        <OperatorButton operator="÷" handler={operatorHandle} />

        <OperandButton num={7} handler={operandHandle} />
        <OperandButton num={8} handler={operandHandle} />
        <OperandButton num={9} handler={operandHandle} />
        <OperatorButton operator="x" handler={operatorHandle} />

        <OperandButton num={4} handler={operandHandle} />
        <OperandButton num={5} handler={operandHandle} />
        <OperandButton num={6} handler={operandHandle} />
        <OperatorButton operator="-" handler={operatorHandle} />

        <OperandButton num={1} handler={operandHandle} />
        <OperandButton num={2} handler={operandHandle} />
        <OperandButton num={3} handler={operandHandle} />
        <OperatorButton operator="+" handler={operatorHandle} />

        <OperandButton
          num={0}
          handler={operandHandle}
          customStyles="zeroButton"
        />
        <SpecialButton operator="." handler={specialHandle} />
        <OperatorButton operator="=" handler={operatorHandle} />
      </div>
    </div>
  );
}

export default App;
