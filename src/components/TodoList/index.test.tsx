import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { TodoListProvider } from 'contexts/TodoListContext';
import TodoList from '.';

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
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>,
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
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>,
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
});
