import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Todo } from './styles';
import { TodoListContext } from 'contexts/TodoListContext';
import Button from 'components/common/Button';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { todoList, deleteTodo } = useContext(TodoListContext);
  const navigate = useNavigate();

  const todo = todoList[parseInt(id as string)];

  return (
    <Container>
      <Todo>{todo}</Todo>
      <Button
        label="삭제"
        backgroundColor="#ff1744"
        hoverColor="#f01440"
        onClick={() => {
          deleteTodo(parseInt(id as string));
          navigate(-1);
        }}
      />
    </Container>
  );
};

export default Detail;
