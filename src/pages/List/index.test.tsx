import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { TodoListProvider } from 'contexts/TodoListContext';
import Detail from 'pages/Detail';
import List from '.';
import Add from 'pages/Add';

describe('<List/>', () => {
  it('renders component correctly', () => {
    localStorage.setItem('todoList', '["할 일 1", "할 일 2"]');

    const { container } = render(
      <TodoListProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </TodoListProvider>,
    );

    const todoItem = screen.getByText('할 일 1');
    expect(todoItem).toBeInTheDocument();
    expect(todoItem.getAttribute('href')).toBe('/detail/0');

    const todoItem2 = screen.getByText('할 일 2');
    expect(todoItem2).toBeInTheDocument();
    expect(todoItem2.getAttribute('href')).toBe('/detail/1');

    expect(screen.getAllByText('삭제')).toHaveLength(2);

    const addButton = screen.getByText('+');
    expect(addButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('deletes todo item', () => {
    localStorage.setItem('todoList', '["할 일 1", "할 일 2"]');

    render(
      <TodoListProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </TodoListProvider>,
    );

    const todoItem = screen.getByText('할 일 1');
    expect(todoItem).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(todoItem.nextElementSibling as HTMLElement);
    expect(todoItem).not.toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem('todoList') as string),
    ).toStrictEqual(['할 일 2']);
  });

  it('moves to Detail page', () => {
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };

    localStorage.setItem('todoList', '["할 일 1", "할 일 2"]');

    render(
      <TodoListProvider>
        <MemoryRouter>
          <TestComponent />
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </TodoListProvider>,
    );

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const todoItem = screen.getByText('할 일 1');
    expect(todoItem.getAttribute('href')).toBe('/detail/0');
    fireEvent.click(todoItem);

    expect(url.textContent).toBe('/detail/0');
  });

  it('moves to add page', () => {
    const TestComponent = (): JSX.Element => {
      const { pathname } = useLocation();
      return <div>{pathname}</div>;
    };

    render(
      <MemoryRouter>
        <TestComponent />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </MemoryRouter>,
    );

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    expect(url.textContent).toBe('/add');
  });
});
