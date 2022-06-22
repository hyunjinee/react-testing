import { fireEvent, render, screen } from '@testing-library/react';
import { TodoListProvider } from 'contexts/TodoListContext';
import InputContainer from '.';

describe('<InputContainer/>', () => {
  it('renders component correctly', () => {
    const { container } = render(<InputContainer />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요.');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('empties data after adding data', () => {
    render(<InputContainer />);

    const input = screen.getByPlaceholderText(
      '할 일을 입력해 주세요.',
    ) as HTMLInputElement;
    const button = screen.getByText('추가');

    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: '아이폰 사기' } });
    expect(input.value).toBe('아이폰 사기');
    fireEvent.click(button);
    expect(input.value).toBe('');
  });

  it('adds input data to localStorage via context', () => {
    render(
      <TodoListProvider>
        <InputContainer />
      </TodoListProvider>,
    );

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요.');
    const button = screen.getByText('추가');

    expect(localStorage.getItem('todoList')).toBeNull();

    fireEvent.change(input, { target: { value: '아이폰 사기' } });
    fireEvent.click(button);

    expect(localStorage.getItem('todoList')).toBe(
      JSON.stringify(['아이폰 사기']),
    );
  });
});
