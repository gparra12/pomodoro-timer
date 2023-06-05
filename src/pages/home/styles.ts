import { styled } from "styled-components";

interface ButtonProps {
  started?: boolean;
}

export const Container = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const CountdownButton = styled.button<ButtonProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 1rem 2.5rem;
  border: 0;
  gap: 8px;
  background-color: ${(props) =>
    props.started ? props.theme["red-500"] : props.theme["green-500"]};

  color: ${(props) => props.theme["gray-100"]};
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.875rem;

  cursor: pointer;

  &:not(:disabled):hover {
    background-color: ${(props) =>
      props.started ? props.theme["red-700"] : props.theme["green-700"]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
