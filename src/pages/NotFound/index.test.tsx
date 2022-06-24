import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import NotFound from '.';

describe('<NotFound/>', () => {
  it('render component correctly', () => {
    const { container } = render(<NotFound />);

    const message = screen.getByText('page not found');
    expect(message).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
