import { Router, Route, Routes, useLocation } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { TodoListProvider } from 'contexts/TodoListContext';
import Detail from '.';
import List from 'pages/List';

describe('<Detail/>', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory();
    history.push('/detail/0');

    localStorage.setItem('todoList', '["할 일 1", "할 일 2"]');

    render(
      <TodoListProvider>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </Router>
      </TodoListProvider>,
    );
    // console.log(history.location.pathname);
    const todoItem = screen.getByText('할 일 1');
    expect(todoItem).toBeInTheDocument();
  });

  it('deletes Todo data', () => {
    const history = createMemoryHistory();
    history.push('/');
    history.push('/detail/0');

    localStorage.setItem('todoList', '["할 일 1", "할 일 2"]');

    const TestComponent = () => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };

    render(
      <TodoListProvider>
        <Router location={history.location} navigator={history}>
          <TestComponent />
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </Router>
      </TodoListProvider>,
    );

    const url = screen.getByText('/detail/0');
    expect(url).toBeInTheDocument();

    const todoItem = screen.getByText('할 일 1');
    expect(todoItem).toBeInTheDocument();

    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText('할 일 1')).not.toBeInTheDocument();
    expect(localStorage.getItem('todoList')).toBe('["할 일 2"]');
    // expect(screen.getByText('+')).toBeInTheDocument();
  });
});
