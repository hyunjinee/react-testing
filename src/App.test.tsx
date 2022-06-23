import 'jest-styled-components';
import { fireEvent, render, screen } from '@testing-library/react';
import App from 'App';
import InputContainer from 'components/InputContainer';

beforeEach(() => {
  localStorage.clear();
});

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
    render(<InputContainer />);

    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const todoList = localStorage.getItem('todoList');
    expect(todoList).toBeNull();

    // expect(screen.getByText('할 일 목록')).toBeInTheDocument();

    // history.push('/add');
    // history.replace('/add');

    // expect(screen.getByText('추가')).toBeInTheDocument();

    // render(

    //   // <Router location={history.location} navigator={history}>
    //   //   <InputContainer />
    //   // </Router>,
    // );

    // const label = screen.getByText('할 일 목록');
    // expect(label).toBeInTheDocument();
    // history.push('/add');
    // const addLabel = screen.getByText('할 일 추가');
    // expect(addLabel).toBeInTheDocument();
    // const todoList = screen.getByTestId('todoList');
    // let todoList = JSON.parse(
    //   localStorage.getItem('todoList') as string,
    // ) as string[];
    // console.log(typeof todoList);
    // const length = todoList.length;
    // const button = screen.getByText('추가');

    // fireEvent.click(button);

    // todoList = JSON.parse(localStorage.getItem('todoList') as string);
    // expect(todoList.length).toBe(length);
  });

  it('loads localStorage data', () => {
    localStorage.setItem(
      'todoList',
      JSON.stringify(['아이폰 사기', '갤럭시 사기']),
    );
    render(<App />);

    expect(screen.getByText('아이폰 사기')).toBeInTheDocument();
    expect(screen.getByText('갤럭시 사기')).toBeInTheDocument();
    expect(screen.getAllByText('삭제')).toHaveLength(2);
  });
});
