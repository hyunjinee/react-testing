import { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import TodoItem from 'components/TodoItem';
import InputContainer from 'components/InputContainer';
import TodoList from 'components/TodoList';
import { TodoListProvider } from 'contexts/TodoListContext';
import List from 'pages/List';
import Add from 'pages/Add';

function App() {
  return (
    <BrowserRouter>
      <TodoListProvider>
        <Container>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/add" element={<Add />} />
          </Routes>
          {/* <Contents>
            <TodoList />
            <InputContainer />
          </Contents> */}
        </Container>
      </TodoListProvider>
    </BrowserRouter>
  );
}

const Container = styled.div`
  min-height: 100vh;
  /* background: red; */

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

const TodoListContainer = styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`;

export default App;
