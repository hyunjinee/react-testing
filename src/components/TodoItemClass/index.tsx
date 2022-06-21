import Button from 'components/common/Button';
import { Component } from 'react';
import { Container, Label } from './styles';

interface Props {
  readonly label: string;
  readonly onDelete?: () => void;
}

class TodoItem extends Component<Props> {
  render() {
    const { label, onDelete } = this.props;
    return (
      <Container>
        <Label>{label}</Label>
        <Button
          label="삭제"
          backgroundColor="#FF1744"
          hoverColor="#F01440"
          onClick={onDelete}
        />
      </Container>
    );
  }
}

export default TodoItem;
