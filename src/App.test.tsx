import 'jest-styled-components';
import { fireEvent, render, screen } from '@testing-library/react';
import App from 'App';

describe('<App/>', () => {
  it('renders component correctly', () => {
    const { container } = render(<App />);

    const todoList = screen.getByTestId('todoList');
    expect(todoList).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    expect(todoList.firstChild).toBeNull();

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요.');
    expect(input).toBeInTheDocument();
    const label = screen.getByText('추가');
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('adds and deletes todo items', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요.');
    const button = screen.getByText('추가');
    fireEvent.change(input, { target: { value: '아이폰 사기' } });
    fireEvent.click(button);

    const todoItem = screen.getByText('아이폰 사기');
    expect(todoItem).toBeInTheDocument();
    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();

    const todoList = screen.getByTestId('todoList');
    expect(todoList.childElementCount).toBe(1);

    fireEvent.change(input, { target: { value: '갤럭시 사기' } });
    fireEvent.click(button);

    const todoItem2 = screen.getByText('갤럭시 사기');
    expect(todoItem2).toBeInTheDocument();
    expect(todoList.childElementCount).toBe(2);
    const deleteButtons = screen.getAllByText('삭제');
    fireEvent.click(deleteButtons[0]);

    expect(todoItem).not.toBeInTheDocument();
    expect(todoList.childElementCount).toBe(1);
  });

  it('does not add empty Todo', () => {
    render(<App />);

    const todoList = screen.getByTestId('todoList');
    const length = todoList.childElementCount;

    const button = screen.getByText('추가');
    fireEvent.click(button);

    expect(todoList.childElementCount).toBe(length);
  });
});
