import { useContext } from 'react';

import TodoItem from 'components/TodoItemClass';
import { TodoListContext } from 'contexts/TodoListContext';
import { Container } from './styles';

const TodoList: React.FC = () => {
  const { todoList, deleteTodo } = useContext(TodoListContext);

  return (
    <Container data-testid="todoList">
      {todoList.map((item, index) => (
        <TodoItem
          key={item + index}
          label={item}
          onDelete={() => deleteTodo(index)}
        />
      ))}
    </Container>
  );
};

export default TodoList;
