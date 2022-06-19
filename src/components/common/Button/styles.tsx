import styled from 'styled-components';

interface ContainerProps {
  readonly backgroundColor: string;
  readonly hoverColor: string;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${(props) => props.backgroundColor};
  padding: 10px 20px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const Label = styled.div`
  color: #ffffff;
  font-size: 16px;
`;
