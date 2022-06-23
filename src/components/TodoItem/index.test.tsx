import 'jest-styled-components';
import { fireEvent, render, screen } from '@testing-library/react';

import TodoItem from '.';
import { MemoryRouter, useLocation } from 'react-router-dom';
import TodoList from 'components/TodoList';

describe('<TodoItem/>', () => {
  it('renders component correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <TodoItem id={1} label="default value" />
      </MemoryRouter>,
    );

    const todoItem = screen.getByText('default value');

    expect(todoItem).toBeInTheDocument();
    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('clicks the delete button', () => {
    const handleClick = jest.fn();

    render(
      // TodoItem에서는 react-router의 기능을 사용한다. 따라서 MemoryRouter로 감싸주어야함.
      <MemoryRouter>
        <TodoItem id={1} label="default value" onDelete={handleClick} />
      </MemoryRouter>,
    );

    const deleteButton = screen.getByText('삭제');
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(deleteButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('clicks the link', () => {
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return (
        <div>
          <div>{pathname}</div>
          <TodoItem id={1} label="default value" />
        </div>
      );
    };

    render(
      <MemoryRouter>
        <TestComponent />
      </MemoryRouter>,
    );

    const pathname = screen.getByText('/');
    expect(pathname.textContent).toBe('/');
    expect(pathname).toBeInTheDocument();
    const todoItem = screen.getByText('default value');
    fireEvent.click(todoItem);
    expect(pathname.textContent).toBe('/detail/1');
  });

  // it('shows todo list', () => {
  //   const list = [
  //     { id: 1, label: 'default value' },
  //     { id: 2, label: 'default value' },
  //     { id: 3, label: 'default value' },
  //   ];

  //   const { container } = render(
  //     <MemoryRouter>
  //       <TodoList />
  //     </MemoryRouter>,
  //   );

  //   const todoItem = screen.getByText('default value');
  //   expect(todoItem).toBeInTheDocument();
  //   const deleteButton = screen.getByText('삭제');
  // });
});
