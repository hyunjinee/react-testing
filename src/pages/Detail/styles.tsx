import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: 'fff';
  padding: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  align-items: center;
  flex-direction: column;
`;

export const Todo = styled.div`
  min-width: 350px;
  height: 350px;
  overflow-y: auto;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
  padding: 10px;
`;
