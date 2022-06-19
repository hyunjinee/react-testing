import { useState } from 'react';
import styled from 'styled-components';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import TodoItem from 'components/TodoItem';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodo = () => {
    if (todo) {
      setTodoList([...todoList, todo]);
      setTodo('');
    }
  };

  const deleteTodo = (index: number) => {
    let list = [...todoList];
    list.splice(index, 1);
    setTodoList(list);
  };

  return (
    <Container>
      <Contents>
        <TodoListContainer>
          {todoList.map((item, index) => (
            <TodoItem
              key={item + index}
              label={item}
              onDelete={() => deleteTodo(index)}
            />
          ))}
        </TodoListContainer>
        <InputContainer>
          <Input
            placeholder="할 일을 입력해주세요."
            onChange={(text) => setTodo(text)}
            value={todo}
          />
          <Button label="추가" onClick={addTodo} />
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

const TodoListContainer = styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
`;

export default App;
