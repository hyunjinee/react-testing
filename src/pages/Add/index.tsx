import InputContainer from 'components/InputContainer';
import { useNavigate } from 'react-router-dom';
import { Container } from './styles';

const Add: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <InputContainer onAdd={() => navigate('/', { replace: true })} />
    </Container>
  );
};

export default Add;
