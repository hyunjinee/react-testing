import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, screen } from '@testing-library/react';
import Add from '.';
import App from 'App';

describe('<Add/>', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory();
    history.push('/add');

    const { container } = render(
      <Router location={history.location} navigator={history}>
        <Add />
      </Router>,
    );

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요.');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('add a new Todo and redirect to the root page', () => {
    const history = createMemoryHistory();
    history.push('/add');

    // const TestComponent = () => {
    //   const { pathname } = useLocation();
    //   return (
    //     <TodoListProvider>
    //       <div>{pathname}</div>
    //       <Add />
    //     </TodoListProvider>
    //   );
    // };

    render(
      <Router navigator={history} location={history.location}>
        <App />
      </Router>,
    );

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요.');
    const button = screen.getByText('추가');

    fireEvent.change(input, { target: { value: '새로운 할 일' } });
    fireEvent.click(button);

    expect(localStorage.getItem('todoList') as string).toBe('["새로운 할 일"]');
    expect(history.location.pathname).toBe('/');
    expect(localStorage.getItem('todoList') as string).toBe('["새로운 할 일"]');
  });
});
