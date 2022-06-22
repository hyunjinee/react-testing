import { useContext, useState } from 'react';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import { TodoListContext } from 'contexts/TodoListContext';
import { Container } from './styles';

interface Props {
  readonly onAdd?: () => void;
}

const InputContainer: React.FC<Props> = ({ onAdd }) => {
  const [todo, setTodo] = useState('');
  const { addTodo } = useContext(TodoListContext);

  return (
    <Container>
      <Input
        placeholder="할 일을 입력해 주세요."
        value={todo}
        onChange={setTodo}
      />
      <Button
        label="추가"
        onClick={() => {
          addTodo(todo);
          setTodo('');
          if (todo && typeof onAdd === 'function') {
            onAdd();
          }
        }}
      />
    </Container>
  );
};

export default InputContainer;
