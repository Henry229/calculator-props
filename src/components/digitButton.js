import React from 'react'

const DigitButton = ({digit, onClickDigit}) => {
  return (
    <button onClick={() => onClickDigit(digit)}>
      {digit}
    </button>
  )
}

export default DigitButton
