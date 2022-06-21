import 'jest-styled-components'; // toHaveStyleRule이라는 Matcher를 추가로 제공하며, styled-components를 좀 더 자세히 테스트 할 수 있게 도와준다.
import { fireEvent, render, screen } from '@testing-library/react';

import Button from '.';

describe('<Button/>', () => {
  it('renders component correctly', () => {
    const { container } = render(<Button label="Button Test" />);
    const label = screen.getByText('Button Test');

    expect(label).toBeInTheDocument();

    // eslint-disable-next-line testing-library/no-node-access
    const parent = label.parentElement;
    expect(parent).toHaveStyleRule('background-color', '#304FFE');
    expect(parent).toHaveStyleRule('background-color', '#1E40FF', {
      modifier: ':hover',
    });

    expect(container).toMatchSnapshot();
  });

  it('changes backgroundColor and hoverColor Props', () => {
    const backgroundColor = '#304FFE';
    const hoverColor = '#1E40FF';

    render(
      <Button
        label="Button Test"
        backgroundColor={backgroundColor}
        hoverColor={hoverColor}
      />,
    );

    // eslint-disable-next-line testing-library/no-node-access
    const parent = screen.getByText('Button Test').parentElement;
    expect(parent).toHaveStyleRule('background-color', backgroundColor);
    expect(parent).toHaveStyleRule('background-color', hoverColor, {
      modifier: ':hover',
    });
  });

  it('clicks the button', () => {
    const handleClick = jest.fn();
    render(<Button label="Button Test" onClick={handleClick} />);

    const label = screen.getByText('Button Test');
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(label);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
