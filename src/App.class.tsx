import {
  Container,
  Contents,
  InputContainer,
  TodoListContainer,
} from 'App.style';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import TodoItem from 'components/TodoItemClass';
import { Component } from 'react';
import { IScriptSnapshot } from 'typescript';

interface Props {}
interface State {
  readonly todo: string;
  readonly todoList: string[];
  readonly error: boolean;
}

class AppClass extends Component<Props, State> {
  // 클래스 컴포넌트에서 State를 사용하지 않아 State의 초기값 설정이 필요하지 않다면
  // 생성자 함수도 생략이 가능하다.
  // 생성자 함수를 사용할 때에는 반드시 super(props) 함수를 호출하여 부모 클래스의
  // 생성자를 호출해야한다. 생성자 함수는 해당 컴포넌트가 생성될 때 한 번만 호출된다.
  constructor(props: Props) {
    super(props);

    this.state = {
      todo: '',
      todoList: [],
      error: false,
    };
  }

  private addTodo = (): void => {
    const { todo, todoList } = this.state;
    if (todo) {
      this.setState({
        todo: '',
        todoList: [...todoList, todo],
      });
    }
  };

  private deleteTodo = (index: number): void => {
    let list = [...this.state.todoList];
    list.splice(index, 1);
    this.setState({
      todoList: list,
    });
  };

  render() {
    const { todo, todoList, error } = this.state;

    return (
      <Container>
        {!error && (
          <Contents>
            <TodoListContainer data-testid="todoList">
              {todoList.map((item, index) => (
                <TodoItem
                  key={item + index}
                  label={item}
                  onDelete={() => this.deleteTodo(index)}
                />
              ))}
            </TodoListContainer>
            <InputContainer>
              <Input
                placeholder="할 일을 입력해 주세요."
                onChange={(text) => this.setState({ todo: text })}
                value={todo}
              />
              <Button label="추가" onClick={this.addTodo} />
            </InputContainer>
          </Contents>
        )}
      </Container>
    );
  }

  // getDerivedStateFromProps는 부모로부터 받은 Props와 State를 동기화할 때 사용된다
  // 부모로부터 받은 Props로 State에 값을 설정하거나 State값이 Props에 의존하여 결정될 때
  // 이 함수를 사용한다.
  // 이 함수에서는 State에 설정하고 싶은 값을 반환한다. 동기화할 State가 없다면 null을 반환.
  // 이 함수는 컴포넌트가 생성도리 때 한번 호출되며 Props와 State를 동기화해야 하므로
  // Props가 변경될 때마다 호출된다.
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    console.log('getDerivedStateFromProps');
    return null;
  }

  // 클래스 컴포넌트가 처음으로 화면에 표시된 이후에 이 함수가 호출.
  // render함수가 처음 한번 호출된후 componentDidMount 함수가 호출된다.
  // 이 함수는 컴포넌트가 화면에 처음 표시된 후 한번만 호출되므로 ajax를 통한 데이터 습득이나
  // 다른 자바스크립트 라이브러리와의 연동을 수행할 때 주로 사용된다.
  componentDidMount() {
    console.log('componentDidMount');
  }

  // Props 또는 State가 변경되어 화면을 다시 그리기 위해 render함수가 호출된 후
  // 실제로 화면이 갱신하기 바로 직전에 이 함수가 호출된다.
  // 이 함수가 반환하는 값은 componentDitUpdate의 세번째 매개변수(snapshot)으로 전달
  // 이 라이프 사이클 함수는 많이 활용되지는 않지만, 화면을 실제로 갱신하는 동안 수동으로 스크롤
  // 위치를 고정해야 하는 경우 등에 사용할 수 있다.
  // 이 함수를 선언한 후 반환값을 반환하지 않은 경우 또는 선언 후 componentDidUpdate를
  // 선언하지 않는 경우 warning이 발생함으로 주의해서 사용해야한다.
  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    console.log('getSnapshotBeforeUpdate');

    return {
      testData: true,
    };
  }

  // 컴포넌트가 처음 화면에 표시될 때는 실행되지 않지만, Props또는 State가 변경되어
  // 화면이 갱신될 때마다 render함수가 호출된 후 호출되는 함수이다.
  componentDidUpdate(
    prevProps: Props,
    prevState: State,
    snapshot: IScriptSnapshot,
  ) {
    console.log('componentDidUpdate');
  }

  // Props와 State값이 변경되었지만 다시 화면을 그리고 싶지 않으면 이함수를 사용하여
  // 렌더링을 제어할 수 있다.
  // 이 함수에서 false를 반환하면 화면을 다시 그리는 리렌더링을 수행하지 않도록 막을 수 있다.
  // 앞의 예제에서는 true를 사용하여 항상 리렌더링되게 하였지만, 특정값을 비교하여
  // 리렌더링을 제어할 수 있다.
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    console.log('shouldComponentUpdate');
    return true;
  }

  // 해당 컴포넌트가 화면에서 완전히 사라진 후 호출되는 함수이다.
  // 이 함수는 클래스 컴포넌트가 완전히 사라진 후 호출되는 함수이다.
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  // 리액트는 자바스크립트이므로 비즈니스 로직에서 에러의 예외처리로 trycatch를
  // 사용할 수 있다. 하지만 render함수에서 JSX문법을 사용하여 컴포넌트를 렌더링
  // 하는 부분에서는 발생하는 에러를 처리하기 위해 trycatch를 사용할 수 없다.
  // 이처럼 render함수의 JSX에서 발생하는 에러를 예외 처리 할 수 있게 도와주는
  // 라이프 사이클 함수가 componentDidCatch함수이다.
  // render함수의 return 부분에서 에러가 발생하면 componentDidCatch함수가
  // 실행된다. 이때, 다음과 같이 State를 사용하여 에러가 발생했을 때 자식 컴포넌트를
  // 표시하지 않게 하거나 에러 화면을 표시함으로써 사용자 경험을 개선할 수 있다.
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({
      error: true,
    });
  }
}

export default AppClass;
