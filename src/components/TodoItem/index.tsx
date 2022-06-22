import React from 'react';
import Button from 'components/common/Button';

import { Container, Label } from './styles';

interface Props {
  readonly id: number;
  readonly label: string;
  readonly onDelete?: () => void;
}

const TodoItem: React.FC<Props> = ({ label, onDelete, id }) => {
  return (
    <Container>
      <Label to={`/detail/${id}`}>{label}</Label>
      <Button
        onClick={onDelete}
        label="삭제"
        backgroundColor="#ff1744"
        hoverColor="#f01440"
      />
    </Container>
  );
};

export default TodoItem;
