import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e40ff;
`;
export const GoBack = styled(Link)`
  padding: 20px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  position: absolute;
  left: 20px;
`;
export const Title = styled.div`
  padding: 20px;
  color: #ffffff;
  font-weight: 600;
  font-size: 20px;
`;
