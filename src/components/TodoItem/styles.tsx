import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #bdbdbd;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

export const Label = styled(Link)`
  flex: 1;
  font-size: 16px;
  margin-right: 20px;
  text-decoration: none;
`;
