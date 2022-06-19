import styled from 'styled-components';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import TodoItem from 'components/TodoItem';

function App() {
  return (
    <Container>
      <Contents>
        <TodoItem label="추가된 할 일" />
        <InputContainer>
          <Input placeholder="할 일을 입력해주세요." />
          <Button label="추가" />
        </InputContainer>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  /* background: red; */

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

const InputContainer = styled.div`
  display: flex;
`;

export default App;
