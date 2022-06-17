import React from 'react'

const OperatorButton = ({operator, onClickOperator}) => {
  return (
    <button onClick={() => onClickOperator(operator)}>
      {operator}
    </button>
  )
}

export default OperatorButton
