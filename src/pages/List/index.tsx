import TodoList from 'components/TodoList';
import { AddButton, Container } from './styles';

const List: React.FC = () => {
  return (
    <Container>
      <TodoList />
      <AddButton to="/add">+</AddButton>
    </Container>
  );
};

export default List;
