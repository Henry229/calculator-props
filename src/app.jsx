import React, { useState } from 'react';
import './app.css';
import OperatorButton from './components/operatorButton';
import DigitButton from './components/digitButton';
import { computeHeadingLevel } from '@testing-library/react';

function App() {
  const [states, setStates] = useState({
    previousOperand: null,
    operator: null,
    currentOperand: null,
    overwrite: null,
  });

  const onClickDigit = (digit) => {
    if (states.overwrite) {
      return setStates({
        ...states,
        currentOperand: digit,
        overwrite: false,
      })
    };
    
    if (states.currentOperand === "0" && digit === "0") return states;
    if (states.currentOperand === "." && digit === ".") return states;
    setStates({...states, currentOperand:`${states.currentOperand ||''}${digit}`})
  };

  const onClickOperator = (operation) => {
    if (states.currentOperand == null && states.previousOperand == null) return states;
    if (states.currentOperand == null ) {
      setStates({
        ...states,
        operator: operation,
      })
      return states;
    }; 

    if (states.previousOperand == null) {
      setStates({
        ...states,
        previousOperand: states.currentOperand, 
        operator: operation,
        currentOperand: null,
      })
      return states;
    }

    return setStates({
      ...states,
      previousOperand: compute(states), 
      operator: operation,
      currentOperand:null,
    })
  };

  const onClickClear = () => {
    return setStates({});
  }

  const onClickDelete = () => {
    if (states.currentOperand == null) return states;
    if (states.currentOperand.length ===1 ) {
      setStates({
        ...states,
        currentOperand: null,
      });
      return states;
    };
    return setStates({
      ...states,
      currentOperand: states.currentOperand.slice(0,-1),
    });
  };

  const onClickEvaluate = () => {
    if ( states.currentOperand == null ||
         states.previousOperand == null ||
         states.operator == null 
      ) return states;

    return setStates({
      ...states,
      previousOperand: null,
      currentOperand: compute(states),
      operator: null,
    })
  };


  const compute = state => {
    const prev = parseInt(state.previousOperand);
    const current = parseInt(state.currentOperand);
    let computation = "";
    switch(state.operator) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
    };
    return computation.toString();
  };



  return (
    <div className="container">
      <div className="header">
        <div className="previous-operand">{states.previousOperand}{states.operator}</div>
        <div className="current-operand">{states.currentOperand}</div>
      </div>
      <button className="span-two" onClick={onClickClear}>AC</button>
      <button onClick={onClickDelete}>DEL</button>
      <OperatorButton operator="÷" onClickOperator={onClickOperator}/>
      <DigitButton digit="1" onClickDigit={onClickDigit}/>
      <DigitButton digit="2" onClickDigit={onClickDigit}/>
      <DigitButton digit="3" onClickDigit={onClickDigit}/>
      <OperatorButton operator="*" onClickOperator={onClickOperator}/>
      <DigitButton digit="4" onClickDigit={onClickDigit}/>
      <DigitButton digit="5" onClickDigit={onClickDigit}/>
      <DigitButton digit="6" onClickDigit={onClickDigit}/>
      <OperatorButton operator="+" onClickOperator={onClickOperator}/>
      <DigitButton digit="7" onClickDigit={onClickDigit}/>
      <DigitButton digit="8" onClickDigit={onClickDigit}/>
      <DigitButton digit="9" onClickDigit={onClickDigit}/>
      <OperatorButton operator="-" onClickOperator={onClickOperator}/>
      <DigitButton digit="." onClickDigit={onClickDigit}/>
      <DigitButton digit="0" onClickDigit={onClickDigit}/>
      <button className="span-two" onClick={onClickEvaluate}>=</button>
    </div>
  );
}

export default App;
