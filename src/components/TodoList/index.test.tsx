import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { TodoListProvider } from 'contexts/TodoListContext';
import TodoList from '.';
import { MemoryRouter, useLocation } from 'react-router-dom';

describe('<TodoList/>', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>,
    );
    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(todoList.firstChild).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('shows todo list', () => {
    localStorage.setItem(
      'todoList',
      JSON.stringify(['아이폰 사기', '갤럭시 사기']),
    );

    render(
      <MemoryRouter>
        <TodoListProvider>
          <TodoList />
        </TodoListProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('아이폰 사기')).toBeInTheDocument();
    expect(screen.getByText('갤럭시 사기')).toBeInTheDocument();
    expect(screen.getAllByText('삭제')).toHaveLength(2);
  });

  it('deletes todo item', () => {
    localStorage.setItem(
      'todoList',
      JSON.stringify(['아이폰 사기', '갤럭시 사기']),
    );

    render(
      <MemoryRouter>
        <TodoListProvider>
          <TodoList />
        </TodoListProvider>
      </MemoryRouter>,
    );

    const todoItem = screen.getByText('아이폰 사기');
    expect(todoItem).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(todoItem.nextElementSibling as HTMLElement);
    expect(todoItem).not.toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem('todoList') as string),
    ).not.toContain('아이폰 사기');
  });

  it('moves to detail page', () => {
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };

    localStorage.setItem('todoList', '["아이폰 사기", "갤럭시 사기"]');

    render(
      <MemoryRouter>
        <TestComponent />
        <TodoListProvider>
          <TodoList />
        </TodoListProvider>
      </MemoryRouter>,
    );

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const todoItem = screen.getByText('아이폰 사기');
    expect(todoItem).toBeInTheDocument();

    expect(todoItem.getAttribute('href')).toBe('/detail/0');
    fireEvent.click(todoItem);
    expect(url.textContent).toBe('/detail/0');
  });
});
