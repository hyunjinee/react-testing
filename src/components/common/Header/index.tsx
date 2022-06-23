import { useLocation } from 'react-router-dom';
import { Container, GoBack, Title } from './styles';

const Header: React.FC = () => {
  const { pathname } = useLocation();

  let title = '에러';

  if (pathname === '/') {
    // console.log(pathname);
    title = '할 일 목록';
  } else if (pathname === '/add') {
    title = '할 일 추가';
  } else if (pathname.startsWith('/detail')) {
    title = '할 일 상세';
  }

  return (
    <Container>
      <Title>{title}</Title>
      {pathname !== '/' && <GoBack to="/">돌아가기</GoBack>}
    </Container>
  );
};

export default Header;
