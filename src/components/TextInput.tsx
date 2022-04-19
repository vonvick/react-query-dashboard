import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input `
  border-bottom: 1px solid grey;
  padding: 6px 12px;
  border-radius: 4px;
  width: ${props => props.width || '200px'}
`;

type inputType = "text" | "number"

export interface InputTextInterface {
  value: any
  inputType: inputType
  handler?: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholderText: string
  ariaLabel: string
}

const InputText = ({ value, handler, inputType, placeholderText, ariaLabel }: InputTextInterface) => {
  return (
    <StyledInput
      aria-label={ariaLabel}
      value={ value }
      onChange={ handler }
      type={ inputType }
      placeholder={placeholderText}
    />
  )
}

export default InputText;
