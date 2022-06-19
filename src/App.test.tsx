/* eslint-disable testing-library/no-container */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('<App/>', () => {
  it('renders component correctly', () => {
    const { container } = render(<App />);
    const linkElement = screen.getByText(/learn react/i);

    expect(linkElement).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-container
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.getElementsByClassName('App-logo')).toHaveLength(1);

    expect(container).toMatchSnapshot();
  });
});
