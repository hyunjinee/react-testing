import { Container, Label } from './styles';

interface Props {
  readonly label: string;
  readonly backgroundColor?: string;
  readonly hoverColor?: string;
  readonly onClick?: () => void;
}

const Button: React.FC<Props> = ({
  label,
  backgroundColor = '#304FFE',
  hoverColor = '#1E40FF',
  onClick,
}) => {
  return (
    <Container
      onClick={onClick}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
    >
      <Label>{label}</Label>
    </Container>
  );
};

export default Button;
