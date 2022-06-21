import { createContext, useEffect, useState } from 'react';

interface Context {
  readonly todoList: string[];
  readonly addTodo: (todo: string) => void;
  readonly deleteTodo: (index: number) => void;
}

export const TodoListContext = createContext<Context>({
  todoList: [],
  addTodo: () => {},
  deleteTodo: () => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const TodoListProvider: React.FC<Props> = ({ children }) => {
  const [todoList, setTodoList] = useState<string[]>([]);

  useEffect(() => {
    const list = localStorage.getItem('todoList');
    if (list) {
      setTodoList(JSON.parse(list));
    }
  }, []);

  const addTodo = (todo: string) => {
    if (todo) {
      const newList = [...todoList, todo];
      localStorage.setItem('todoList', JSON.stringify(newList));
      setTodoList(newList);
    }
  };

  const deleteTodo = (index: number) => {
    let list = [...todoList];
    list.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(list));
    setTodoList(list);
  };

  return (
    <TodoListContext.Provider
      value={{
        todoList,
        addTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};
