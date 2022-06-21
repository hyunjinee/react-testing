import { hover } from '@testing-library/user-event/dist/hover';
import { Component } from 'react';
import { Container, Label } from './style';

interface Props {
  readonly label: string;
  readonly backgroundColor?: string;
  readonly hoverColor?: string;
  readonly onClick?: () => void;
}

class ButtonClass extends Component<Props> {
  render() {
    const {
      label,
      backgroundColor = '#304FFE',
      hoverColor = '#1E40FF',
      onClick,
    } = this.props;

    return (
      <Container
        backgroundColor={backgroundColor}
        hoverColor={hoverColor}
        onClick={onClick}
      >
        <Label>{label}</Label>
      </Container>
    );
  }
}

export default ButtonClass;
