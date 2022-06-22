import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';

import { TodoListContext, TodoListProvider } from './TodoListContext';

beforeEach(() => {
  localStorage.clear();
});

describe('TodoList Context', () => {
  it('renders component correctly', () => {
    const ChildComponent = () => {
      return <div>Child Component</div>;
    };

    render(
      <TodoListProvider>
        <ChildComponent></ChildComponent>
      </TodoListProvider>,
    );

    const childComponent = screen.getByText('Child Component');
    expect(childComponent).toBeInTheDocument();
    expect(localStorage.getItem('todoList')).toBeNull();
  });

  it('loads localStorage data and sets it to State', () => {
    localStorage.setItem(
      'todoList',
      JSON.stringify(['아이폰 사기', '갤럭시 사기']),
    );

    const ChildComponent = () => {
      const { todoList } = useContext(TodoListContext);

      return (
        <div>
          {todoList.map((todo, index) => (
            <div key={todo + index}>{todo}</div>
          ))}
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>,
    );

    expect(screen.getByText('아이폰 사기')).toBeInTheDocument();
    expect(screen.getByText('갤럭시 사기')).toBeInTheDocument();
  });

  it('uses addTodo function', () => {
    const ChildComponent = () => {
      const { todoList, addTodo } = useContext(TodoListContext);
      return (
        <div>
          <div onClick={() => addTodo('study')}>Add Todo</div>
          <div>
            {todoList.map((todo, index) => (
              <div key={todo + index}>{todo}</div>
            ))}
          </div>
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>,
    );

    expect(localStorage.getItem('todoList')).toBeNull();
    const button = screen.getByText('Add Todo');
    fireEvent.click(button);
    expect(screen.getByText('study')).toBeInTheDocument();
    expect(localStorage.getItem('todoList')).toBe(JSON.stringify(['study']));
  });

  it('uses deleteTodo function', () => {
    localStorage.setItem('todoList', JSON.stringify(['study', 'sleep']));

    const ChildComponent = () => {
      const { todoList, deleteTodo } = useContext(TodoListContext);

      return (
        <div>
          {todoList.map((todo, index) => (
            <div key={todo + index} onClick={() => deleteTodo(index)}>
              {todo}
            </div>
          ))}
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>,
    );

    const todoItem = screen.getByText('study');
    expect(todoItem).toBeInTheDocument();
    fireEvent.click(todoItem);
    expect(todoItem).not.toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem('todoList') as string),
    ).not.toContain('study');
  });
});
