import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input `
  border-bottom: 1px solid grey;
  padding: 6px 12px;
  border-radius: 4px;
  width: ${props => props.width || '200px'}
`;

interface InputTextInterface {
  value: any;
  inputType: 'text' | 'number';
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderText: string
}

const InputText = ({ value, handler, inputType, placeholderText }: InputTextInterface) => {
  return (
    <StyledInput
      value={ value }
      onChange={ handler }
      type={ inputType }
      placeholder={placeholderText}
    />
  )
}

export default InputText;
